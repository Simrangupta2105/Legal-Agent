import React, { useState, useRef, useEffect, useCallback } from 'react';

// Types
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface LanguageOption {
  code: string;
  name: string;
  welcome: string;
}

interface NyayaMitraChatbotProps {
  apiUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  onError?: (error: Error) => void;
  welcomeMessage?: string;
  supportedLanguages?: LanguageOption[];
  showLanguageSelector?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  title?: string;
  showDisclaimer?: boolean;
}

// Main Chatbot Component
const NyayaMitraChatbot: React.FC<NyayaMitraChatbotProps> = ({ 
  apiUrl = "/api/chat", 
  primaryColor = "#6366F1", 
  secondaryColor = "#EEF2FF",
  onError = () => {},
  welcomeMessage = "नमस्ते! I'm Nyaya Mitra, your legal assistant. I can help you understand your legal rights in India. You can ask me in English, हिंदी, বাংলা, or தமிழ். How can I assist you today?",
  supportedLanguages = [
    { code: "en", name: "English", welcome: "Hello! I'm Nyaya Mitra, your legal assistant. I can help you understand your legal rights in India. How can I assist you today?" },
    { code: "hi", name: "हिंदी", welcome: "नमस्ते! मैं न्याय मित्र हूं, आपका कानूनी सहायक। मैं आपको भारत में आपके कानूनी अधिकारों को समझने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?" },
    { code: "bn", name: "বাংলা", welcome: "নমস্কার! আমি ন্যায় মিত্র, আপনার আইনি সহায়ক। আমি আপনাকে ভারতে আপনার আইনি অধিকারগুলি বুঝতে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?" },
    { code: "ta", name: "தமிழ்", welcome: "வணக்கம்! நான் நியாய மித்ரா, உங்கள் சட்ட உதவியாளர். இந்தியாவில் உங்கள் சட்ட உரிமைகளைப் புரிந்துகொள்ள நான் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?" }
  ],
  showLanguageSelector = true,
  position = "bottom-right",
  title = "Nyaya Mitra",
  showDisclaimer = true
}) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  
  // Mock data for testing without a backend
  const mockResponses: Record<string, string> = {
    "tenant rights": "As a tenant in India, you have several important rights under various state Rent Control Acts:\n\n1. Right to a proper rental agreement\n2. Protection from arbitrary eviction (typically requires proper notice)\n3. Right to essential services like water and electricity\n4. Right to live in habitable conditions\n5. Right to request repairs from landlord\n\nThe specific rights vary by state. For example, Maharashtra, Delhi, and Tamil Nadu have different notice periods for eviction. To know your exact rights, you should check your state's Rent Control Act.\n\n*This is general information.*",
    "labor laws": "India has several labor laws protecting workers' rights:\n\n1. Minimum Wages Act: Guarantees minimum wage rates\n2. Payment of Wages Act: Ensures timely payment of wages\n3. Equal Remuneration Act: Mandates equal pay for equal work regardless of gender\n4. Employees' State Insurance Act: Provides health insurance and benefits\n5. Factories Act: Ensures safety, health and welfare of workers\n\nIf your workplace rights are violated, you can approach the Labor Commissioner or file a case in the Labor Court in your area.\n\n*This is general information.*",
    "domestic violence": "The Protection of Women from Domestic Violence Act, 2005 protects women from abuse in domestic relationships. Under this law:\n\n1. You can file a complaint with a Protection Officer, police, or directly to a magistrate\n2. You can get protection orders preventing the abuser from contacting you\n3. You have the right to continue living in the shared household\n4. You can claim compensation for injuries and monetary relief\n5. You can get temporary custody of children\n\nFor immediate help, call the Women's Helpline at 181 or contact local women's organizations or police.\n\n*This is general information.*"
  };
  
  // Send message to API
  const sendMessageToAPI = async (
    message: string, 
    sessionId: string,
    languageCode?: string
  ) => {
    console.log('⭐ sendMessageToAPI', { message, sessionId, languageCode, apiUrl });
    
    try {
      // OPTION 1: Use mock data for testing without a backend
      // This will immediately respond with mock data for certain keywords
      const lowerMessage = message.toLowerCase();
      
      // Check if we have a mock response for any keyword in the message
      for (const keyword in mockResponses) {
        if (lowerMessage.includes(keyword)) {
          console.log('📦 Using mock response for:', keyword);
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          return {
            reply: mockResponses[keyword],
            sessionId
          };
        }
      }
      
      // If no keyword matches, provide a default response
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        reply: "I can provide information about various legal topics in India such as tenant rights, labor laws, domestic violence protection, marriage and divorce, and more. How can I assist you today?\n\n*This is general information.*",
        sessionId
      };
      
      // OPTION 2: Uncomment this section to try connecting to a real backend
      /*
      // Determine the full API URL
      let fullApiUrl = apiUrl;
      
      // If apiUrl is relative, prepend with base URL
      if (apiUrl.startsWith('/')) {
        const backendUrl = "http://localhost:5000"; // Change this to your actual backend URL
        console.log('Using hardcoded backend URL:', backendUrl);
        fullApiUrl = `${backendUrl}${apiUrl}`;
      }
      
      console.log('🔗 Making API request to:', fullApiUrl);
      
      // Make the request
      const response = await fetch(fullApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          ...(languageCode && { languageCode }),
        }),
      });
      
      console.log('📡 API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API response data:', data);
      
      return data;
      */
      
    } catch (error) {
      console.error('❌ API request error:', error);
      throw error;
    }
  };
  
  // Helper function to generate UUID v4
  const generateUUID = (): string => {
    console.log('🔄 Generating UUID');
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  // Get or create session ID
  const getSessionId = (): string => {
    console.log('🔍 Getting session ID');
    let sessionId = localStorage.getItem('nyayamitra_session_id');
    if (!sessionId) {
      sessionId = generateUUID();
      localStorage.setItem('nyayamitra_session_id', sessionId);
      console.log('✨ Created new session ID:', sessionId);
    } else {
      console.log('🔄 Using existing session ID:', sessionId);
    }
    return sessionId;
  };
  
  // Initialize session ID and welcome message
  useEffect(() => {
    console.log('🚀 Initializing chatbot');
    
    // Get session ID
    const id = getSessionId();
    setSessionId(id);
    
    // Add welcome message
    const welcomeMsg: Message = {
      id: generateUUID(),
      content: showLanguageSelector ? selectedLanguage.welcome : welcomeMessage,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages([welcomeMsg]);
    console.log('💬 Added welcome message:', welcomeMsg.content);
  }, [showLanguageSelector, selectedLanguage, welcomeMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log('📜 Scrolled to latest message');
    }
  }, [messages]);

  // Handle sending message
  const sendMessage = useCallback(async (message: string) => {
    console.log('📤 sendMessage called with:', message);
    if (!message.trim()) {
      console.log('❌ Empty message, not sending');
      return;
    }

    const userMessage: Message = {
      id: generateUUID(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    console.log('👤 Added user message to chat');

    try {
      // Send request to backend
      console.log('📡 Sending request to backend');
      const data = await sendMessageToAPI(
        message, 
        sessionId,
        showLanguageSelector ? selectedLanguage.code : undefined
      );

      // Add bot response to state
      const botMessage: Message = {
        id: generateUUID(),
        content: data.reply,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      console.log('🤖 Added bot response to chat');
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setError('Sorry, I encountered an error. Please try again later.');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: generateUUID(),
        content: 'Sorry, I encountered an error. Please try again later.\n\n*This is general information.*',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      if (error instanceof Error) {
        onError(error);
      } else {
        onError(new Error('Unknown error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, showLanguageSelector, selectedLanguage]);

  // Handle form submission
  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log('📝 Form submitted with text:', inputValue);
    sendMessage(inputValue);
    setInputValue('');
  }, [inputValue, sendMessage]);

  // Handle Enter key press
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('⌨️ Enter key pressed, submitting form');
      handleSubmit();
    }
  }, [handleSubmit]);

  // Toggle chat panel
  const toggleChat = useCallback(() => {
    console.log('🔄 Toggling chat panel. Current state:', isOpen);
    setIsOpen(prev => !prev);
  }, [isOpen]);

  // Handle language change
  const handleLanguageChange = useCallback((language: LanguageOption) => {
    console.log('🌐 Language changed to:', language.name);
    setSelectedLanguage(language);
  }, []);

  // Clear the chat history
  const clearChat = useCallback(() => {
    console.log('🧹 Clearing chat history');
    const welcomeMsg: Message = {
      id: generateUUID(),
      content: showLanguageSelector ? selectedLanguage.welcome : welcomeMessage,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages([welcomeMsg]);
  }, [showLanguageSelector, selectedLanguage, welcomeMessage]);

  // Format message content with HTML
  const formatMessageContent = (content: string) => {
    // Replace URLs with links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let formattedContent = content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:' + primaryColor + '; text-decoration: underline;">$1</a>');
    
    // Convert simple markdown for lists
    // Ordered lists
    formattedContent = formattedContent.replace(/^(\d+\.\s.+)$/gm, '<li>$1</li>');
    if (formattedContent.includes('<li>')) {
      formattedContent = formattedContent.replace(/<li>(.+)<\/li>/g, '<ol style="list-style-type: decimal; margin-left: 20px; margin-top: 8px; margin-bottom: 8px;"><li>$1</li></ol>');
    }
    
    // Unordered lists
    formattedContent = formattedContent.replace(/^(\*\s.+)$/gm, '<li>$1</li>');
    if (formattedContent.includes('<li>')) {
      formattedContent = formattedContent.replace(/<li>(\*\s.+)<\/li>/g, '<ul style="list-style-type: disc; margin-left: 20px; margin-top: 8px; margin-bottom: 8px;"><li>$1</li></ul>');
    }
    
    // Convert italics for the disclaimer
    formattedContent = formattedContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Split paragraphs
    const paragraphs = formattedContent.split('\n\n');
    return paragraphs.map((paragraph, i) => (
      <p key={i} style={{ marginTop: i > 0 ? '8px' : '0' }} dangerouslySetInnerHTML={{ __html: paragraph }} />
    ));
  };

  // Position styles based on position prop
  const getPositionStyle = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: '24px', left: '24px' };
      case 'top-right':
        return { top: '24px', right: '24px' };
      case 'top-left':
        return { top: '24px', left: '24px' };
      case 'bottom-right':
      default:
        return { bottom: '24px', right: '24px' };
    }
  };

  // CSS Styles (for standalone component)
  const styles = {
    container: {
      position: 'fixed',
      zIndex: 1000,
    } as React.CSSProperties,
    chatButton: {
      position: 'fixed',
      zIndex: 1000,
      backgroundColor: primaryColor,
      color: 'white',
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s',
      border: 'none',
      ...getPositionStyle(),
    } as React.CSSProperties,
    chatButtonHover: {
      transform: 'scale(1.05)',
    } as React.CSSProperties,
    chatPanel: {
      position: 'fixed',
      width: '350px',
      maxWidth: 'calc(100vw - 48px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s',
      transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      height: '500px',
      maxHeight: 'calc(100vh - 96px)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      zIndex: 1000,
      ...getPositionStyle(),
    } as React.CSSProperties,
    chatHeader: {
      backgroundColor: primaryColor,
      color: 'white',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as React.CSSProperties,
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
    } as React.CSSProperties,
    headerActions: {
      display: 'flex',
      gap: '8px',
    } as React.CSSProperties,
    iconButton: {
      backgroundColor: 'transparent',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '0',
    } as React.CSSProperties,
    languageSelector: {
      backgroundColor: primaryColor,
      color: 'white',
      padding: '8px 12px',
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    } as React.CSSProperties,
    languageButton: (isSelected: boolean) => ({
      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '4px 8px',
      margin: '0 4px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: isSelected ? 500 : 'normal',
    } as React.CSSProperties),
    disclaimer: {
      backgroundColor: '#FEF3C7',
      borderBottom: '1px solid #F59E0B',
      color: '#1F2937',
      padding: '8px 16px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'flex-start',
    } as React.CSSProperties,
    chatMessages: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      backgroundColor: '#F9FAFB',
    } as React.CSSProperties,
    messageContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    } as React.CSSProperties,
    message: (isUserMessage: boolean) => ({
      backgroundColor: isUserMessage ? primaryColor : secondaryColor,
      color: isUserMessage ? 'white' : '#1F2937',
      borderRadius: '8px',
      padding: '12px',
      maxWidth: '85%',
      fontSize: '14px',
      marginLeft: isUserMessage ? 'auto' : '0',
    } as React.CSSProperties),
    loading: {
      display: 'flex',
      gap: '4px',
    } as React.CSSProperties,
    loadingDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#9CA3AF',
      borderRadius: '50%',
      animation: 'bounce 1.4s infinite ease-in-out both',
    } as React.CSSProperties,
    errorMessage: {
      backgroundColor: '#FEE2E2',
      color: '#B91C1C',
      borderRadius: '8px',
      padding: '12px',
      maxWidth: '85%',
      fontSize: '14px',
    } as React.CSSProperties,
    inputArea: {
      borderTop: '1px solid #E5E7EB',
      padding: '12px',
      backgroundColor: 'white',
    } as React.CSSProperties,
    form: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    } as React.CSSProperties,
    input: {
      flex: 1,
      border: '1px solid #D1D5DB',
      borderRadius: '9999px',
      padding: '8px 16px',
      fontSize: '14px',
      outline: 'none',
    } as React.CSSProperties,
    sendButton: {
      backgroundColor: primaryColor,
      color: 'white',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      {/* Chat Button */}
      <button 
        onClick={toggleChat} 
        style={styles.chatButton}
        aria-label="Open chat with Nyaya Mitra"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
          <rect width="18" height="12" x="3" y="4" rx="2"></rect>
          <circle cx="12" cy="10" r="2"></circle>
        </svg>
      </button>

      {/* Chat Panel */}
      <div style={styles.chatPanel}>
        {/* Chat Header */}
        <div style={styles.chatHeader}>
          <div style={styles.headerTitle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
              <rect width="18" height="12" x="3" y="4" rx="2"></rect>
              <circle cx="12" cy="10" r="2"></circle>
            </svg>
            <h3 style={{fontWeight: 500}}>{title}</h3>
          </div>
          <div style={styles.headerActions}>
            {/* Clear Chat Button */}
            <button
              onClick={clearChat}
              style={styles.iconButton}
              aria-label="Clear chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </button>
            {/* Close Button */}
            <button
              onClick={toggleChat}
              style={styles.iconButton}
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Language Selector */}
        {showLanguageSelector && (
          <div style={styles.languageSelector}>
            {supportedLanguages.map(language => (
              <button
                key={language.code}
                style={styles.languageButton(selectedLanguage.code === language.code)}
                onClick={() => handleLanguageChange(language)}
              >
                {language.name}
              </button>
            ))}
          </div>
        )}

        {/* Disclaimer Banner */}
        {showDisclaimer && (
          <div style={styles.disclaimer}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px', flexShrink: 0}}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>Nyaya Mitra is an informational tool and does not replace professional legal counsel.</p>
          </div>
        )}

        {/* Chat Messages Area */}
        <div ref={chatMessagesRef} style={styles.chatMessages}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                ...styles.messageContainer,
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={styles.message(message.isUser)}>
                {formatMessageContent(message.content)}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div style={styles.messageContainer}>
              <div style={{...styles.message(false), backgroundColor: '#E5E7EB'}}>
                <div style={styles.loading}>
                  <div style={{...styles.loadingDot, animationDelay: '0s'}}></div>
                  <div style={{...styles.loadingDot, animationDelay: '0.2s'}}></div>
                  <div style={{...styles.loadingDot, animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && !isLoading && (
            <div style={styles.messageContainer}>
              <div style={styles.errorMessage}>
                {error}
              </div>
            </div>
          )}

          {/* Scroll to end reference */}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={showLanguageSelector ? `Type your message in ${selectedLanguage.name}...` : "Type your message..."}
              style={styles.input}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={inputValue.trim() === '' || isLoading}
              style={{
                ...styles.sendButton,
                opacity: inputValue.trim() === '' || isLoading ? 0.5 : 1,
              }}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* CSS for loading animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
          }
        `
      }} />
    </div>
  );
};

export default NyayaMitraChatbot;