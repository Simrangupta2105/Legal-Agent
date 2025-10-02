import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Search, MapPin, Filter, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Map from "@/components/Map";

const legalHelpCenters = [
  {
    id: 1,
    name: "District Legal Services Authority (DLSA), Bhopal",
    address: "Civil Court Complex, Berasia Road, Bhopal, Madhya Pradesh",
    phone: "0755-2552935",
    mobile: "7648816709",
    hours: "Mon-Fri: 10:00 AM - 5:00 PM",
    type: "legal-aid",
    services: ["Free Legal Advice", "Document Review", "Court Representation"],
    distance: "Varies",
    latitude: 23.2599,
    longitude: 77.4126
  },
  {
    id: 2,
    name: "Women's Rights Law Firm",
    address: "R-52, First Floor, Zone 1, M.P. Nagar, Near Hotel Shree Vatika, Bhopal – 462011",
    phone: "7000127225",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    type: "lawyer",
    services: ["Women's Rights", "Domestic Violence Cases", "Family Law"],
    distance: "Varies",
    latitude: 23.2599,
    longitude: 77.4126
  },
  {
    id: 3,
    name: "District Legal Services Authority",
    address: "Civil Court Complex, M.G. Road, Delhi",
    phone: "+91 11 2345 6789",
    hours: "Mon-Fri: 10:00 AM - 5:00 PM",
    type: "legal-aid",
    services: ["Free Legal Advice", "Document Review", "Court Representation"],
    distance: "Varies",
    latitude: 28.6329,
    longitude: 77.2195,
  },
  {
    id: 4,
    name: "Women's Rights Law Firm",
    address: "45 Gandhi Nagar, Mumbai",
    phone: "+91 22 8765 4321",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    type: "lawyer",
    services: ["Women's Rights", "Domestic Violence Cases", "Family Law"],
    distance: "Varies",
    latitude: 19.0760,
    longitude: 72.8777,
  },
  {
    id: 5,
    name: "Saheli Women's Shelter",
    address: "12 Nehru Place, Bangalore",
    phone: "+91 80 2345 6789",
    hours: "24/7",
    type: "shelter",
    services: ["Emergency Shelter", "Counseling", "Legal Support"],
    distance: "Varies",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    id: 6,
    name: "Koramangala Police Station",
    address: "80 Feet Road, Koramangala, Bangalore",
    phone: "+91 80 2553 3333",
    hours: "24/7",
    type: "police",
    services: ["FIR Filing", "Emergency Response", "Women's Help Desk"],
    distance: "Varies",
    latitude: 12.9352,
    longitude: 77.6245,
  },
  {
    id: 7,
    name: "Labor Rights NGO",
    address: "24 Industrial Area, Chennai",
    phone: "+91 44 8765 1234",
    hours: "Mon-Fri: 10:00 AM - 4:00 PM",
    type: "ngo",
    services: ["Labor Disputes", "Wage Claims", "Workplace Harassment"],
    distance: "Varies",
    latitude: 13.0827,
    longitude: 80.2707,
  },
];

const FindLegalHelp = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"list" | "map">("list");

  const handleFilterChange = (filterId: string) => {
    setFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredCenters = legalHelpCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filters.length === 0 || filters.includes(center.type);
    return matchesSearch && matchesFilter;
  });

  const filterTypes = [
    { id: "legal-aid", label: t("legal") },
    { id: "lawyer", label: t("lawyer") },
    { id: "shelter", label: t("shelter") },
    { id: "police", label: t("police") },
    { id: "ngo", label: t("ngo") },
  ];

  const getDirectionsUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  return (
    <div className="container py-8 px-4 max-w-7xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{t("Legal help")}</h1>
        <p className="text-muted-foreground text-lg">
          {t("Locations")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Search and filters */}
        <div className="md:col-span-1 space-y-6">
          {/* Search box */}
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterTypes.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`filter-${filter.id}`}
                      checked={filters.includes(filter.id)}
                      onCheckedChange={() => handleFilterChange(filter.id)}
                    />
                    <Label
                      htmlFor={`filter-${filter.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {filter.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFilters([])}
              >
                Clear All Filters
              </Button>
            </CardFooter>
          </Card>
          
          {/* View type toggle */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button
                  variant={viewType === "list" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setViewType("list")}
                >
                  List View
                </Button>
                <Button
                  variant={viewType === "map" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setViewType("map")}
                >
                  Map View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Results */}
        <div className="md:col-span-2">
          {viewType === "list" ? (
            <div className="space-y-4">
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <Card key={center.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{center.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {center.address}
                          </CardDescription>
                        </div>
                        <Badge>
                          {filterTypes.find(f => f.id === center.type)?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Services:</p>
                          <ul className="list-disc list-inside text-sm ml-1">
                            {center.services.map((service, index) => (
                              <li key={index}>{service}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="flex items-center text-sm mb-2">
                            <Phone className="h-4 w-4 mr-2" />
                            {center.phone}
                          </p>
                          <p className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            {center.hours}
                          </p>
                          <p className="text-sm mt-2">
                            <span className="font-medium">Distance:</span> {center.distance}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                        onClick={() => window.open(getDirectionsUrl(center.address), '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Get Directions
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="bg-muted p-8 rounded-lg text-center">
                  <p className="text-xl mb-4">No results found</p>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                  <Button onClick={() => {setSearchQuery(""); setFilters([])}}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-background rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <Map centers={filteredCenters} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindLegalHelp;
