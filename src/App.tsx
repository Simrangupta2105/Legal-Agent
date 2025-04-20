import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AppProviders } from "./components/providers/AppProviders";

// Pages
import Home from "./pages/Home";
import LegalTopics from "./pages/LegalTopics";
import LegalTopicDetail from './pages/LegalTopicDetail'
import DocumentGenerator from "./pages/DocumentGenerator";
import FindLegalHelp from "./pages/FindLegalHelp";
import LegalLiteracy from "./pages/LegalLiteracy";
import Volunteer from "./pages/Volunteer";
import About from "./pages/About";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import NotFound from "./pages/NotFound";
import { ToastProviderWrapper } from "./components/ui/use-toast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProviders>
      <ToastProviderWrapper>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/topics" element={<LegalTopics />} />
              <Route path="topics/:categoryId/:topicId" element={<LegalTopicDetail />} />
              <Route path="/documents" element={<DocumentGenerator />} />
              <Route path="/find-help" element={<FindLegalHelp />} />
              <Route path="/literacy" element={<LegalLiteracy />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<TermsAndPrivacy />} />
              <Route path="/privacy" element={<TermsAndPrivacy />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ToastProviderWrapper>
    </AppProviders>
  </QueryClientProvider>
);

export default App;
