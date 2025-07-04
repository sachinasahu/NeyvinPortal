"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import CompanyLogo from "@/public/images/neyvinLogo.jpg";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Trophy,
  Building2,
  UserCheck,
  Flag,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Globe,
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
  Eye,
  Handshake,
  BriefcaseIcon,
  UserPlus,
  Search,
  Filter,
  BarChart3,
  Clock,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from "lucide-react";
import Link from "next/link";

const OverviewSection = () => (
  <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-20">
    {/* Subtle animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000 opacity-60"></div>
    </div>
    
    <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
      <div className="flex items-center justify-center space-x-4 mb-12">
        <div className="relative group">
          <Image
            src={CompanyLogo}
            width={60}
            height={60}
            alt="Neyvin Technologies Logo"
            className="rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Neyvin Technologies
          </h1>
          <p className="text-muted-foreground">Revolutionizing Talent Acquisition</p>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-foreground">
        Where <span className="text-primary">Exceptional Talent</span><br />
        Meets <span className="text-primary">Extraordinary Opportunities</span>
      </h2>
      
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
        Experience the future of hiring with our innovative contest-based platform. 
        Connect, compete, and discover the perfect match through structured competitions.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <Link href="#join-platform">
            <Rocket className="w-4 h-4 mr-2" />
            Get Started Today
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-lg transition-all duration-300">
          <Link href="#how-it-works">
            <Zap className="w-4 h-4 mr-2" />
            See How It Works
          </Link>
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Contest-Based Excellence</h3>
          <p className="text-muted-foreground text-sm">
            Structured competitions that bring out the best in every participant
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Quality Guaranteed</h3>
          <p className="text-muted-foreground text-sm">
            Multi-round evaluation ensures only the finest talent advances
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Fair & Transparent</h3>
          <p className="text-muted-foreground text-sm">
            Equal opportunities for all through structured selection processes
          </p>
        </div>
      </div>
    </div>
  </section>
);

const HowNeyvinHelpsSection = () => (
  <section id="how-it-works" className="py-20 bg-muted/30">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium text-sm">Platform Benefits</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          How <span className="text-primary">Neyvin</span> Transforms Hiring
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover how our innovative approach solves traditional hiring challenges 
          and creates opportunities for everyone involved
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Employers */}
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-primary" />
            </div>
          <h3 className="text-xl font-bold mb-6 text-center text-foreground">For Employers</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
                <span className="font-semibold text-foreground">Pre-vetted Talent Pool</span>
                <p className="text-muted-foreground text-sm mt-1">Access candidates who have proven their skills through competitive rounds</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                <span className="font-semibold text-foreground">Quality Control</span>
                <p className="text-muted-foreground text-sm mt-1">Set registration fees to ensure only serious participants apply</p>
                  </div>
                </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                <span className="font-semibold text-foreground">Progress Tracking</span>
                <p className="text-muted-foreground text-sm mt-1">Monitor candidate performance through L1, L2, and final rounds</p>
                  </div>
                </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                <span className="font-semibold text-foreground">Cost Efficiency</span>
                <p className="text-muted-foreground text-sm mt-1">Reduce hiring costs with structured competition-based selection</p>
                  </div>
                </li>
              </ul>
            </div>
        
        {/* Vendors */}
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <BriefcaseIcon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-6 text-center text-foreground">For Vendors</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground">Client Access</span>
                <p className="text-muted-foreground text-sm mt-1">Connect with quality clients seeking specialized services</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground">Revenue Growth</span>
                <p className="text-muted-foreground text-sm mt-1">Earn competitive fees by providing qualified candidates</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground">Quality Assurance</span>
                <p className="text-muted-foreground text-sm mt-1">Submit pre-screened candidates through rigorous evaluation</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground">Partnership Benefits</span>
                <p className="text-muted-foreground text-sm mt-1">Build long-term relationships with reliable clients</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Freelancers */}
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <UserCheck className="w-8 h-8 text-primary" />
            </div>
          <h3 className="text-xl font-bold mb-6 text-center text-foreground">For Freelancers</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
                <span className="font-semibold text-foreground">Skill Showcase</span>
                <p className="text-muted-foreground text-sm mt-1">Demonstrate your abilities through structured competitions</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                <span className="font-semibold text-foreground">Fair Evaluation</span>
                <p className="text-muted-foreground text-sm mt-1">Get assessed through multiple rounds with transparent criteria</p>
                  </div>
                </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                <span className="font-semibold text-foreground">Reputation Building</span>
                <p className="text-muted-foreground text-sm mt-1">Build your portfolio and reputation through successful contests</p>
                  </div>
                </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                <span className="font-semibold text-foreground">Career Growth</span>
                <p className="text-muted-foreground text-sm mt-1">Access premium opportunities and advance your career</p>
                  </div>
                </li>
              </ul>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      title: "Contest-Based Model",
      description: "Structured competitions with multiple rounds ensure only the best talent advances through L1, L2, and final rounds.",
      icon: Trophy
    },
    {
      title: "Registration Fees",
      description: "Employers set fees, freelancers pay to participate, ensuring serious contestants and quality submissions.",
      icon: DollarSign
    },
    {
      title: "Round Tracking",
      description: "Monitor progress through L1, L2, and final rounds with detailed tracking and status updates.",
      icon: Calendar
    },
    {
      title: "Fair Competition",
      description: "Multiple rounds and structured evaluation ensure fair and transparent selection process.",
      icon: Users
    },
    {
      title: "Progress Monitoring",
      description: "Real-time tracking of contestant progress through each round of competition with status updates.",
      icon: TrendingUp
    },
    {
      title: "Quality Assurance",
      description: "Multi-round structure ensures only qualified candidates reach the final stage of competition.",
      icon: Shield
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Neyvin Platform
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Structured contest-based approach that ensures quality and fair competition 
            through multiple rounds and transparent evaluation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-card rounded-lg border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VisionSection = () => (
  <section className="py-20 bg-muted/30">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Our <span className="text-primary">Vision</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          To become the <span className="font-semibold text-primary">world's leading</span> contest-based talent platform, 
          where exceptional skills meet extraordinary opportunities through fair, transparent, and innovative competition.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-3">Global</div>
          <p className="text-muted-foreground">Connecting exceptional talent worldwide through innovative technology</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-3">Innovative</div>
          <p className="text-muted-foreground">Revolutionizing talent acquisition with cutting-edge contest-based approach</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-3">Trusted</div>
          <p className="text-muted-foreground">Building lasting partnerships through transparency and reliability</p>
        </div>
      </div>
    </div>
  </section>
);

const MissionSection = () => (
  <section className="py-20 bg-background">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Target className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Our <span className="text-primary">Mission</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          To <span className="font-semibold text-primary">democratize access</span> to quality talent and opportunities 
          by creating a fair, transparent, and competitive platform that benefits employers, vendors, and freelancers 
          through structured contests and rigorous evaluation processes.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-center text-foreground">Empower Employers</h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Provide access to pre-vetted, qualified talent through competitive selection processes. 
            Enable businesses to find the perfect match for their needs while maintaining quality standards 
            and reducing hiring costs through our innovative contest-based approach.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <BriefcaseIcon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-center text-foreground">Support Vendors</h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Create opportunities for vendors to connect with quality clients and provide specialized services. 
            Enable vendors to earn competitive fees while building long-term partnerships through our platform.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <UserCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-center text-foreground">Enable Freelancers</h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Create opportunities to showcase skills and build reputation through fair competitions. 
            Provide a platform where talent can demonstrate their capabilities, grow their careers, 
            and access premium opportunities in a transparent and merit-based environment.
          </p>
        </div>
      </div>
      
      {/* Additional mission elements */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-lg font-semibold mb-2 text-foreground">Passion-Driven</h4>
          <p className="text-muted-foreground text-sm">We're passionate about connecting talent with opportunities</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-lg font-semibold mb-2 text-foreground">Growth-Focused</h4>
          <p className="text-muted-foreground text-sm">Focused on continuous improvement and innovation</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Handshake className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-lg font-semibold mb-2 text-foreground">Partnership-Oriented</h4>
          <p className="text-muted-foreground text-sm">Building strong relationships with all stakeholders</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-lg font-semibold mb-2 text-foreground">Excellence-Driven</h4>
          <p className="text-muted-foreground text-sm">Committed to delivering exceptional results</p>
        </div>
      </div>
    </div>
  </section>
);

const LoginOptionsSection = () => (
  <section id="join-platform" className="py-20 bg-muted/30">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium text-sm">Join the Revolution</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Choose Your <span className="text-primary">Journey</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join thousands of professionals who are already transforming their careers 
          and businesses through our innovative contest-based platform
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Employer</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Create contests and track progress through multiple rounds
          </p>
          <ul className="text-muted-foreground space-y-3 mb-8 text-left text-sm">
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Create structured contests</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Monitor round progress</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Select qualified winners</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Access quality talent pool</span>
            </li>
          </ul>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" size="lg">
            <Link href="/signup">
              Join as Employer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <BriefcaseIcon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Vendor</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Provide services and solutions to clients through our platform
          </p>
          <ul className="text-muted-foreground space-y-3 mb-8 text-left text-sm">
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Browse available contests</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Submit qualified candidates</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Earn competitive fees</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Build client relationships</span>
            </li>
          </ul>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" size="lg">
            <Link href="/signup">
              Join as Vendor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <UserCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Freelancer</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Register for contests and compete through L1, L2, and final rounds
          </p>
          <ul className="text-muted-foreground space-y-3 mb-8 text-left text-sm">
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Browse available contests</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Compete in multiple rounds</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Build your reputation</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Access premium opportunities</span>
            </li>
          </ul>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" size="lg">
            <Link href="/signup">
              Join as Freelancer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-16">
        <p className="text-muted-foreground mb-6">Already part of the Neyvin community?</p>
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-lg transition-all duration-300">
          <Link href="/login">
            Sign In to Your Account
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default function Homepage() {
  const { theme } = useTheme();

  return (
    <>
      <OverviewSection />
      <HowNeyvinHelpsSection />
      <FeaturesSection />
      <VisionSection />
      <MissionSection />
      <LoginOptionsSection />
    </>
  );
}