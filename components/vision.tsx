"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Globe, Users, Cpu, Target, Lightbulb, Code, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Vision() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Pattern */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-primary/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-blue-600 mb-6">
              Our Mission & Vision
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Building next-generation technology to create a tech-driven future while eliminating unemployment and fulfilling the needs of humankind.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Cards with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Rocket className="h-8 w-8 text-primary" />,
              title: "Innovation First",
              description: "Pioneering next-generation technology solutions that drive digital transformation and business growth.",
              delay: 0.2
            },
            {
              icon: <Users className="h-8 w-8 text-primary" />,
              title: "Human-Centric Approach",
              description: "Creating opportunities and fostering talent to reduce unemployment while building a skilled workforce.",
              delay: 0.4
            },
            {
              icon: <Globe className="h-8 w-8 text-primary" />,
              title: "Global Impact",
              description: "Building solutions that contribute to the advancement of humanity and create a better tomorrow.",
              delay: 0.6
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vision Statement with Modern Design */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-8">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Our Vision for the Future
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p className="text-xl leading-relaxed">
                  We envision a future where technology and human potential converge to create unprecedented opportunities for growth and development.
                </p>
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6">Our Strategic Goals</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <Code className="h-6 w-6" />,
                        text: "Create a tech-driven working environment with a futuristic approach"
                      },
                      {
                        icon: <Users className="h-6 w-6" />,
                        text: "Eliminate unemployment through skill development and job creation"
                      },
                      {
                        icon: <Globe className="h-6 w-6" />,
                        text: "Drive digital transformation across industries"
                      },
                      {
                        icon: <Lightbulb className="h-6 w-6" />,
                        text: "Foster innovation that benefits humanity"
                      }
                    ].map((goal, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                          {goal.icon}
                        </div>
                        <p className="text-gray-700 text-left">{goal.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Technology Focus with Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-8">
            <Cpu className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Driving Technological Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Our commitment to technological advancement is unwavering. We continuously innovate and adapt to emerging technologies to provide cutting-edge solutions that shape the future of business and society.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group">
              Partner with Us
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 