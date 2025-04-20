import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArrowRight, Users, BookOpen, FileText, Map, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden bg-gradient-to-br from-primary/95 to-primary">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
        <div className="container mx-auto text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in drop-shadow-lg">
            {t("home.headline")}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90 animate-fade-in drop-shadow">
            {t("home.tagline")}
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 animate-fade-in" asChild>
            <Link to="/topics">
              {t("home.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className="py-16 px-4 bg-nyaya-cream/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Nyaya Sathi Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="h-10 w-10 text-nyaya-indigo" />}
              title="Knowledge on Legal Rights"
              description="Easy-to-understand information on labor rights, housing, domestic abuse, and more."
              link="/topics"
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-nyaya-indigo" />}
              title="Document Generator"
              description="Create legal documents like complaint letters, RTI applications, and notices."
              link="/documents"
            />
            <FeatureCard 
              icon={<Map className="h-10 w-10 text-nyaya-indigo" />}
              title="Find Legal Help"
              description="Locate nearby legal aid centers, free lawyers, women's shelters, and more."
              link="/find-help"
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-nyaya-indigo" />}
              title="Legal Literacy Hub"
              description="Access audio stories and micro-learning videos about legal rights."
              link="/literacy"
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-nyaya-indigo" />}
              title="Volunteer & NGO Registration"
              description="Register as a lawyer or NGO to provide legal services and support."
              link="/volunteer"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works - Animated Cards */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Nyaya Sathi Works</h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            <SquishyCard 
              number="1"
              title="Explore Topics"
              description="Learn about your legal rights in various situations through our simplified guides."
              color="bg-nyaya-indigo"
              link="/topics"
              linkText="Browse Topics"
            />
            <SquishyCard 
              number="2"
              title="Create Documents"
              description="Use our easy forms to generate legal documents for your specific needs."
              color="bg-green-600"
              link="/documents"
              linkText="Start Creating"
            />
            <SquishyCard 
              number="3"
              title="Find Support"
              description="Connect with legal aid centers, NGOs, and other support services near you."
              color="bg-blue-600"
              link="/find-help"
              linkText="Get Help"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section with Lamp Effect */}
      <LampContainer className="bg-green-900">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">
            Ready to Learn About Your Rights?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/80">
            Start exploring legal topics that matter to you and take the first step towards justice.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-green-700 hover:bg-white/90" asChild>
            <Link to="/topics">
              Browse Legal Topics
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </LampContainer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string;
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link to={link} className="text-nyaya-indigo hover:underline inline-flex items-center">
        Learn more <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

// New Squishy Card Component
const SquishyCard = ({ 
  number, 
  title, 
  description, 
  color,
  link,
  linkText
}: { 
  number: string;
  title: string; 
  description: string;
  color: string;
  link: string;
  linkText: string;
}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className={`relative h-80 w-72 shrink-0 overflow-hidden rounded-xl ${color} p-8 shadow-lg`}
    >
      <div className="relative z-10 text-white">
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="mb-2 block w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold"
        >
          {number}
        </motion.span>
        <motion.h3
          initial={{ scale: 0.95 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-3 text-2xl font-bold"
        >
          {title}
        </motion.h3>
        <p className="text-white/90">
          {description}
        </p>
      </div>
      <Link to={link} className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-semibold text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white flex items-center justify-center">
        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      <SquishyBackground />
    </motion.div>
  );
};

const SquishyBackground = () => {
  return (
    <motion.svg
      width="288"
      height="320"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="rgba(255, 255, 255, 0.1)"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="rgba(255, 255, 255, 0.1)"
      />
    </motion.svg>
  );
};

// Lamp Container Component with reduced height
export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex py-20 flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0",
        className
      )}
    >
      <div className="relative flex w-full items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-40 overflow-visible w-[30rem] bg-gradient-conic from-green-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-green-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-green-900 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-40 w-[30rem] bg-gradient-conic from-transparent via-transparent to-green-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-green-900 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-green-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-32 w-full translate-y-8 scale-x-150 bg-green-900 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-32 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-24 w-[28rem] -translate-y-1/2 rounded-full bg-green-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-24 w-64 -translate-y-[4rem] rounded-full bg-green-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[4.5rem] bg-green-400"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-32 w-full -translate-y-[8rem] bg-green-900"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-5 py-8">
        {children}
      </div>
    </div>
  );
};

export default Home;