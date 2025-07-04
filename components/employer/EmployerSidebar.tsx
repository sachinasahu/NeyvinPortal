'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Plus, LogOut } from 'lucide-react';
import { BarChart } from "lucide-react"

export default function EmployerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <img src="/images/neyvinLogo.jpg" alt="Neyvin Logo" className="h-8" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/employer/dashboard">
          <Button
            variant={isActive('/employer/dashboard') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <BarChart className="h-5 w-5" />
            Contest Tracker
          </Button>
        </Link>

        <Link href="/employer/create-contest">
          <Button
            variant={isActive('/employer/create-contest') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Contest
          </Button>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
} 