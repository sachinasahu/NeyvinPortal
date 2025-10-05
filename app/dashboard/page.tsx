"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Building2, User, Briefcase, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const getRoleIcon = () => {
    switch (profile.role) {
      case "employer":
        return <Building2 className="h-6 w-6" />;
      case "vendor":
        return <Briefcase className="h-6 w-6" />;
      case "freelancer":
        return <User className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  const getRoleTitle = () => {
    switch (profile.role) {
      case "employer":
        return "Employer Dashboard";
      case "vendor":
        return "Vendor Dashboard";
      case "freelancer":
        return "Freelancer Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getRoleDescription = () => {
    switch (profile.role) {
      case "employer":
        return "Create contests and track freelancer progress through multiple rounds";
      case "vendor":
        return "Provide services and solutions to clients";
      case "freelancer":
        return "Register for contests and compete through L1, L2, and final rounds";
      default:
        return "Welcome to your dashboard";
    }
  };

  const getDashboardActions = () => {
    switch (profile.role) {
      case "employer":
        return [
          { title: "Create Contest", href: "/create-contest", icon: <Trophy className="h-4 w-4" /> },
          { title: "My Contests", href: "/my-contests", icon: <Target className="h-4 w-4" /> },
          { title: "Contest Tracker", href: "/contest-tracker", icon: <TrendingUp className="h-4 w-4" /> },
        ];
      case "vendor":
        return [
          { title: "Browse Contests", href: "/contests", icon: <Trophy className="h-4 w-4" /> },
          { title: "My Submissions", href: "/submissions", icon: <Target className="h-4 w-4" /> },
          { title: "Earnings", href: "/earnings", icon: <TrendingUp className="h-4 w-4" /> },
        ];
      case "freelancer":
        return [
          { title: "Browse Contests", href: "/contests", icon: <Trophy className="h-4 w-4" /> },
          { title: "My Registrations", href: "/registrations", icon: <Target className="h-4 w-4" /> },
          { title: "Round Progress", href: "/my-progress", icon: <TrendingUp className="h-4 w-4" /> },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            {getRoleIcon()}
            <div>
              <h1 className="text-3xl font-bold">{getRoleTitle()}</h1>
              <p className="text-muted-foreground">{getRoleDescription()}</p>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Welcome, {profile.full_name}!</h2>
            <p className="text-muted-foreground">
              Neyvin
            </p>
            <p className="text-muted-foreground">
              Email: myEmail
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {getDashboardActions().map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {action.icon}
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            More features coming soon! This is a basic dashboard for the contest-based platform.
          </p>
        </div>
      </div>
    </div>
  );
} 