  'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

interface ContestStats {
  submitted: number;
  shortlisting: number;
  phaseL1: number;
  phaseL2: number;
  phaseL3: number;
  offered: number;
  drafted: number;
}

interface Contest {
  id: string;
  name: string;
  shortlisting_count: number;
  l1_count: number;
  l2_count: number;
  l3_count: number;
  offered_count: number;
  submitted_count: number;
}

export default function ContestTracker() {
  const [stats, setStats] = React.useState<ContestStats>({
    submitted: 0,
    shortlisting: 0,
    phaseL1: 0,
    phaseL2: 0,
    phaseL3: 0,
    offered: 0,
    drafted: 0
  });

  const [contests, setContests] = React.useState<Contest[]>([]);
  const [activeTab, setActiveTab] = React.useState('ACTIVE');
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Fetch contests and update stats
  const fetchContests = async () => {
    const { data: contestsData, error } = await supabase
      .from('contests')
      .select('*')
      .eq('status', activeTab);

    if (error) {
      console.error('Error fetching contests:', error);
      return;
    }

    if (contestsData) {
      setContests(contestsData);
      
      // Calculate stats
      const newStats = contestsData.reduce((acc, contest) => ({
        submitted: acc.submitted + (contest.submitted_count || 0),
        shortlisting: acc.shortlisting + (contest.shortlisting_count || 0),
        phaseL1: acc.phaseL1 + (contest.l1_count || 0),
        phaseL2: acc.phaseL2 + (contest.l2_count || 0),
        phaseL3: acc.phaseL3 + (contest.l3_count || 0),
        offered: acc.offered + (contest.offered_count || 0),
        drafted: acc.drafted + 0, // Add drafted count if available in your schema
      }), {
        submitted: 0,
        shortlisting: 0,
        phaseL1: 0,
        phaseL2: 0,
        phaseL3: 0,
        offered: 0,
        drafted: 0,
      });

      setStats(newStats);
    }
  };

  // Fetch contests when component mounts or tab changes
  React.useEffect(() => {
    fetchContests();
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contest Dashboard</h2>
        <Button 
          onClick={() => router.push('/employer/create-contest')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Contest
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.submitted}</div>
          <div className="text-sm text-gray-500">Submitted</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.shortlisting}</div>
          <div className="text-sm text-gray-500">Shortlisting</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.phaseL1}</div>
          <div className="text-sm text-gray-500">Phase L1</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.phaseL2}</div>
          <div className="text-sm text-gray-500">Phase L2</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.phaseL3}</div>
          <div className="text-sm text-gray-500">Phase L3</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.offered}</div>
          <div className="text-sm text-gray-500">Offered</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold">{stats.drafted}</div>
          <div className="text-sm text-gray-500">Drafted</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Contest Tracker</h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="ACTIVE">ACTIVE</TabsTrigger>
            <TabsTrigger value="ON-HOLD">ON-HOLD</TabsTrigger>
            <TabsTrigger value="COMPLETED">COMPLETED</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contest Name</TableHead>
                  <TableHead>Shortlisting</TableHead>
                  <TableHead>L1</TableHead>
                  <TableHead>L2</TableHead>
                  <TableHead>L3</TableHead>
                  <TableHead>Offered</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contests.map((contest) => (
                  <TableRow key={contest.id}>
                    <TableCell>{contest.name}</TableCell>
                    <TableCell>{contest.shortlisting_count}</TableCell>
                    <TableCell>{contest.l1_count}</TableCell>
                    <TableCell>{contest.l2_count}</TableCell>
                    <TableCell>{contest.l3_count}</TableCell>
                    <TableCell>{contest.offered_count}</TableCell>
                    <TableCell>{contest.submitted_count}</TableCell>
                  </TableRow>
                ))}
                {contests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No contests found. Create your first contest to get started!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}