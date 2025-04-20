import { useState} from "react";
import { Play, Book, Download, BookOpen,  Check, Info, ExternalLink, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";


const videoResources = [
  {
    id: 1,
    title: "How to File a Police Complaint",
    description: "Visual guide to filing an FIR at your local police station under CrPC Section 154",
    duration: "05:28",
    language: "Hindi",
    thumbnail: "https://thumbs.dreamstime.com/b/investigation-report-table-investigation-report-gavel-table-119202319.jpg",
    progress: 0,
    youtubeLink: "https://www.youtube.com/embed/1wbUesawHE0?si=QvQ4N3HaDUQanEP4"
  },
  {
    id: 2,
    title: "Your Rights During Arrest",
    description: "What the police can and cannot do during an arrest according to D.K. Basu guidelines",
    duration: "07:15",
    language: "Tamil",
    thumbnail: "https://assets.usestyle.ai/i/9462cf8a-f282-400f-9e28-37414f6305b1",
    progress: 50,
    youtubeLink: "https://www.youtube.com/embed/0hCJX4pIHvU?si=OXEeffPRSUGlgVgV"
  },
  {
    id: 3,
    title: "Understanding Rental Agreements",
    description: "Key points to check before signing a rental agreement under the Rent Control Act",
    duration: "08:33",
    language: "Hindi",
    thumbnail: "https://res.cloudinary.com/ezlf/image/upload/w_360,h_296,f_auto,q_auto/v1625167327/Live/Documents/647866/DescriptionImages/LeaseGraphics_06.png",
    progress: 0,
    youtubeLink: "https://www.youtube.com/embed/lE8sdVJWWMQ?si=Cwabgap7E4_1MAwZ" 
  },
  {
    id: 4,
    title: "Consumer Protection Act 2019",
    description: "New provisions under the Consumer Protection Act and e-commerce rules",
    duration: "11:45",
    language: "Gujarati",
    thumbnail: "https://blog.ipleaders.in/wp-content/uploads/2020/08/iStock-1070418964-1-696x464.jpg",
    progress: 0,
    youtubeLink: "https://www.youtube.com/embed/XIKeGQXPZ7g?si=l-Oe--YtvQUq6XBJ" 
  },
  {
    id: 5,
    title: "Marriage Registration Process",
    description: "Steps to register marriage under various personal laws in India",
    duration: "06:50",
    language: "Malayalam",
    thumbnail: "https://media-api.xogrp.com/images/c5cd9039-3d92-467a-b438-71cb1c7cf9f0~rs_768.h",
    progress: 25,
    youtubeLink: "https://www.youtube.com/embed/XVM1J7UlIMw?si=394CJCZdXNwVlJsz"
  },
];

const readingResources = [
  {
    id: 1,
    title: "Guide to Maternity Benefits",
    description: "Rights under the Maternity Benefit (Amendment) Act, 2017 with 26 weeks leave provision",
    pages: 8,
    language: "English",
    format: "PDF",
    pdfLink: "https://servehrindia.com/maternity-benefits-in-india-1961-act-guide/"
  },
  {
    id: 2,
    title: "Consumer Rights Handbook",
    description: "उपभोक्ता संरक्षण अधिनियम, 2019 के तहत खुद को कैसे सुरक्षित रखें",
    pages: 15,
    language: "Hindi",
    format: "PDF",
    pdfLink: "https://consumeraffairs.nic.in/hi/"
  },
  {
    id: 3,
    title: "Legal Aid Services in India",
    description: "Free legal services available under the Legal Services Authorities Act, 1987",
    pages: 12,
    language: "English",
    format: "PDF",
    pdfLink: "https://nalsa.gov.in/services/legal-aid/legal-services"
  },
  {
    id: 4,
    title: "Women Rights",
    description: "(Understanding Women Rights in India) মহিলাদের রয়েছে এই ৫ গুরুত্বপূর্ণ আইনি অধিকার, জেনে রাখা জরুরি",
    pages: 6,
    language: "Bengali",
    format: "PDF",
    pdfLink: "https://bengali.abplive.com/banking-and-service/married-women-in-india-have-these-5-important-legal-rights-1122724"
  },
  {
    id: 5,
    title: "Senior Citizen Rights",
    description: "తల్లిదండ్రులు మరియు సీనియర్ సిటిజన్ల నిర్వహణ మరియు సంక్షేమ చట్టం, 2007 కింద హక్కులు",
    pages: 10,
    language: "Telugu",
    format: "PDF",
    pdfLink: "https://telugu.samayam.com/business/business-news/government-special-pension-schemes-for-senior-citizens-including-atal-pension-yojana-pradhan-mantri-vaya-vandana-yojana-etc/articleshow/108766780.cms"
  },
  
];

const posterResources = [
  {
    id: 1,
    title: "Know Your Labor Rights",
    description: "Rights under the Minimum Wages Act and Payment of Wages Act",
    
    format: "PDF",
    previewText: "Includes minimum wage rates, working hours limits, and overtime payment rules",
    imageUrl: "https://dol.ny.gov/sites/g/files/oee1171/files/styles/mobile_lead/public/media/2020/04/endworkerexploitation_crowd_1280.jpg?h=95438d8f&itok=4nxd_y4S5",
    downloadLink: "https://dol.ny.gov/sites/g/files/oee1171/files/styles/mobile_lead/public/media/2020/04/endworkerexploitation_crowd_1280.jpg?h=95438d8f&itok=4nxd_y4S5"
  },
  {
    id: 2,
    title: "Domestic Violence Helplines",
    description: "Protection officers' contacts as per the Domestic Violence Act, 2005",
   
    format: "PDF",
    previewText: "Emergency helplines (1091, 181), local protection officers, and free legal aid contacts",
    imageUrl: "https://marketplace.canva.com/EADao9BEnF8/1/0/566w/canva-violet-circles-domestic-violence-awareness-poster-COMorI2y4QY.jpg",
    downloadLink: "https://marketplace.canva.com/EADao9BEnF8/1/0/566w/canva-violet-circles-domestic-violence-awareness-poster-COMorI2y4QY.jpg"
  },
  {
    id: 3,
    title: "SC/ST Protection Rights",
    description: "Protections under the SC/ST (Prevention of Atrocities) Act, 1989",
  
    format: "PDF",
    previewText: "Reporting mechanism for atrocities and compensation schemes for victims",
    imageUrl: "https://www.livelaw.in/h-upload/2024/07/02/750x450_547203-scheduled-castes-and-the-scheduled-tribes-prevention-of-atrocities-act-1989.webp",
    downloadLink: "https://www.livelaw.in/h-upload/2024/07/02/750x450_547203-scheduled-castes-and-the-scheduled-tribes-prevention-of-atrocities-act-1989.webp"
  },
];

interface VideoDialogProps {
  video: any; // replace with actual type
  open: boolean;
  onClose: () => void;
}

const VideoDialog = ({ video, open, onClose }: VideoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe 
            src={video.youtubeLink} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};


interface PosterPreviewDialogProps {
  poster: any; // replace with actual type
  open: boolean;
  onClose: () => void;
}

const PosterPreviewDialog = ({ poster, open, onClose }: PosterPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{poster.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <img 
            src={poster.imageUrl} 
            alt={poster.title} 
            className="max-h-[70vh] object-contain"
          />
          <div className="mt-4 flex gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="gap-2" onClick={() => window.open(poster.downloadLink, '_blank')}>
              <Download className="h-4 w-4" />
              Download Poster
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
// Ensure `selectedVideo` is typed correctly and not inferred as never



const LegalLiteracy = () => {
  const [activeTab, setActiveTab] = useState("video");
  const [showAlert, setShowAlert] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);
  const [resources] = useState({
    video: videoResources
  });

  // const handleProgress = (progress: number) => {

  //   if (!selectedVideo) return;
    
  //   setResources(prevResources => ({
  //     ...prevResources,
  //     video: prevResources.video.map(item => 
  //       item.id === selectedVideo.id ? { ...item, progress } : item
  //     )
  //   }));
  // };
  
  type VideoItem = {
    id: number;
    title: string;
    description: string;
    duration: string;
    language: string;
    thumbnail: string;
    progress: number;
    youtubeLink: string;
  };
  

  const playVideo = (video: VideoItem) => {

    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  type PosterItem = {
    id: number;
    title: string;
    description: string;
    format: string;
    previewText: string;
    imageUrl: string;
    downloadLink: string;
    language?: string; // Optional field (since not all posters may have a language)
  };
  

  const showPosterPreview = (poster:PosterItem) => {
    setSelectedPoster(poster);
  };

  const closePosterPreview = () => {
    setSelectedPoster(null);
  };

  return (
    <div className="container py-8 px-4 max-w-7xl mx-auto">
      {showAlert && (
        <Alert className="mb-6 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This legal information is provided for educational purposes. For specific legal advice, please consult a qualified lawyer.
          </AlertDescription>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setShowAlert(false)}>
            <Check className="h-4 w-4" />
          </Button>
        </Alert>
      )}
      
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Legal Literacy Hub</h1>
        <p className="text-muted-foreground text-lg">
          Access videos and downloadable guides to learn about your legal rights under Indian law.
        </p>
      </div>
      
      <div className="bg-primary/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Legal Word of the Day
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">FIR</h3>
            <p className="text-lg mb-2">First Information Report</p>
            <p className="text-muted-foreground">
              An FIR is a document prepared by police when they receive information about a cognizable offense under Section 154 of the Criminal Procedure Code. 
              It's the first step in the criminal justice process and can be filed by any person who knows about the offense.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button className="gap-2" onClick={() => playVideo(videoResources[0])}>
              <Play className="h-4 w-4" />
              Watch Video Explanation
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="video" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="video" className="flex items-center gap-1">
            <Play className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="reading" className="flex items-center gap-1">
            <Book className="h-4 w-4" />
            Reading Materials
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="video" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.video.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="p-0">
                  <div className="bg-muted aspect-video relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full h-12 w-12 bg-background/80"
                        onClick={() => playVideo(resource)}
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    {resource.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <Progress value={resource.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <Badge variant="outline">{resource.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <p className="text-sm">Duration: {resource.duration}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2" onClick={() => playVideo(resource)}>
                    <ExternalLink className="h-4 w-4" />
                    {resource.progress > 0 ? "Continue Watching" : "Watch Video"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reading" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{resource.title}</CardTitle>
                    <Badge variant="outline">{resource.language}</Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="flex gap-2">
                  <Button className="flex-1 gap-2" onClick={() => window.open(resource.pdfLink, '_blank')}>
                    <Book className="h-4 w-4" />
                    Read Online
                  </Button>
                  
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Downloadable Posters for Offline Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posterResources.map((poster) => (
            <Card key={poster.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{poster.title}</CardTitle>
                  

                </div>
                <CardDescription>{poster.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="aspect-[3/4] bg-muted rounded-md overflow-hidden cursor-pointer"
                  onClick={() => showPosterPreview(poster)}
                >
                  <img 
                    src={poster.imageUrl} 
                    alt={poster.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full gap-2"
                  onClick={() => window.open(poster.downloadLink, '_blank')}
                >
                  <Download className="h-4 w-4" />
                  Download Poster ({poster.format})
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {selectedVideo && (
        <VideoDialog 
          video={selectedVideo}
          open={!!selectedVideo}
          onClose={closeVideo}
        />
      )}
      
      {selectedPoster && (
        <PosterPreviewDialog
          poster={selectedPoster}
          open={!!selectedPoster}
          onClose={closePosterPreview}
        />
      )}
    </div>
  );
};

export default LegalLiteracy;