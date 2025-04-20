import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityProviderProps {
  children: ReactNode;
}

interface AccessibilityContextType {
  fontSize: number;
  highContrast: boolean;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const FONT_SIZE_KEY = "nyaya-sathi-font-size";
const HIGH_CONTRAST_KEY = "nyaya-sathi-high-contrast";
const DEFAULT_FONT_SIZE = 16; // Base font size in pixels
const MAX_FONT_SIZE = 24;
const MIN_FONT_SIZE = 14;
const FONT_STEP = 2;

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedSize = localStorage.getItem(FONT_SIZE_KEY);
    return savedSize ? parseInt(savedSize, 10) : DEFAULT_FONT_SIZE;
  });
  
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem(HIGH_CONTRAST_KEY) === "true";
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    localStorage.setItem(HIGH_CONTRAST_KEY, highContrast.toString());
  }, [highContrast]);

  const increaseFont = () => {
    setFontSize((prevSize) => 
      prevSize + FONT_STEP <= MAX_FONT_SIZE 
        ? prevSize + FONT_STEP 
        : prevSize
    );
  };

  const decreaseFont = () => {
    setFontSize((prevSize) => 
      prevSize - FONT_STEP >= MIN_FONT_SIZE 
        ? prevSize - FONT_STEP 
        : prevSize
    );
  };

  const resetFont = () => {
    setFontSize(DEFAULT_FONT_SIZE);
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const value = {
    fontSize,
    highContrast,
    increaseFont,
    decreaseFont,
    resetFont,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  
  return context;
};
