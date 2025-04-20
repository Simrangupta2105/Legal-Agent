import { useState } from "react";
import { 
  FileText, 
  FileQuestion, 
  FilePlus2, 
  AlertCircle, 
  Info, 
  Download,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DocumentGenerator = () => {
  
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    email: "",
    recipient: "",
    recipientAddress: "",
    subject: "",
    body: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocType(docId);
    setCurrentStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setSelectedDocType(null);
    setCurrentStep(1);
    setFormData({
      name: "",
      address: "",
      city: "",
      pincode: "",
      phone: "",
      email: "",
      recipient: "",
      recipientAddress: "",
      subject: "",
      body: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleDownload = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // Get the document content element
      //const content = document.getElementById("document-preview");
      
      // Convert the HTML element to canvas
      const content = document.getElementById("doc-content") as HTMLElement;
      const canvas = await html2canvas(content, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      // Initialize jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate the width and height to maintain aspect ratio
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Get document title for the filename
      const docTypeName = documentTypes.find(d => d.id === selectedDocType)?.title || 'Document';
      
      // Save the PDF
      pdf.save(`${docTypeName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const documentTypes = [
    {
      id: "complaint-letter",
      title: "Complaint Letter",
      description: "Create an official complaint to address a grievance",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "rti-application",
      title: "RTI Application",
      description: "Request information from public authorities",
      icon: <FileQuestion className="h-5 w-5" />,
    },
    {
      id: "domestic-violence-report",
      title: "Domestic Violence Report",
      description: "Document incidents of domestic abuse",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      id: "notice-employer",
      title: "Notice to Employer",
      description: "Formally communicate with your employer",
      icon: <FilePlus2 className="h-5 w-5" />,
    },
  ];

  return (
    <div className="container py-8 px-4 max-w-7xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Document Generator</h1>
        <p className="text-muted-foreground text-lg">
          Create legally formatted documents customized to your situation
        </p>
      </div>

      {currentStep === 1 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {documentTypes.map((doc) => (
            <Card 
              key={doc.id} 
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleDocumentSelect(doc.id)}
            >
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {doc.icon}
                </div>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => handleDocumentSelect(doc.id)}>
                  Select <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {currentStep === 2 && selectedDocType && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Your Personal Details</CardTitle>
            <CardDescription>
              Please enter your contact information for the document
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your complete legal name</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Your contact number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Your current address"
                rows={2}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input 
                  id="pincode" 
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="PIN code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Your email address"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNextStep}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && selectedDocType && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
            <CardDescription>
              Enter the details needed for your {documentTypes.find(d => d.id === selectedDocType)?.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">
                Recipient Name
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Person or organization receiving this document</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input 
                id="recipient" 
                value={formData.recipient}
                onChange={(e) => handleInputChange("recipient", e.target.value)}
                placeholder="Who is this document for?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Textarea 
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                placeholder="Address of the recipient"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief subject of the document"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body">
                Document Body
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Describe your situation in detail</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea 
                id="body"
                value={formData.body}
                onChange={(e) => handleInputChange("body", e.target.value)}
                placeholder="Provide all relevant details for your document"
                rows={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNextStep}>
              Preview <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 4 && selectedDocType && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Document Preview</CardTitle>
            <CardDescription>
              Review your {documentTypes.find(d => d.id === selectedDocType)?.title} before downloading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div id="document-preview" className="p-6 border rounded-md bg-white text-foreground">
              <div className="text-right mb-6">
                {formData.date}
              </div>
              
              <div className="mb-6">
                <p>{formData.name}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.pincode}</p>
                <p>{formData.phone}</p>
                {formData.email && <p>{formData.email}</p>}
              </div>
              
              <div className="mb-6">
                <p>{formData.recipient}</p>
                <p>{formData.recipientAddress}</p>
              </div>
              
              <div className="mb-6">
                <p className="font-semibold">Subject: {formData.subject}</p>
              </div>
              
              <div className="mb-6">
                <p>Dear {formData.recipient},</p>
                <div className="mt-4 whitespace-pre-line">
                  {formData.body}
                </div>
              </div>
              
              <div className="mt-8">
                <p>Sincerely,</p>
                <p className="mt-4">{formData.name}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DocumentGenerator;