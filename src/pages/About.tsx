import { 
    Users, 
    Scale, 
    Heart, 
    Shield, 
    BookOpen, 
    GraduationCap
  } from "lucide-react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  
  
  const About = () => {
    return (
      <div className="container py-8 px-4 max-w-7xl mx-auto">
        {/* Hero section */}
        <section className="py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Nyaya Sathi</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A non-profit initiative to make legal information accessible and understandable 
            for underprivileged communities across India.
          </p>
        </section>
        
        {/* Mission */}
        <section className="py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At Nyaya Sathi, we believe that access to justice begins with access to information. 
              Our mission is to empower underprivileged communities by providing:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Scale className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Simple, accessible legal information in multiple languages</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Practical tools to create basic legal documents</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Connections to verified legal aid and support services</span>
              </li>
              <li className="flex items-start">
                <GraduationCap className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Legal literacy education through accessible media</span>
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-xl p-6">
            <blockquote className="text-lg font-mukta italic">
              "Justice will not be served until those who are unaffected are as outraged as those who are."
              <footer className="text-right font-semibold mt-2">— Benjamin Franklin</footer>
            </blockquote>
          </div>
        </section>
        
        {/* Who We Serve */}
        <section className="py-12 bg-secondary/50 rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Migrant & Informal Workers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Daily wage laborers, construction workers, domestic help, and other informal sector employees 
                  who often lack information about their rights.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Victims of Abuse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Those experiencing domestic violence, workplace harassment, or other forms of abuse 
                  who need immediate information and access to support services.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Rural & Low-Income Individuals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  People in rural communities or low-income areas who face geographical, financial, 
                  or educational barriers to accessing legal information.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="flex justify-center gap-6 flex-wrap md:flex-nowrap px-4">
            {/* Team Member 1 */}
            <div className="w-[200px] text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">PK</span>
              </div>
              <h3 className="text-xl font-semibold">Pallav Kishor</h3>
              <p className="text-muted-foreground">Technology Lead </p>
            </div>

            {/* Team Member 2 */}
            <div className="w-[200px] text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">AKS</span>
              </div>
              <h3 className="text-xl font-semibold">Aditya Kumar Shaw</h3>
              <p className="text-muted-foreground">Developer and Content Creator</p>
            </div>

            {/* Team Member 3 */}
            <div className="w-[200px] text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">SS</span>
              </div>
              <h3 className="text-xl font-semibold">Shashank Sinha</h3>
              <p className="text-muted-foreground">Developer</p>
            </div>

            {/* Team Member 4 */}
            <div className="w-[200px] text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">MKS</span>
              </div>
              <h3 className="text-xl font-semibold">Mayank Kumar Karn</h3>
              <p className="text-muted-foreground">Developer</p>
            </div>
          </div>
        </section>


        
        {/* Partners */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-muted rounded-md mb-4 flex items-center justify-center">
                <span className="font-semibold">DLSA</span>
              </div>
              <p className="text-sm">District Legal Services Authority</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-muted rounded-md mb-4 flex items-center justify-center">
                <span className="font-semibold">HRLN</span>
              </div>
              <p className="text-sm">Human Rights Law Network</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-muted rounded-md mb-4 flex items-center justify-center">
                <span className="font-semibold">SEWA</span>
              </div>
              <p className="text-sm">Self Employed Women's Association</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-muted rounded-md mb-4 flex items-center justify-center">
                <span className="font-semibold">NALSA</span>
              </div>
              <p className="text-sm">National Legal Services Authority</p>
            </div>
          </div>
        </section>
        
        {/* Privacy & Data */}
        <section className="py-12 bg-primary/5 rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Privacy & Data Protection</h2>
          <p className="text-center max-w-3xl mx-auto mb-6">
            We take your privacy seriously. Our platform is designed with privacy and security in mind:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Minimal Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We only collect the information necessary to provide our services. 
                  No personal data is stored without your explicit consent.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Offline Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Many features of our platform work offline, reducing the need for 
                  constant data transmission and addressing concerns about connectivity.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>No Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We do not track your browsing behavior or create user profiles. 
                  We respect your right to privacy while accessing legal information.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Secure Document Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Documents generated through our platform are processed on your device. 
                  We do not store copies of your completed legal documents.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Contact */}
        <section className="py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-6">
            Have questions, suggestions, or want to get involved?
          </p>
          <div className="max-w-md mx-auto">
            <p className="mb-2">Email: <a href="mailto:info@nyayasathi.org" className="text-primary hover:underline">info@legalagent.org</a></p>
            <p>Phone: +91 11 2345 6789</p>
          </div>
        </section>
      </div>
    );
  };
  
  export default About;