import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TryNeyvin() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]" />
      
      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative">
            {/* Decorative gradient blur */}
            <div className="absolute -inset-x-20 -top-10 h-40 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl opacity-50" />
            
            <h1 
              className="mb-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 sm:text-5xl" 
              data-aos="fade-up"
            >
              Empower your HR strategy with Neyvin Technologies
            </h1>
          </div>
          
          <p
            className="mb-4 text-base text-muted-foreground sm:text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Neyvin Technologies is driven by a team of skilled professionals.
            Have questions or need assistance? Reach out and connect with us today!
          </p>
          <p
            className="mb-10 text-base text-muted-foreground sm:text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We're here to help. For more information or inquiries, click the button below.
          </p>
          
          <div 
            className="mx-auto max-w-xs items-center justify-center sm:flex sm:max-w-none"
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            <Button
              asChild
              size="lg"
              className="relative group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Get in Touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
