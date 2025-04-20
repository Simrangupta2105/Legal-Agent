import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
  <img
    src="https://www.lni.wa.gov/application/themes/lni/Workers-rights.svg"
    alt="Icon"
    className="absolute inset-0 m-auto h-5 w-5"
  />
</div>

              <span className="font-mukta text-xl font-bold tracking-tight">
                Nyaya Sathi
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering underprivileged communities in India with legal knowledge and support.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/topics" className="text-muted-foreground hover:text-foreground">
                  Legal Topics
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-foreground">
                  Document Generator
                </Link>
              </li>
              <li>
                <Link to="/find-help" className="text-muted-foreground hover:text-foreground">
                  Find Legal Help
                </Link>
              </li>
              <li>
                <Link to="/literacy" className="text-muted-foreground hover:text-foreground">
                  Legal Literacy Hub
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-muted-foreground hover:text-foreground">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              For inquiries or support:
              <br />
              <a href="mailto:info@nyayasathi.org" className="text-primary hover:underline">
                info@nyayasathi.org
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            Nyaya Sathi &copy; {new Date().getFullYear()} - Created with{" "}
            <Heart className="inline-block h-4 w-4 text-destructive" /> for justice
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
