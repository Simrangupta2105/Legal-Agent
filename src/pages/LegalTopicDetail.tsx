import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft,
  Volume2,
  VolumeX,
  
  Download,
 
  Pause,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import html2pdf from 'html2pdf.js';

// Define TypeScript interfaces for our data structures
interface ContentSection {
  heading?: string;
  text: string[];
  list?: string[];
}

interface LegalReference {
  text: string;
  link?: string;
}

interface TopicData {
  title: string;
  lastUpdated: string;
  content: ContentSection[];
  legalReferences?: LegalReference[];
}

interface TopicsDatabase {
  [categoryId: string]: {
    [topicId: string]: TopicData;
  };
}

const LegalTopicDetail: React.FC = () => {
  const { categoryId, topicId } = useParams<{ categoryId: string; topicId: string }>();
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we're using mock data
    const fetchTopicData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data based on the categoryId and topicId
        if (categoryId && topicId) {
          const data = getTopicData(categoryId, topicId);
          setTopicData(data);
        }
      } catch (error) {
        console.error("Error fetching topic data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicData();
    
    // Cleanup speech synthesis on unmount
    return () => {
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [categoryId, topicId]);

  // Generate text content for speech synthesis and PDF
  const generateTextContent = () => {
    if (!topicData) return "";
    
    let content = `${topicData.title}\n\n`;
    
    topicData.content.forEach(section => {
      if (section.heading) {
        content += `${section.heading}\n\n`;
      }
      
      section.text.forEach(paragraph => {
        content += `${paragraph}\n\n`;
      });
      
      if (section.list) {
        section.list.forEach(item => {
          content += `• ${item}\n`;
        });
        content += '\n';
      }
    });
    
    if (topicData.legalReferences && topicData.legalReferences.length > 0) {
      content += "Legal References:\n\n";
      topicData.legalReferences.forEach(reference => {
        content += `• ${reference.text}\n`;
      });
    }
    
    return content;
  };

  // Handle PDF download
  const handleDownload = () => {
    if (!contentRef.current) return;
    
    const element = contentRef.current;
    const opt = {
      margin: 10,
      filename: `${topicData?.title || 'legal-topic'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  // Handle text-to-speech
  const handleListen = () => {
    if (!topicData) return;
    
    if (isListening) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsListening(false);
      setIsPaused(false);
      return;
    }
    
    const text = generateTextContent();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech settings
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1.0;
    
    // Set available voice (preferably English)
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.includes('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    // Event handlers
    utterance.onend = () => {
      setIsListening(false);
      setIsPaused(false);
    };
    
    // Start speaking
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsListening(true);
  };

  // Handle pause/resume
  const handlePauseResume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="container py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <p className="mb-6">The requested legal topic could not be found.</p>
        <Button asChild>
          <Link to="/topics">Back to All Topics</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/topics" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Topics
        </Link>
      </div>

      {/* Topic Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className={`px-3 py-1 rounded-full ${getCategoryColor(categoryId || '')}`}>
            {getCategoryName(categoryId || '')}
          </span>
          <span>•</span>
          <span>Last updated: {topicData.lastUpdated}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{topicData.title}</h1>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {isListening ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleListen}
              >
                <VolumeX className="h-4 w-4" />
                Stop
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handlePauseResume}
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleListen}
            >
              <Volume2 className="h-4 w-4" />
              Listen
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none" ref={contentRef}>
        {topicData.content.map((section, index) => (
          <div key={index} className="mb-8">
            {section.heading && <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>}
            {section.text.map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-4">{paragraph}</p>
            ))}
            {section.list && (
              <ul className="list-disc pl-6 mb-4">
                {section.list.map((item, lIndex) => (
                  <li key={lIndex} className="mb-2">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Legal references */}
        {topicData.legalReferences && topicData.legalReferences.length > 0 && (
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Legal References</h3>
            <ul className="list-disc pl-6">
              {topicData.legalReferences.map((reference, index) => (
                <li key={index} className="mb-2">
                  {reference.text}
                  {reference.link && (
                    <a href={reference.link} className="text-blue-600 hover:underline ml-1" target="_blank" rel="noreferrer">
                      View source
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions

function getCategoryName(categoryId: string): string {
  const categories: Record<string, string> = {
    "labor": "Labor Laws",
    "housing": "Housing Rights",
    "domestic": "Domestic Violence",
    "marriage": "Marriage & Family",
    "rti": "Right to Information"
  };
  return categories[categoryId] || categoryId;
}

function getCategoryColor(categoryId: string): string {
  const colors: Record<string, string> = {
    "labor": "bg-blue-100 text-blue-700",
    "housing": "bg-green-100 text-green-700",
    "domestic": "bg-red-100 text-red-700",
    "marriage": "bg-purple-100 text-purple-700",
    "rti": "bg-amber-100 text-amber-700"
  };
  return colors[categoryId] || "bg-gray-100 text-gray-700";
}

function getTopicData(categoryId: string, topicId: string): TopicData | null {
  // In a real app, this would come from an API
  // Mock data for demonstration purposes
  const topicsDatabase: TopicsDatabase = {
    "labor": {
      "minimum-wage": {
        title: "Minimum Wage in India",
        lastUpdated: "March 15, 2025",
        content: [
          {
            heading: "Overview",
            text: [
              "The Minimum Wages Act, 1948 provides for fixing minimum rates of wages in certain employments. The Act binds the employers to pay their workers the minimum wages fixed under the Act.",
              "Under the law, the appropriate government (Central or State) can fix different minimum wage rates for different industries, different occupations, different classes of work and for different localities."
            ]
          },
          {
            heading: "Key Provisions",
            text: [
              "The minimum wage rates can be fixed for time work, piece work, or piece rate with time rate guaranteed. The appropriate government may fix:"
            ],
            list: [
              "A minimum time rate of wages for work done by the hour, day, month",
              "A minimum piece rate for workers doing piece work",
              "A minimum rate of remuneration to apply in the case of employees employed on piece work for the purpose of securing to such employees a minimum rate of wages on a time work basis"
            ]
          },
          {
            heading: "Recent Developments",
            text: [
              "The Code on Wages, 2019 subsumes four laws including the Payment of Wages Act, 1936, the Minimum Wages Act, 1948, the Payment of Bonus Act, 1965, and the Equal Remuneration Act, 1976.",
              "The Code on Wages universalizes the provisions of minimum wages and timely payment of wages to all employees irrespective of the sector and wage ceiling."
            ]
          },
          {
            heading: "Enforcement",
            text: [
              "Labour inspectors are appointed to ensure that the provisions of the Minimum Wages Act are implemented.",
              "If an employer pays less than the minimum wage, they can be punished with imprisonment of up to 5 years or a fine of up to ₹10,000, or both."
            ]
          },
          {
            heading: "How to File a Complaint",
            text: [
              "If an employee is not being paid the minimum wage, they can file a complaint with the Labour Commissioner or Inspector of the concerned area.",
              "The complaint can be made within 6 months from the date on which the minimum wages became payable."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Minimum Wages Act, 1948",
            link: "https://labour.gov.in/sites/default/files/TheMinimumWagesAct1948_0.pdf"
          },
          {
            text: "Code on Wages, 2019",
            link: "https://labour.gov.in/sites/default/files/THE%20CODE%20ON%20WAGES%2C%202019%20No.%2029%20of%202019.pdf"
          }
        ]
      },
      "workplace-safety": {
        title: "Workplace Safety Laws in India",
        lastUpdated: "February 20, 2025",
        content: [
          {
            heading: "Overview",
            text: [
              "Workplace safety in India is primarily governed by the Occupational Safety, Health and Working Conditions Code, 2020 (OSH Code), which consolidates and amends laws regulating occupational safety, health, and working conditions.",
              "This law replaces 13 older labour laws including the Factories Act, 1948, the Contract Labour Act, 1970, and others."
            ]
          },
          {
            heading: "Employer Responsibilities",
            text: [
              "Under Indian law, employers have several key responsibilities regarding workplace safety:"
            ],
            list: [
              "Provide and maintain a work environment that is safe and without risk to health",
              "Ensure the safety of all plant, machinery, and equipment used in the workplace",
              "Provide adequate training and supervision to employees",
              "Prepare a written statement of policy regarding safety and health of workers",
              "Conduct periodic safety audits and risk assessments"
            ]
          },
          {
            heading: "Employee Rights",
            text: [
              "Workers in India have the following rights regarding workplace safety:"
            ],
            list: [
              "Right to a safe working environment",
              "Right to be informed about hazards and preventive measures",
              "Right to stop work in case of imminent danger",
              "Right to personal protective equipment at employer's cost",
              "Right to be consulted on safety and health matters"
            ]
          },
          {
            heading: "Reporting Violations",
            text: [
              "If an employer fails to comply with safety regulations, workers can file complaints with:",
              "The Labour Inspector of the area, the Chief Inspector of Factories, or directly approach the Labour Court or Industrial Tribunal."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Occupational Safety, Health and Working Conditions Code, 2020",
            link: "https://labour.gov.in/sites/default/files/OSH_Gazette.pdf"
          },
          {
            text: "Factories Act, 1948 (until replaced by OSH Code)",
            link: "https://labour.gov.in/sites/default/files/TheFactoriesAct1948.pdf"
          }
        ]
      },
      "working-hours": {
        "title": "Working Hours Laws in India",
        "lastUpdated": "February 20, 2025",
        "content": [
          {
            "heading": "Overview",
            "text": [
              "Working hours in India are primarily regulated under the Occupational Safety, Health and Working Conditions Code, 2020 (OSH Code), which consolidates multiple previous labour laws including the Factories Act, 1948.",
              "The OSH Code outlines the maximum number of working hours, rules on overtime, and provisions for rest and leave."
            ]
          },
          {
            "heading": "Standard Working Hours",
            "text": [
              "As per Indian labour laws:"
            ],
            "list": [
              "A standard working day cannot exceed 8 hours.",
              "The total working time, including overtime, must not exceed 48 hours per week.",
              "A spread-over of working hours should not exceed 12 hours a day, including rest intervals."
            ]
          },
          {
            "heading": "Overtime Regulations",
            "text": [
              "Employees working beyond 8 hours a day or 48 hours a week are entitled to overtime pay:"
            ],
            "list": [
              "Overtime is typically paid at twice the ordinary rate of wages.",
              "Maximum allowable overtime hours are generally capped at 50 hours in a quarter (may vary by industry)."
            ]
          },
          {
            "heading": "Rest Periods and Weekly Holidays",
            "text": [
              "Labour laws in India require employers to ensure rest and holidays:"
            ],
            "list": [
              "At least 30 minutes of rest after every 5 hours of continuous work.",
              "At least one day of rest every week (commonly Sunday).",
              "A worker should not be required to work more than 6 consecutive days without a full day of rest."
            ]
          },
          {
            "heading": "Special Provisions",
            "text": [
              "Certain categories of workers, such as adolescents, women, or workers in hazardous industries, may be subject to special rules regarding working hours, night shifts, and overtime limits."
            ]
          },
          {
            "heading": "Reporting Violations",
            "text": [
              "In case of violations of working hour regulations, workers can lodge complaints with:",
              "The Labour Inspector of the region, the Chief Inspector of Factories, or escalate the matter to the Labour Court or Industrial Tribunal."
            ]
          }
        ],
        "legalReferences": [
          {
            "text": "Occupational Safety, Health and Working Conditions Code, 2020",
            "link": "https://labour.gov.in/sites/default/files/OSH_Gazette.pdf"
          },
          {
            "text": "Factories Act, 1948 (until replaced by OSH Code)",
            "link": "https://labour.gov.in/sites/default/files/TheFactoriesAct1948.pdf"
          }
        ]
      }

      
    },
    "housing": {
      "tenant-rights": {
        title: "Tenant Rights in India",
        lastUpdated: "April 5, 2025",
        content: [
          {
            heading: "Overview",
            text: [
              "Tenant rights in India are primarily governed by state-specific Rent Control Acts and the Model Tenancy Act, 2021, which was introduced by the central government as a model law for states to adopt with necessary modifications.",
              "The rights of tenants vary from state to state, but certain basic protections are common across most jurisdictions."
            ]
          },
          {
            heading: "Key Rights of Tenants",
            text: [
              "Tenants in India generally have the following rights:"
            ],
            list: [
              "Right to a written rental agreement that clearly specifies terms and conditions",
              "Right to peaceful possession and enjoyment of the rented premises",
              "Right to essential services like water and electricity",
              "Right to proper notice before eviction (typically 1-3 months depending on state laws)",
              "Right to claim refund of security deposit upon vacating the premises",
              "Right to privacy and protection against unlawful entry by landlord"
            ]
          },
          {
            heading: "Model Tenancy Act, 2021",
            text: [
              "The Model Tenancy Act, 2021 introduced several reforms to regulate rental housing in India:",
              "It mandates a written agreement for all rentals, establishes a three-tier quasi-judicial mechanism for dispute resolution, caps security deposits (usually to 2 months' rent for residential properties), and prohibits arbitrary eviction during the tenancy period except on grounds specified in the agreement."
            ]
          },
          {
            heading: "Dispute Resolution",
            text: [
              "If a dispute arises between landlord and tenant, the following resolution mechanisms are available:",
              "Approach the Rent Authority or Rent Court established under state rent laws, file a civil suit in the appropriate court, or pursue mediation or arbitration if provided for in the rental agreement."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Model Tenancy Act, 2021",
            link: "https://mohua.gov.in/upload/uploadfiles/files/1%20DRAFT%20Model%20Tenancy%20Act%20(English).pdf"
          },
          {
            text: "State-specific Rent Control Acts (varies by state)",
            link: ""
          }
        ]
      },
      "rental-agreement": {
  "title": "Rental Agreement Laws in India",
  "lastUpdated": "February 20, 2025",
  "content": [
    {
      "heading": "Overview",
      "text": [
        "Rental agreements in India are governed by the Rent Control Acts of respective states and the Model Tenancy Act, 2021 introduced by the central government to bring uniformity and transparency.",
        "These laws regulate the rights and duties of landlords and tenants, rent ceilings, eviction processes, and registration requirements."
      ]
    },
    {
      "heading": "Key Components of a Rental Agreement",
      "text": [
        "A typical rental agreement in India includes the following details:"
      ],
      "list": [
        "Names and addresses of the landlord and tenant",
        "Monthly rent amount and payment due date",
        "Security deposit amount and refund terms",
        "Duration of the lease (typically 11 months)",
        "Notice period for termination (usually 1-3 months)",
        "Responsibilities for maintenance and utilities",
        "Clauses on renewal, subletting, and eviction"
      ]
    },
    {
      "heading": "Registration and Legal Validity",
      "text": [
        "According to the Registration Act, 1908:"
      ],
      "list": [
        "Rental agreements for a term exceeding 11 months must be registered.",
        "Unregistered agreements may not be admissible as evidence in court in case of disputes.",
        "Registration requires payment of stamp duty (which varies by state) and a nominal registration fee."
      ]
    },
    {
      "heading": "Rights of Tenants",
      "text": [
        "Tenants in India are entitled to several protections:"
      ],
      "list": [
        "Right to peaceful possession and privacy",
        "Right to receive rent receipts and proper documentation",
        "Right to get the security deposit refunded after deductions for legitimate expenses",
        "Right to proper notice before eviction or rent hike"
      ]
    },
    {
      "heading": "Responsibilities of Landlords",
      "text": [
        "Landlords have the following obligations under Indian tenancy laws:"
      ],
      "list": [
        "Maintain the premises in a livable condition",
        "Give proper notice before entering the premises",
        "Return the security deposit in accordance with the agreement",
        "Avoid arbitrary eviction and follow legal procedure"
      ]
    },
    {
      "heading": "Dispute Resolution",
      "text": [
        "In case of disputes, parties can approach:",
        "The Rent Control Authority (if applicable), civil courts, or consumer forums, depending on the nature of the grievance."
      ]
    }
  ],
  "legalReferences": [
    {
      "text": "Model Tenancy Act, 2021",
      "link": "https://mohua.gov.in/upload/uploadfiles/files/ModelTenancyAct2021.pdf"
    },
    {
      "text": "Registration Act, 1908",
      "link": "https://igrs.gov.in/files/Registration_Act_1908.pdf"
    },
    {
      "text": "State Rent Control Acts (varies by state)",
      "link": "https://indiankanoon.org/doc/1388660/"  // Example link; can be updated with state-specific links
    }
  ]
}

    },
    "domestic": {
      "domestic-violence": {
        title: "Domestic Violence Laws in India",
        lastUpdated: "January 12, 2025",
        content: [
          {
            heading: "Introduction to the Protection of Women from Domestic Violence Act",
            text: [
              "The Protection of Women from Domestic Violence Act, 2005 (PWDVA) is a civil law that provides protection to women from domestic violence. The Act came into force on October 26, 2006.",
              "This Act defines domestic violence broadly to include not only physical abuse but also sexual, verbal, emotional, and economic abuse."
            ]
          },
          {
            heading: "Who Can File a Complaint",
            text: [
              "The PWDVA protects women who are or have been in a domestic relationship with the respondent where both parties have lived together in a shared household and are related by:",
              "Consanguinity, marriage, or through a relationship in the nature of marriage, adoption, or family members living together as a joint family."
            ]
          },
          {
            heading: "Types of Abuse Covered",
            text: [
              "The Act recognizes the following forms of domestic violence:"
            ],
            list: [
              "Physical abuse: Acts causing bodily pain, harm, or danger to health",
              "Sexual abuse: Including sexual assault, forcing to watch pornography, etc.",
              "Verbal and emotional abuse: Insults, ridicule, humiliation, etc.",
              "Economic abuse: Deprivation of economic or financial resources, disposal of assets, etc."
            ]
          },
          {
            heading: "Available Remedies",
            text: [
              "Under the PWDVA, an aggrieved woman can seek various reliefs, including:"
            ],
            list: [
              "Protection orders: Preventing the respondent from committing acts of domestic violence",
              "Residence orders: Preventing dispossession or ensuring secure housing",
              "Monetary relief: Compensation for expenses incurred and losses suffered",
              "Custody orders: Temporary custody of children",
              "Compensation orders: For damages due to injuries, mental torture, and emotional distress"
            ]
          },
          {
            heading: "Filing Procedure",
            text: [
              "To file a complaint under the PWDVA, a woman or any person on her behalf can approach:",
              "A Protection Officer (appointed by the state government), a registered Service Provider, a police officer, or directly file an application before the Magistrate.",
              "The complaint can be oral or written. If given orally to a Protection Officer or police officer, they will reduce it to writing."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Protection of Women from Domestic Violence Act, 2005",
            link: "https://wcd.nic.in/sites/default/files/wdvact.pdf"
          },
          {
            text: "Protection of Women from Domestic Violence Rules, 2006",
            link: "https://wcd.nic.in/sites/default/files/wdvact.pdf"
          },
          {
            text: "Section 498A of Indian Penal Code (Cruelty by husband or relatives)",
            link: "https://indiankanoon.org/doc/538436/"
          }
        ]
      }
    },
    "marriage": {
      "marriage-registration": {
  "title": "Marriage Registration Laws in India",
  "lastUpdated": "February 20, 2025",
  "content": [
    {
      "heading": "Overview",
      "text": [
        "Marriage registration in India is governed by personal laws based on religion, along with the Special Marriage Act, 1954 for inter-faith or civil marriages.",
        "Registration provides legal recognition to the marriage and is increasingly mandated for various legal and administrative purposes."
      ]
    },
    {
      "heading": "Applicable Laws",
      "text": [
        "The law under which a marriage is registered depends on the religion of the couple:"
      ],
      "list": [
        "Hindu Marriage Act, 1955 – for Hindus, Buddhists, Jains, and Sikhs",
        "Muslim Personal Law – marriage is a contract, not compulsorily registered but **Nikahnama** is used",
        "Christian Marriage Act, 1872 – for Christians",
        "Parsi Marriage and Divorce Act, 1936 – for Parsis",
        "Special Marriage Act, 1954 – for inter-faith or civil marriages without religious rites"
      ]
    },
    {
      "heading": "Procedure for Registration",
      "text": [
        "The general procedure for registering a marriage includes:"
      ],
      "list": [
        "Fill and submit the marriage registration application form (online/offline depending on state)",
        "Provide proof of marriage (wedding invitation or photos)",
        "Submit identity and address proofs of both spouses and witnesses",
        "Appear before the Marriage Registrar with witnesses (usually 2–3)",
        "Marriage Certificate is issued after verification"
      ]
    },
    {
      "heading": "Documents Required",
      "text": [
        "Commonly required documents include:"
      ],
      "list": [
        "Age proof (birth certificate, passport, etc.)",
        "Address proof (Aadhar, voter ID, utility bill)",
        "Marriage invitation card or photographs",
        "Passport-sized photos of both spouses",
        "Affidavit confirming marital status and nationality",
        "Witnesses’ ID and address proof"
      ]
    },
    {
      "heading": "Time Limit and Fees",
      "text": [
        "The time limit for registration may vary:",
        "Some states require registration within 60–90 days of marriage, while others allow late registration with a penalty.",
        "Fees for registration also vary by state and method (online/offline), generally ranging from ₹100 to ₹1000."
      ]
    },
    {
      "heading": "Importance of Marriage Registration",
      "text": [
        "A registered marriage provides legal validity and is essential for:",
        "Visa and immigration purposes",
        "Claiming insurance, bank accounts, or inheritance",
        "Legal proof in case of marital disputes or separation",
        "Protecting the rights of women and children"
      ]
    }
  ],
  "legalReferences": [
    {
      "text": "Special Marriage Act, 1954",
      "link": "https://legislative.gov.in/sites/default/files/A1954-43.pdf"
    },
    {
      "text": "Hindu Marriage Act, 1955",
      "link": "https://legislative.gov.in/sites/default/files/A1955-25.pdf"
    },
    {
      "text": "Christian Marriage Act, 1872",
      "link": "https://indiankanoon.org/doc/391885/"
    },
    {
      "text": "Parsi Marriage and Divorce Act, 1936",
      "link": "https://indiankanoon.org/doc/321295/"
    }
  ]
}
,
      "divorce": {
        title: "Divorce Proceedings in India",
        lastUpdated: "March 8, 2025",
        content: [
          {
            heading: "Introduction to Divorce Laws in India",
            text: [
              "Divorce laws in India are governed by various personal laws based on religion. The main legislation includes the Hindu Marriage Act, 1955 (for Hindus, Buddhists, Jains, and Sikhs), the Muslim Personal Law (Shariat) Application Act, 1937, the Divorce Act, 1869 (for Christians), the Parsi Marriage and Divorce Act, 1936, and the Special Marriage Act, 1954 (for inter-religious marriages or civil marriages).",
              "This overview primarily focuses on divorce under the Hindu Marriage Act and Special Marriage Act, which are the most commonly applied laws."
            ]
          },
          {
            heading: "Grounds for Divorce",
            text: [
              "Under the Hindu Marriage Act and Special Marriage Act, divorce can be sought on the following grounds:"
            ],
            list: [
              "Adultery: When the spouse has voluntary sexual intercourse with another person",
              "Cruelty: Physical or mental cruelty that causes reasonable apprehension of harm",
              "Desertion: Abandonment without reasonable cause for a continuous period of at least two years",
              "Conversion: When one spouse converts to another religion",
              "Mental disorder: Unsoundness of mind or continuous/intermittent mental disorder",
              "Communicable disease: If suffering from a virulent and incurable form of leprosy, venereal disease, etc.",
              "Renunciation of the world: Entering religious orders, renouncing civil life",
              "Presumption of death: When there has been no information about the spouse being alive for seven years or more",
              "Mutual consent: When both spouses agree to the divorce (after living separately for at least one year)"
            ]
          },
          {
            heading: "Divorce Process",
            text: [
              "The divorce process in India typically follows these steps:"
            ],
            list: [
              "Filing a petition: The divorce petition is filed in the Family Court having jurisdiction where the couple last resided together, or where the respondent resides, or where the marriage was solemnized",
              "Service of notice: The court issues notice to the respondent spouse",
              "Response and appearance: The respondent files a reply and both parties appear before the court",
              "Mediation or counseling: The court may refer the matter to mediation or counseling",
              "Evidence stage: If reconciliation fails, the court proceeds to record evidence",
              "Final arguments: After evidence is recorded, final arguments are heard",
              "Judgment: The court passes a decree of divorce"
            ]
          },
          {
            heading: "Mutual Consent Divorce",
            text: [
              "For divorce by mutual consent, the procedure is simpler:",
              "Both spouses jointly file a petition stating they have been living separately for at least one year and have mutually agreed to dissolve the marriage.",
              "After filing the petition, there is a mandatory waiting period of 6 months (cooling period).",
              "After the cooling period, both parties must appear in court again to confirm their consent, after which the court grants the divorce decree."
            ]
          },
          {
            heading: "Alimony and Maintenance",
            text: [
              "Either spouse may claim maintenance/alimony based on factors such as:",
              "Income and property of both spouses, conduct of the parties, duration of marriage, age of the spouses, and lifestyle during marriage.",
              "Maintenance can be awarded as a lump sum amount, monthly payment, or both."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Hindu Marriage Act, 1955",
            link: "https://legislative.gov.in/sites/default/files/A1955-25.pdf"
          },
          {
            text: "Special Marriage Act, 1954",
            link: "https://legislative.gov.in/sites/default/files/A1954-43.pdf"
          },
          {
            text: "Section 125 of Criminal Procedure Code (Maintenance)",
            link: "https://indiankanoon.org/doc/1056396/"
          }
        ]
      },
      "child-custody": {
        title: "Child Custody Laws in India",
        lastUpdated: "April 12, 2025",
        content: [
          {
            heading: "Introduction to Child Custody in India",
            text: [
              "Child custody laws in India are primarily governed by the Guardians and Wards Act, 1890, and various personal laws based on religion. The Hindu Minority and Guardianship Act, 1956 applies to Hindus, while Muslim personal law applies to Muslims, and so on.",
              "In all custody matters, Indian courts are guided by the principle of 'welfare of the child' or 'best interests of the child', which is considered paramount regardless of religious laws."
            ]
          },
          {
            heading: "Types of Custody Arrangements",
            text: [
              "Indian law recognizes several types of custody arrangements:"
            ],
            list: [
              "Physical Custody: Where the child resides with one parent",
              "Legal Custody: The right to make decisions regarding the child's education, health, and upbringing",
              "Joint Custody: Where both parents share responsibility for the child",
              "Sole Custody: Where one parent has complete custody rights",
              "Visitation Rights: Where the non-custodial parent has the right to visit the child"
            ]
          },
          {
            heading: "Factors Determining Custody",
            text: [
              "When deciding custody cases, courts consider various factors including:"
            ],
            list: [
              "Age and gender of the child (for very young children, mothers are often preferred)",
              "Wishes of the child (if they are old enough to express a preference)",
              "Parents' ability to provide for the child's needs (financial, emotional, educational)",
              "Character and behavior of the parents",
              "Continuity and stability in the child's life",
              "Parent's willingness to facilitate the child's relationship with the other parent",
              "History of domestic violence or abuse (if any)"
            ]
          },
          {
            heading: "Recent Developments",
            text: [
              "Recent trends in Indian family law show a shift from traditional maternal preference to a more balanced approach that recognizes fathers' rights and the importance of both parents in a child's life.",
              "Courts are increasingly favoring joint custody arrangements where parents share responsibilities for the child's upbringing, while considering the practical aspects of the arrangement."
            ]
          },
          {
            heading: "Legal Process for Custody Matters",
            text: [
              "Custody matters can be resolved through:",
              "Mutual agreement between parents (which can be formalized through a court decree), court proceedings under personal laws or the Guardians and Wards Act, or alternative dispute resolution methods like mediation (which is increasingly being encouraged by courts)."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Guardians and Wards Act, 1890",
            link: "https://legislative.gov.in/sites/default/files/A1890-8.pdf"
          },
          {
            text: "Hindu Minority and Guardianship Act, 1956",
            link: "https://legislative.gov.in/sites/default/files/A1956-32.pdf"
          },
          {
            text: "The Convention on the Rights of the Child (Ratified by India)",
            link: "https://www.ohchr.org/en/professionalinterest/pages/crc.aspx"
          }
        ]
      },
      "maintenance-rights": {
        title: "Maintenance Laws in India",
        lastUpdated: "March 25, 2025",
        content: [
          {
            heading: "Overview of Maintenance Laws",
            text: [
              "Maintenance laws in India provide financial support to spouses, children, and parents who are unable to maintain themselves. These laws are designed to prevent destitution and ensure basic necessities for dependent family members.",
              "Maintenance laws in India are governed by various personal laws based on religion, as well as secular provisions under the Criminal Procedure Code (CrPC)."
            ]
          },
          {
            heading: "Maintenance Under Section 125 CrPC",
            text: [
              "Section 125 of the Criminal Procedure Code is a secular provision applicable to all citizens regardless of religion. It provides for maintenance to:",
              "Wives (including divorced wives) who are unable to maintain themselves, minor children (legitimate or illegitimate), unmarried daughters, and parents (father or mother) who are unable to maintain themselves."
            ]
          },
          {
            heading: "Maintenance Under Hindu Law",
            text: [
              "For Hindus, maintenance is governed by the Hindu Adoption and Maintenance Act, 1956, which provides that:",
              "A Hindu wife is entitled to maintenance from her husband during her lifetime. A divorced Hindu wife can claim maintenance under this Act in addition to any claim under Section 125 CrPC. Hindu children are entitled to maintenance from their parents until they attain majority, and parents are entitled to maintenance from their children."
            ]
          },
          {
            heading: "Maintenance Under Muslim Law",
            text: [
              "Under Muslim law, maintenance (nafaqa) includes food, clothing, and lodging. The provisions include:",
              "A Muslim husband is bound to maintain his wife during the subsistence of marriage and during the iddat period after divorce. A Muslim woman can also claim maintenance under Section 125 CrPC as per the Supreme Court judgment in the Shamim Ara case. Children are entitled to maintenance until puberty for sons and until marriage for daughters."
            ]
          },
          {
            heading: "Factors Determining Maintenance Amount",
            text: [
              "Courts consider various factors when determining the amount of maintenance, including:"
            ],
            list: [
              "Income and financial status of both parties",
              "Standard of living of the parties during marriage",
              "Reasonable needs of the dependent",
              "Number of dependents the respondent has to support",
              "Liabilities and debts of the respondent",
              "Health, age, and employment capabilities of the parties",
              "Conduct of the parties and the circumstances of the case"
            ]
          },
          {
            heading: "Legal Process for Claiming Maintenance",
            text: [
              "To claim maintenance, the procedure typically involves:",
              "Filing an application before the appropriate court or magistrate, providing evidence of relationship with the respondent, demonstrating inability to maintain oneself, and proof of the respondent's ability to provide maintenance."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Section 125 of Criminal Procedure Code",
            link: "https://indiankanoon.org/doc/1056396/"
          },
          {
            text: "Hindu Adoption and Maintenance Act, 1956",
            link: "https://legislative.gov.in/sites/default/files/A1956-78.pdf"
          },
          {
            text: "Muslim Women (Protection of Rights on Divorce) Act, 1986",
            link: "https://legislative.gov.in/sites/default/files/A1986-25.pdf"
          }
        ]
      },
      "inheritance-succession": {
        title: "Inheritance and Succession Laws in India",
        lastUpdated: "April 10, 2025",
        content: [
          {
            heading: "Overview of Inheritance Laws in India",
            text: [
              "Inheritance and succession laws in India determine how property is transferred after a person's death. These laws are largely governed by personal laws based on religion, with some secular laws applicable across communities.",
              "The major inheritance laws in India include the Hindu Succession Act, 1956 (for Hindus, Buddhists, Jains, and Sikhs), the Indian Succession Act, 1925 (for Christians and Parsis), and Muslim Personal Law for Muslims."
            ]
          },
          {
            heading: "Hindu Succession Laws",
            text: [
              "The Hindu Succession Act, 1956, as amended in 2005, provides for:",
              "Equal inheritance rights to sons and daughters in ancestral property, abolition of the concept of 'coparcenary property' that previously favored male heirs, and equal distribution of property among Class I heirs (which include sons, daughters, widow, mother, etc.)."
            ]
          },
          {
            heading: "Muslim Succession Laws",
            text: [
              "Muslim inheritance laws are based on religious texts and differ between Sunni and Shia traditions:",
              "Under Sunni law, the property is distributed among legal heirs according to specified shares (Quranic heirs or Sharers) and residuary heirs (Agnatic heirs or Residuaries). Shia law follows a slightly different system with priorities of heirs. Generally, a Muslim can only bequeath up to one-third of their property through a will; the remaining must follow the prescribed shares."
            ]
          },
          {
            heading: "Christian and Parsi Succession Laws",
            text: [
              "Christians and Parsis are governed by the Indian Succession Act, 1925, which provides that:",
              "If a Christian dies intestate (without a will), the property is distributed among the spouse, children, and other relatives according to the rules specified in the Act. For Parsis, there are specific provisions in the Indian Succession Act that govern the distribution of property."
            ]
          },
          {
            heading: "Testamentary Succession (Will)",
            text: [
              "All communities in India have the right to make a will (except for certain restrictions for Muslims), which allows a person to determine how their property will be distributed after death.",
              "A valid will must be in writing, signed by the testator, and attested by at least two witnesses. It can be registered, though registration is not mandatory."
            ]
          },
          {
            heading: "Recent Developments",
            text: [
              "Recent developments in Indian succession laws include:",
              "The 2005 amendment to the Hindu Succession Act that granted daughters equal rights in ancestral property, judicial recognition of the rights of illegitimate children, and the growing recognition of the inheritance rights of adopted children."
            ]
          }
        ],
        legalReferences: [
          {
            text: "Hindu Succession Act, 1956",
            link: "https://legislative.gov.in/sites/default/files/A1956-30.pdf"
          },
          {
            text: "Indian Succession Act, 1925",
            link: "https://legislative.gov.in/sites/default/files/A1925-39.pdf"
          },
          {
            text: "Muslim Personal Law (Shariat) Application Act, 1937",
            link: "https://legislative.gov.in/sites/default/files/A1937-26.pdf"
          }
        ]
      }
    },
    "rti": {
      "rti-filing": {
        title: "Filing RTI Applications in India",
        lastUpdated: "February 28, 2025",
        content: [
          {
            heading: "Introduction to Right to Information",
            text: [
              "The Right to Information Act, 2005 empowers citizens to request information from a 'public authority' which is required to reply within 30 days. The RTI Act covers all levels of government – central, state, and local bodies, as well as NGOs that are substantially financed by the government.",
              "This law promotes transparency and accountability in the working of every public authority by enabling citizens to access information under the control of public authorities."
            ]
          },
          {
            heading: "Who Can File an RTI",
            text: [
              "Any citizen of India can file an RTI application. Foreign nationals are not eligible to file RTI applications."
            ]
          },
          {
            heading: "Information That Can Be Requested",
            text: [
              "Under the RTI Act, you can request:"
            ],
            list: [
              "Any information that exists in any form, including records, documents, memos, emails, opinions, advices, press releases, circulars, orders, logbooks, contracts, reports, papers, samples, models, data material in electronic form",
              "Information relating to any private body which can be accessed by a public authority under any other law",
              "Certified copies of documents or records",
              "Inspection of work, documents, records",
              "Taking notes, extracts, or certified samples of materials"
            ]
          },
          {
            heading: "Step-by-Step Process for Filing RTI",
            text: [
              "To file an RTI application, follow these steps:"
            ],
            list: [
              "Identify the public authority that holds the information you seek",
              "Prepare your application in writing (in English, Hindi, or official language of the area)",
              "Clearly state the information you are seeking (be specific and concise)",
              "Pay the application fee (₹10 for central government departments, may vary for state governments)",
              "Submit your application to the Public Information Officer (PIO) of the relevant department"
            ]
          },
          {
            heading: "Payment Methods",
            text: [
              "RTI application fees can be paid through:",
              "Cash (when submitting in person), Demand Draft, Banker's Cheque, Indian Postal Order, or online payment (for central government departments through the RTI Online Portal).",
              "Note that applicants below poverty line (BPL) are exempt from paying the application fee. However, they must provide proof of their BPL status."
            ]
          },
          {
            heading: "Timeline for Response",
            text: [
              "Once an RTI application is submitted, the public authority must respond within:",
              "30 days from the date of receipt of the application in normal cases",
              "48 hours when the information sought concerns the life or liberty of a person",
              "35 days where the application is transferred from one public authority to another",
              "40 days where third party information is involved"
            ]
          }
        ],
        legalReferences: [
          {
            text: "Right to Information Act, 2005",
            link: "https://rti.gov.in/rti-act.pdf"
          },
          {
            text: "RTI Rules, 2012",
            link: "https://dopt.gov.in/sites/default/files/RTI-Rules-2012.pdf"
          }
        ]
      }
    }
  };

  // Return mock data for the requested topic
  return topicsDatabase[categoryId]?.[topicId] || null;
}

export default LegalTopicDetail;