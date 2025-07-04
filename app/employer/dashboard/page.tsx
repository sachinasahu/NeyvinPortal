"use client";

import { useAuth } from "@/contexts/auth-context";
import ContestTracker from '@/components/employer/ContestTracker';

export default function EmployerDashboard() {
  const { profile } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {profile?.full_name}! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Manage your contests and track candidate progress through multiple rounds.
        </p>
      </div>
      <ContestTracker />
    </div>
  );
}