import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure middleware
app.use(express.json());

// Configure CORS with detailed options and extensive logging
app.use(cors({
  origin: function(origin, callback) {
    console.log('🔒 CORS Request from origin:', origin);

    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) {
      console.log('✅ Allowing request with no origin');
      callback(null, true);
      return;
    }

    // List of allowed origins - you can customize this based on your needs
    const allowedOrigins = [
      'http://localhost:5173', 
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3000'
    ];

    // For production, you may want to add your actual domain
    if (process.env.NODE_ENV === 'production' && process.env.ALLOWED_ORIGIN) {
      allowedOrigins.push(process.env.ALLOWED_ORIGIN);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`✅ Origin ${origin} is allowed by CORS policy`);
      callback(null, true);
    } else {
      console.log(`⛔ Origin ${origin} is not allowed by CORS policy`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Legal assistant prompt template
const legalAssistantPrompt = `
You are Nyaya Mitra (meaning "Friend of Justice" in Hindi), an empathetic and knowledgeable AI legal assistant developed to help underprivileged communities in India understand their legal rights. You provide information on Indian laws in simple, respectful language suitable for people with low literacy.

Areas of expertise:
- Labor rights and employment laws in India
- Domestic violence laws and women's rights
- Housing laws and tenant rights
- Marriage, divorce, and family law
- Right to Information (RTI) processes
- Constitutional rights of Indian citizens
- Criminal procedure and basic rights of accused persons

Guidelines:
1. Respond in the same language the user queries in (Hindi, English, Bengali, Tamil, etc.)
2. Use simple, respectful language without complex legal jargon
3. Provide accurate information based on Indian laws and the Constitution
4. Always clarify that you're providing general information, not legal advice
5. When appropriate, suggest seeking help from legal aid centers or advocates
6. Always end your responses with "*This is general information.*" in italics
7. Be empathetic and understanding of the challenges faced by marginalized communities
8. Recommend official government resources when available
9. Avoid making definitive predictions about case outcomes
10. Focus on explaining rights, procedures, and available remedies

Remember you are assisting often vulnerable individuals who may have limited legal knowledge. Your goal is to empower them with information about their rights and the legal system.
`;

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  console.log('📥 Received chat request:', { 
    body: req.body,
    method: req.method,
    path: req.path,
    headers: {
      contentType: req.headers['content-type'],
      origin: req.headers.origin,
      host: req.headers.host
    }
  });

  try {
    const { message, sessionId, languageCode } = req.body;

    if (!message) {
      console.log('❌ Missing required fields in request');
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('✅ Request validation passed');

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ API key is not configured');
      return res.status(500).json({ 
        reply: "API key is not configured. Please set the GEMINI_API_KEY environment variable.\n\n*This is general information.*",
        sessionId
      });
    }

    console.log('🔑 API key is configured');

    // Prepare request to Gemini API
    console.log('🚀 Preparing Gemini API request');
    const promptWithMessage = `${legalAssistantPrompt}\n\nUser query: ${message}${languageCode ? ' (Language: ' + languageCode + ')' : ''}`;

    console.log(`📝 Using language code: ${languageCode || 'none specified'}`);
    console.log(`💬 Sending message to Gemini API`);

    // Call Gemini API
    const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';
    console.log('🔗 Gemini API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{
            text: promptWithMessage
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    console.log('📡 Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', errorText);
      throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('📦 Received data from Gemini API');

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      const reply = data.candidates[0].content.parts[0].text;
      console.log('💬 Reply generated successfully');

      return res.json({
        reply,
        sessionId
      });
    } else {
      console.error('❌ Invalid API response format:', JSON.stringify(data));
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.error('❌ Chat API error:', error);
    res.status(500).json({
      reply: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.\n\n*This is general information.*",
      sessionId: req.body.sessionId
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  console.log('🔍 Health check requested');
  res.json({ 
    status: 'ok', 
    message: 'Nyaya Mitra API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('🔥 Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 Nyaya Mitra server running!

  📌 Server Information:
  - Port: ${PORT}
  - Environment: ${process.env.NODE_ENV || 'development'}
  - Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured ✅' : 'Not configured ❌'}

  📡 API Endpoints:
  - POST /api/chat - Chat endpoint for legal assistance
  - GET /api/health - Health check endpoint

  📝 For testing, you can use:
  curl -X POST http://localhost:${PORT}/api/chat \\
       -H "Content-Type: application/json" \\
       -d '{"message":"What are tenant rights in India?","sessionId":"test-session"}'
  `);

  if (!process.env.GEMINI_API_KEY) {
    console.warn(`
    ⚠️ WARNING: GEMINI_API_KEY is not set in environment variables
    The chatbot will not function correctly without this key.
    Please create a .env file with your API key:

    GEMINI_API_KEY=your_api_key_here
    PORT=5000
    NODE_ENV=development
    `);
  }
});

export default app;
