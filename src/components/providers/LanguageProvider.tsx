import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    "home.headline": "Justice Starts With Awareness",
    "home.tagline": "Know your rights. Take action. Find support.",
    "home.cta": "Start Exploring",
    "home.features.title": "What Nyaya Sathi Offers",
    "home.features.legal.title": "Knowledge on Legal Rights",
    "home.features.legal.desc": "Easy-to-understand information on labor rights, housing, domestic abuse, and more.",
    "home.features.docs.title": "Document Generator",
    "home.features.docs.desc": "Create legal documents like complaint letters, RTI applications, and notices.",
    "home.features.help.title": "Find Legal Help",
    "home.features.help.desc": "Locate nearby legal aid centers, free lawyers, women's shelters, and more.",
    "home.features.literacy.title": "Legal Literacy Hub",
    "home.features.literacy.desc": "Access audio stories and micro-learning videos about legal rights.",
    "home.features.volunteer.title": "Volunteer & NGO Registration",
    "home.features.volunteer.desc": "Register as a lawyer or NGO to provide legal services and support.",
    "home.howitworks.title": "How Nyaya Sathi Works",
    "home.howitworks.step1.title": "Explore Topics",
    "home.howitworks.step1.desc": "Learn about your legal rights in various situations through our simplified guides.",
    "home.howitworks.step2.title": "Create Documents",
    "home.howitworks.step2.desc": "Use our easy forms to generate legal documents for your specific needs.",
    "home.howitworks.step3.title": "Find Support",
    "home.howitworks.step3.desc": "Connect with legal aid centers, NGOs and other support services near you.",
    "home.cta.title": "Ready to Learn About Your Rights?",
    "home.cta.desc": "Start exploring legal topics that matter to you and take the first step towards justice.",
    "home.cta.button": "Browse Legal Topics"
  },
  hi: {
    "home.headline": "न्याय जागरूकता से शुरू होता है",
    "home.tagline": "अपने अधिकारों को जानें। कार्रवाई करें। समर्थन प्राप्त करें।",
    "home.cta": "अन्वेषण शुरू करें",
    "home.features.title": "न्याय साथी क्या प्रदान करता है",
    "home.features.legal.title": "कानूनी अधिकारों की जानकारी",
    "home.features.legal.desc": "श्रम अधिकार, आवास, घरेलू हिंसा, और अधिक पर सरल जानकारी।",
    "home.features.docs.title": "दस्तावेज़ जनरेटर",
    "home.features.docs.desc": "शिकायत पत्र, आरटीआई आवेदन और नोटिस जैसे कानूनी दस्तावेज बनाएं।",
    "home.features.help.title": "कानूनी सहायता खोजें",
    "home.features.help.desc": "नज़दीकी कानूनी सहायता केंद्र, मुफ्त वकील, महिला आश्रय खोजें।",
    "home.features.literacy.title": "कानूनी साक्षरता केंद्र",
    "home.features.literacy.desc": "कानूनी अधिकारों के बारे में ऑडियो कहानियां और वीडियो देखें।",
    "home.features.volunteer.title": "स्वयंसेवक और एनजीओ पंजीकरण",
    "home.features.volunteer.desc": "वकील या एनजीओ के रूप में कानूनी सेवाएं प्रदान करने के लिए पंजीकरण करें।",
    "home.howitworks.title": "न्याय साथी कैसे काम करता है",
    "home.howitworks.step1.title": "विषयों का अन्वेषण करें",
    "home.howitworks.step1.desc": "सरल गाइड के माध्यम से विभिन्न स्थितियों में अपने कानूनी अधिकारों के बारे में जानें।",
    "home.howitworks.step2.title": "दस्तावेज़ बनाएं",
    "home.howitworks.step2.desc": "अपनी विशिष्ट आवश्यकताओं के लिए आसान फॉर्म का उपयोग करके कानूनी दस्तावेज तैयार करें।",
    "home.howitworks.step3.title": "सहायता प्राप्त करें",
    "home.howitworks.step3.desc": "कानूनी सहायता केंद्रों, एनजीओ और अन्य सहायता सेवाओं से जुड़ें।",
    "home.cta.title": "अपने अधिकारों के बारे में जानने के लिए तैयार हैं?",
    "home.cta.desc": "अपने लिए महत्वपूर्ण कानूनी विषयों का अन्वेषण करें और न्याय की दिशा में पहला कदम उठाएं।",
    "home.cta.button": "कानूनी विषय ब्राउज़ करें"
  },
  bn: {
    "home.headline": "ন্যায় সচেতনতা থেকে শুরু হয়",
    "home.tagline": "আপনার অধিকারগুলি জানুন। পদক্ষেপ নিন। সমর্থন খুঁজুন।",
    "home.cta": "অন্বেষণ শুরু করুন",
    "home.features.title": "ন্যায় সাথী কি অফার করে",
    "home.features.legal.title": "আইনগত অধিকার সম্পর্কে জ্ঞান",
    "home.features.legal.desc": "শ্রম অধিকার, আবাসন, গার্হস্থ্য নির্যাতন এবং আরও অনেক বিষয়ে সহজে বোঝার তথ্য।",
    "home.features.docs.title": "ডকুমেন্ট জেনারেটর",
    "home.features.docs.desc": "অভিযোগপত্র, আরটিআই আবেদন এবং নোটিশের মতো আইনি নথি তৈরি করুন।",
    "home.features.help.title": "আইনগত সহায়তা খুঁজুন",
    "home.features.help.desc": "কাছাকাছি আইনি সহায়তা কেন্দ্র, বিনামূল্যে আইনজীবী, মহিলাদের আশ্রয়কেন্দ্র খুঁজুন।",
    "home.features.literacy.title": "আইনগত সাক্ষরতা কেন্দ্র",
    "home.features.literacy.desc": "আইনগত অধিকার সম্পর্কে অডিও গল্প এবং মাইক্রো-লার্নিং ভিডিও অ্যাক্সেস করুন।",
    "home.features.volunteer.title": "স্বেচ্ছাসেবক এবং এনজিও নিবন্ধন",
    "home.features.volunteer.desc": "আইনগত পরিষেবা এবং সহায়তা প্রদানের জন্য একজন আইনজীবী বা এনজিও হিসাবে নিবন্ধন করুন।",
    "home.howitworks.title": "ন্যায় সাথী কিভাবে কাজ করে",
    "home.howitworks.step1.title": "বিষয়গুলি অন্বেষণ করুন",
    "home.howitworks.step1.desc": "আমাদের সরলীকৃত গাইডের মাধ্যমে বিভিন্ন পরিস্থিতিতে আপনার আইনি অধিকার সম্পর্কে জানুন।",
    "home.howitworks.step2.title": "নথি তৈরি করুন",
    "home.howitworks.step2.desc": "আপনার নির্দিষ্ট প্রয়োজনের জন্য আমাদের সহজ ফর্ম ব্যবহার করে আইনি নথি তৈরি করুন।",
    "home.howitworks.step3.title": "সমর্থন খুঁজুন",
    "home.howitworks.step3.desc": "আইনি সহায়তা কেন্দ্র, এনজিও এবং অন্যান্য সহায়তা পরিষেবার সাথে সংযোগ স্থাপন করুন।",
    "home.cta.title": "আপনার অধিকার সম্পর্কে জানতে প্রস্তুত?",
    "home.cta.desc": "আপনার জন্য গুরুত্বপূর্ণ আইনি বিষয়গুলি অন্বেষণ শুরু করুন এবং ন্যায়বিচারের দিকে প্রথম পদক্ষেপ নিন।",
    "home.cta.button": "আইনগত বিষয় ব্রাউজ করুন"
  },
  ta: {
    "home.headline": "நீதி விழிப்புணர்வுடன் தொடங்குகிறது",
    "home.tagline": "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள். நடவடிக்கை எடுங்கள். ஆதரவைக் கண்டறியுங்கள்.",
    "home.cta": "ஆராயத் தொடங்குங்கள்",
    "home.features.title": "நியாய சாதி என்ன வழங்குகிறது",
    "home.features.legal.title": "சட்ட உரிமைகள் பற்றிய அறிவு",
    "home.features.legal.desc": "தொழிலாளர் உரிமைகள், வீட்டுவசதி, குடும்ப வன்முறை மற்றும் பலவற்றைப் பற்றிய எளிதாகப் புரிந்துகொள்ளக்கூடிய தகவல்கள்.",
    "home.features.docs.title": "ஆவண ஜெனரேட்டர்",
    "home.features.docs.desc": "புகார் கடிதங்கள், RTI விண்ணப்பங்கள் மற்றும் அறிவிப்புகள் போன்ற சட்ட ஆவணங்களை உருவாக்கவும்.",
    "home.features.help.title": "சட்ட உதவி தேடுங்கள்",
    "home.features.help.desc": "அருகிலுள்ள சட்ட உதவி மையங்கள், இலவச வழக்கறிஞர்கள், பெண்கள் தங்குமிடங்கள் மற்றும் பலவற்றைக் கண்டறியவும்.",
    "home.features.literacy.title": "சட்ட எழுத்தறிவு மையம்",
    "home.features.literacy.desc": "சட்ட உரிமைகள் பற்றிய ஆடியோ கதைகள் மற்றும் மைக்ரோ-கற்றல் வீடியோக்களை அணுகவும்.",
    "home.features.volunteer.title": "தன்னார்வலர் & NGO பதிவு",
    "home.features.volunteer.desc": "சட்ட சேவைகள் மற்றும் ஆதரவை வழங்க ஒரு வழக்கறிஞர் அல்லது NGO ஆக பதிவு செய்யுங்கள்.",
    "home.howitworks.title": "நியாய சாதி எப்படி வேலை செய்கிறது",
    "home.howitworks.step1.title": "தலைப்புகளை ஆராயுங்கள்",
    "home.howitworks.step1.desc": "எங்கள் எளிமைப்படுத்தப்பட்ட வழிகாட்டிகள் மூலம் பல்வேறு சூழ்நிலைகளில் உங்கள் சட்ட உரிமைகளைப் பற்றி அறிக.",
    "home.howitworks.step2.title": "ஆவணங்களை உருவாக்கவும்",
    "home.howitworks.step2.desc": "உங்கள் குறிப்பிட்ட தேவைகளுக்கு எங்கள் எளிய படிவங்களைப் பயன்படுத்தி சட்ட ஆவணங்களைத் தயாரிக்கவும்.",
    "home.howitworks.step3.title": "ஆதரவு தேடுங்கள்",
    "home.howitworks.step3.desc": "சட்ட உதவி மையங்கள், அரசு சாரா நிறுவனங்கள் மற்றும் பிற உதவி சேவைகளுடன் இணைந்திருங்கள்.",
    "home.cta.title": "உங்கள் உரிமைகளைப் பற்றி அறிய தயாரா?",
    "home.cta.desc": "உங்களுக்கு முக்கியமான சட்டத் தலைப்புகளை ஆராயத் தொடங்குங்கள் மற்றும் நீதிக்கான முதல் படியை எடுங்கள்.",
    "home.cta.button": "சட்டத் தலைப்புகளை உலாவுக"
  }
};


export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("language") || defaultLanguage
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const langObj = translations[language as keyof typeof translations] || translations.en;
    return langObj[key as keyof typeof langObj] || key;
  };

  const value = {
    language,
    setLanguage: (language: string) => {
      localStorage.setItem("language", language);
      setLanguage(language);
    },
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
};
