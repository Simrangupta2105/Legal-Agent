import { useState } from "react";
// import { useLanguage } from "@/components/providers/LanguageProvider";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Home as HomeIcon, 
  Heart, 
  Users, 
  FileQuestion, 
  ChevronRight, 
  Search,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
   
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LegalTopics = () => {
  // const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const topicCategories = [
    {
      id: "labor",
      name: "Labor Laws",
      icon: <Briefcase className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700",
      description: "Information about employment rights and workplace regulations",
      topics: [
        { id: "minimum-wage", title: "Minimum Wage" },
        { id: "workplace-safety", title: "Workplace Safety" },
        { id: "working-hours", title: "Working Hours" },
        //{ id: "termination", title: "Job Termination" },
        //{ id: "maternity", title: "Maternity Benefits" }
      ]
    },
    {
      id: "housing",
      name: "Housing Rights",
      icon: <HomeIcon className="h-5 w-5" />,
      color: "bg-green-100 text-green-700",
      description: "Legal information for renters and property owners",
      topics: [
        { id: "tenant-rights", title: "Tenant Rights" },
        // { id: "eviction", title: "Eviction Process" },
        { id: "rental-agreement", title: "Rental Agreements" },
        // { id: "property-dispute", title: "Property Disputes" },
        // { id: "slum-rights", title: "Slum Dwellers' Rights" }
      ]
    },
    {
      id: "domestic",
      name: "Domestic Violence",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-red-100 text-red-700",
      description: "Resources and legal protection against domestic abuse",
      topics: [
        { id: "domestic-violence", title: "Domestic Violence Laws" },
        // { id: "protection-orders", title: "Protection Orders" },
        // { id: "police-complaint", title: "Filing Police Complaints" },
        // { id: "shelter-homes", title: "Shelter Homes" },
        // { id: "counseling", title: "Counseling Services" }
      ]
    },
    {
      id: "marriage",
      name: "Marriage & Family",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700",
      description: "Legal aspects of marriage, divorce and family relations",
      topics: [
        { id: "marriage-registration", title: "Marriage Registration" },
        { id: "divorce", title: "Divorce Proceedings" },
        // { id: "maintenance", title: "Alimony & Maintenance" },
        // { id: "child-custody", title: "Child Custody" },
        // { id: "domestic-partnerships", title: "Domestic Partnerships" }
      ]
    },
    {
      id: "rti",
      name: "Right to Information",
      icon: <FileQuestion className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700",
      description: "How to use RTI to access public information",
      topics: [
        { id: "rti-filing", title: "Filing RTI Applications" },
        // { id: "rti-appeal", title: "RTI Appeals Process" },
        // { id: "rti-exemptions", title: "RTI Exemptions" },
        // { id: "rti-online", title: "Online RTI Filing" },
        // { id: "rti-sample", title: "Sample RTI Applications" }
      ]
    }
  ];

  const filteredCategories = activeTab === "all" 
    ? topicCategories 
    : topicCategories.filter(category => category.id === activeTab);
  
  const filteredWithSearch = searchQuery 
    ? filteredCategories.map(category => ({
        ...category,
        topics: category.topics.filter(topic => 
          topic.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.topics.length > 0)
    : filteredCategories;

  return (
    <div className="container py-8 px-4 max-w-7xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Legal Topics</h1>
        <p className="text-muted-foreground text-lg">
          Browse our collection of legal resources on various topics
        </p>
      </div>
      
      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search legal topics..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Category tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4 flex-wrap h-auto">
          <TabsTrigger value="all">All Topics</TabsTrigger>
          {topicCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              {category.icon}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-8">
          {filteredWithSearch.length > 0 ? (
            filteredWithSearch.map((category) => (
              <div key={category.id} className="space-y-4">
                {activeTab === "all" && (
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${category.color}`}>
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.topics.map((topic) => (
                    <Card key={topic.id} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/topics/${category.id}/${topic.id}`}>
                            Read More
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                        
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No topics found matching your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalTopics;