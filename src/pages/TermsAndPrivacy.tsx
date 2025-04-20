import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndPrivacy = () => {
  return (
    <div className="container py-8 px-4 max-w-5xl mx-auto">
      <Tabs defaultValue="terms" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="terms">Terms of Use</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="terms">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <ScrollArea className="h-[60vh] rounded-md border p-6">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                  <p>Welcome to Nyaya Sathi. These Terms of Service govern your use of our website and the services we offer.</p>
                  <p className="mt-2">
                    By accessing or using Nyaya Sathi, you agree to be bound by these Terms. If you disagree with any part of the terms, 
                    you may not access our service.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">2. Information Disclaimer</h2>
                  <p>
                    The information provided on Nyaya Sathi is for general information purposes only. While we strive 
                    to keep the information up to date and correct, we make no representations or warranties of any kind, 
                    express or implied, about the completeness, accuracy, reliability, suitability, or availability of the 
                    information, products, services, or related graphics contained on the website.
                  </p>
                  <p className="mt-2">
                    The information provided should not be considered as legal advice and is not intended to replace 
                    consultation with a qualified legal professional. Users should seek appropriate legal counsel for 
                    their specific circumstances.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
                  <p>When using our service, you agree to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Provide accurate personal information when required</li>
                    <li>Use the service only for lawful purposes and in accordance with these Terms</li>
                    <li>Not use the service in any way that may impair the performance or functionality of the website</li>
                    <li>Not attempt to gain unauthorized access to any part of the service</li>
                    <li>Not use the service to transmit any harmful code or material</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">4. Volunteer Registration</h2>
                  <p>
                    If you register as a volunteer or legal service provider, you agree to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Provide accurate information about your qualifications and services</li>
                    <li>Respond to requests for assistance in a timely manner</li>
                    <li>Maintain appropriate professional standards when providing assistance</li>
                    <li>Notify us of any changes to your availability or status</li>
                  </ul>
                  <p className="mt-2">
                    We reserve the right to remove any volunteer from our database at our discretion.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">5. Document Generator</h2>
                  <p>
                    Our document generator tool is provided as a basic template service only. The documents 
                    generated are not a substitute for properly prepared legal documents drafted by qualified 
                    legal professionals.
                  </p>
                  <p className="mt-2">
                    Users are responsible for ensuring that any document generated is appropriate for their specific 
                    situation and needs. We strongly recommend having any generated document reviewed by a qualified 
                    legal professional before use.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
                  <p>
                    The content on this website, including but not limited to text, graphics, logos, icons, 
                    and software, is the property of Nyaya Sathi and is protected by copyright and other intellectual 
                    property laws.
                  </p>
                  <p className="mt-2">
                    You may access, download, or print content from the website for your personal, non-commercial use, 
                    provided you do not modify or delete any copyright, trademark, or other proprietary notices.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
                  <p>
                    In no event shall Nyaya Sathi be liable for any indirect, incidental, special, consequential, 
                    or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                    intangible losses, resulting from:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Your access to or use of or inability to access or use the service</li>
                    <li>Any conduct or content of any third party on the service</li>
                    <li>Any content obtained from the service</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                    We will provide notice of changes by posting the updated terms on this page.
                  </p>
                  <p className="mt-2">
                    Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
                  <p>
                    If you have any questions about these Terms, please contact us at info@nyayasathi.org.
                  </p>
                </section>
                
                <p className="text-sm text-muted-foreground italic mt-8">
                  Last updated: April 18, 2024
                </p>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="privacy">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <ScrollArea className="h-[60vh] rounded-md border p-6">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                  <p>
                    At Nyaya Sathi, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
                    use, and safeguard your information when you use our website and services.
                  </p>
                  <p className="mt-2">
                    We designed this platform with privacy in mind, especially for users who may have sensitive legal needs. 
                    Your trust is important to us, and we take the responsibility of protecting your information seriously.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                  <p>We collect information in the following ways:</p>
                  <h3 className="font-medium mt-3 mb-1">2.1 Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Contact information (when you register as a volunteer or request specific services)</li>
                    <li>Information provided when using our document generator tool</li>
                    <li>Feedback and communications you send us directly</li>
                  </ul>
                  
                  <h3 className="font-medium mt-3 mb-1">2.2 Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Basic usage statistics to improve our service</li>
                    <li>Device information necessary for the website to function properly</li>
                  </ul>
                  <p className="mt-2">
                    <strong>Important:</strong> We intentionally limit data collection to the minimum necessary to provide our services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">3. How We Use Information</h2>
                  <p>We use the information we collect in the following ways:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>To provide and maintain our services</li>
                    <li>To match users with appropriate legal resources and volunteers</li>
                    <li>To improve our website and services</li>
                    <li>To communicate with you about our services</li>
                    <li>To generate documents based on information you provide</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">4. Data Protection</h2>
                  <p>
                    We implement appropriate security measures to protect against unauthorized access, alteration, 
                    disclosure, or destruction of your personal information.
                  </p>
                  <p className="mt-2">
                    <strong>Document Generation:</strong> When you use our document generator, the information you provide 
                    is processed on your device. We do not store copies of your completed legal documents on our servers.
                  </p>
                  <p className="mt-2">
                    <strong>Offline Access:</strong> Many features of our platform are designed to work offline, reducing 
                    the need for constant data transmission.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">5. No Tracking Policy</h2>
                  <p>
                    We do not use cookies or tracking technologies to monitor your browsing behavior. 
                    We do not create user profiles or track your activity across other websites.
                  </p>
                  <p className="mt-2">
                    Our commitment is to provide a service that respects your privacy. We believe that access to legal information 
                    should not come at the cost of your personal data.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">6. Sharing of Information</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to outside parties. 
                    The only exceptions are:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>When necessary to provide a service you have requested (e.g., connecting you with a volunteer)</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
                  <p>
                    We keep your information only as long as necessary to provide you with our services and for legitimate 
                    operational purposes. If you request that your account be deleted, we will remove your personal information 
                    from our active databases.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to our processing of your information</li>
                    <li>Request a copy of your information in a structured, machine-readable format</li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, please contact us at privacy@nyayasathi.org.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                    the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p className="mt-2">
                    We encourage you to review this Privacy Policy periodically for any changes.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@nyayasathi.org.
                  </p>
                </section>
                
                <p className="text-sm text-muted-foreground italic mt-8">
                  Last updated: April 18, 2024
                </p>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TermsAndPrivacy;