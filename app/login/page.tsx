"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/types/supabase";
import { toast } from "sonner";
import { 
  Building2, 
  Briefcase, 
  UserCheck, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Loader2,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CompanyLogo from "@/public/images/neyvinLogo.jpg";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams?.get("role") as UserRole) || "employer";
  const { signIn } = useAuth();
  
  const [activeTab, setActiveTab] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email, password, activeTab);

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      // Redirect based on role
      const redirectPath = `/${activeTab}/dashboard`;
      router.push(redirectPath as any);
      toast.success("Welcome back!");
    } catch (err) {
      console.error('Login error:', err);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "employer":
        return <Building2 className="h-4 w-4" />;
      case "vendor":
        return <Briefcase className="h-4 w-4" />;
      case "freelancer":
        return <UserCheck className="h-4 w-4" />;
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case "employer":
        return "Create contests and track freelancer progress";
      case "vendor":
        return "Provide services and solutions to clients";
      case "freelancer":
        return "Compete in contests and showcase your skills";
    }
  };

  const getRoleFeatures = (role: UserRole) => {
    switch (role) {
      case "employer":
        return [
          "Create structured contests",
          "Monitor round progress",
          "Select qualified winners",
          "Access quality talent pool"
        ];
      case "vendor":
        return [
          "Browse available contests",
          "Submit qualified candidates",
          "Earn competitive fees",
          "Build client relationships"
        ];
      case "freelancer":
        return [
          "Browse available contests",
          "Compete in multiple rounds",
          "Build your reputation",
          "Access premium opportunities"
        ];
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Link href="/" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your Neyvin account
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {(["employer", "vendor", "freelancer"] as UserRole[]).map((role) => (
                <TabsTrigger
                  key={role}
                  value={role}
                  className="flex items-center gap-2"
                >
                  {getRoleIcon(role)}
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {(["employer", "vendor", "freelancer"] as UserRole[]).map((role) => (
              <TabsContent key={role} value={role} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-lg mb-6">
                        {getRoleDescription(role)}
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>

                      <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link 
                          href={`/signup?role=${role}`}
                          className="text-primary hover:underline font-medium"
                        >
                          Sign up
                        </Link>
                      </div>
                    </form>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Platform Features</h3>
                    <ul className="space-y-3">
                      {getRoleFeatures(role).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
    </Suspense>
  );
} 