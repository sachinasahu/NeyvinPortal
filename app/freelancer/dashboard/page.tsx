"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, Wallet, TrendingUp } from "lucide-react";
import { ContestsAPI } from "@/lib/supabase/contests";
import { Contest } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FreelancerDashboard() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const activeContests = await ContestsAPI.getActiveContests();
        setContests(activeContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <DashboardLayout userRole="freelancer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
              <Trophy className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Rounds</CardTitle>
              <Target className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Wallet className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,850</div>
              <p className="text-xs text-muted-foreground">+₹250 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Contests */}
        <Card>
          <CardHeader>
            <CardTitle>Available Contests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p className="text-muted-foreground">Loading contests...</p>
              ) : contests.length === 0 ? (
                <p className="text-muted-foreground">No active contests available</p>
              ) : (
                contests.map((contest) => (
                  <Card key={contest.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-medium text-lg">{contest.job_title}</h3>
                          <p className="text-sm text-gray-600">{contest.short_description}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary">
                            {contest.employment_type}
                          </Badge>
                          <Badge variant="secondary">
                            {contest.location_type}
                          </Badge>
                          <Badge variant="secondary">
                            {contest.location_state}, {contest.location_city}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-sm text-gray-600">Experience: </span>
                            <span>{contest.experience_min} - {contest.experience_max} years</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Budget: </span>
                            <span>₹{contest.budget_min} - ₹{contest.budget_max} LPA</span>
                          </div>
                        </div>
                        <div>
                          <Badge variant="default" className="bg-primary/10 hover:bg-primary/20">
                            Freelancer Fee: ₹{contest.freelancer_fee}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 