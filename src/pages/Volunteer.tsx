import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Users, 
  UserPlus, 
  Building, 
  Calendar, 
 
  Phone, 
 
  Check,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  registrationType: z.enum(["individual", "organization"]),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  organization: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Please enter your complete address.",
  }),
  city: z.string().min(2, {
    message: "Please enter your city.",
  }),
  state: z.string().min(2, {
    message: "Please select your state.",
  }),
  services: z.array(z.string()).nonempty({
    message: "Please select at least one service you can provide.",
  }),
  availability: z.string().min(1, {
    message: "Please specify your availability.",
  }),
  experience: z.string().min(1, {
    message: "Please provide information about your experience.",
  }),
  languages: z.array(z.string()).nonempty({
    message: "Please select at least one language you can communicate in.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
  privacyAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy.",
  }),
});

const serviceOptions = [
  { id: "legal-advice", label: "Legal Advice" },
  { id: "document-review", label: "Document Review" },
  { id: "court-representation", label: "Court Representation" },
  { id: "mediation", label: "Mediation Services" },
  { id: "legal-workshops", label: "Legal Education Workshops" },
  { id: "translation", label: "Translation Services" },
  { id: "counseling", label: "Counseling" },
  { id: "shelter", label: "Shelter Services" },
  { id: "other", label: "Other Support Services" },
];

const languageOptions = [
  { id: "hindi", label: "Hindi" },
  { id: "english", label: "English" },
  { id: "bengali", label: "Bengali" },
  { id: "tamil", label: "Tamil" },
  { id: "telugu", label: "Telugu" },
  { id: "marathi", label: "Marathi" },
  { id: "gujarati", label: "Gujarati" },
  { id: "kannada", label: "Kannada" },
  { id: "malayalam", label: "Malayalam" },
  { id: "punjabi", label: "Punjabi" },
  { id: "urdu", label: "Urdu" },
];

const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

const Volunteer = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationType: "individual",
      name: "",
      organization: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      services: [],
      availability: "",
      experience: "",
      languages: [],
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Thank you for registering! We will review your information and contact you soon.");
    form.reset();
  }

  const registrationType = form.watch("registrationType");

  return (
    <div className="container py-8 px-4 max-w-5xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Volunteer & NGO Registration</h1>
        <p className="text-muted-foreground text-lg">
          Join our network of legal professionals, NGOs, and volunteers providing support to underprivileged communities.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Individual Volunteers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Lawyers, paralegals, translators, and other professionals who can provide pro bono services.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              NGOs & Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Legal aid clinics, women's shelters, community organizations, and other service providers.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Flexible Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Volunteer as much or as little as you can. Even a few hours a month can make a difference.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>
            Fill out this form to join our network of volunteers and service providers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="registrationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Registration Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="individual" />
                          <label htmlFor="individual" className="cursor-pointer">Individual (Lawyer, Paralegal, Translator, etc.)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="organization" id="organization" />
                          <label htmlFor="organization" className="cursor-pointer">Organization (NGO, Legal Aid Center, etc.)</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {registrationType === "individual" ? "Full Name" : "Organization Name"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={registrationType === "individual" ? "Your full name" : "Organization name"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {registrationType === "individual" && (
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Organization (Optional)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>If you're affiliated with an organization, please provide its name</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your organization (if applicable)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your complete address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stateOptions.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Services You Can Provide</FormLabel>
                      <FormDescription>
                        Select all that apply
                      </FormDescription>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {serviceOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...field.value, option.id]
                                        : field.value?.filter(
                                            (value) => value !== option.id
                                          );
                                      field.onChange(updatedValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormDescription>
                      Please describe your availability (e.g., weekends, specific days, hours per month)
                    </FormDescription>
                    <FormControl>
                      <Textarea placeholder="I can volunteer on..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {registrationType === "individual" ? "Professional Experience" : "Organization Experience"}
                    </FormLabel>
                    <FormDescription>
                      {registrationType === "individual"
                        ? "Please provide information about your professional background and experience"
                        : "Please describe your organization's work and experience in providing legal or support services"
                      }
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder={registrationType === "individual" 
                          ? "I am a lawyer with experience in..." 
                          : "Our organization has been working on..."
                        } 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="languages"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Languages</FormLabel>
                      <FormDescription>
                        Select all languages you/your organization can communicate in
                      </FormDescription>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3">
                      {languageOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="languages"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...field.value, option.id]
                                        : field.value?.filter(
                                            (value) => value !== option.id
                                          );
                                      field.onChange(updatedValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <a href="/terms" className="text-primary hover:underline">Terms and Conditions</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="privacyAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have read and agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Submit Registration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="bg-primary/10 rounded-xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Application Review</h3>
            <p className="text-muted-foreground text-sm">
              Our team will review your registration information
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Verification Call</h3>
            <p className="text-muted-foreground text-sm">
              We'll contact you to verify details and discuss your involvement
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Join Our Network</h3>
            <p className="text-muted-foreground text-sm">
              Once approved, you'll be added to our network of service providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
