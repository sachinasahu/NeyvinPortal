import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import { Building2, BriefcaseIcon, UserCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info - Spans 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/neyvinLogo.jpg"
                alt="Neyvin Logo"
                width={64}
                height={64}
                className="rounded-xl shadow-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Neyvin Technologies</h3>
                <p className="text-sm text-muted-foreground">Revolutionizing Talent Acquisition</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Experience the future of hiring with our innovative contest-based platform. 
              Connect, compete, and discover the perfect match through structured competitions.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.linkedin.com/company/neyvin-technologies/?viewAsMember=true" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/digital_neyvin?igsh=eW42NHdoMmNwbjBm" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.youtube.com/@NeyvinTech" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
              <a 
                href="mailto:hr@neyvintechnologies.com"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Users - Spans 5 columns on large screens */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Employers */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>For Employers</span>
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/login?role=employer" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                    >
                      Employer Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/signup?role=employer" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                    >
                      Create Account
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Vendors */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <BriefcaseIcon className="w-4 h-4 text-primary" />
                  <span>For Vendors</span>
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/login?role=vendor" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                    >
                      Vendor Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/signup?role=vendor" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                    >
                      Become a Vendor
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Freelancers */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>For Freelancers</span>
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/login?role=freelancer" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                    >
                      Freelancer Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/signup?role=freelancer" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                    >
                      Join as Freelancer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links - Spans 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Neyvin Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
