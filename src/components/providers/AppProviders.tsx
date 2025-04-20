import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageProvider";
import { AccessibilityProvider } from "./AccessibilityProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}