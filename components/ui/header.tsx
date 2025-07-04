"use client";

import { ReactNode, forwardRef, ComponentPropsWithoutRef } from "react";
import Link, { LinkProps } from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "../../lib/utils";
import DarkModeToggle from "./darkmode-toggle";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import CompanyLogo from "@/public/images/neyvinLogo.jpg";
import UserMenu from "@/components/auth/user-menu";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "./button";
import { LogIn, UserPlus } from "lucide-react";

const DropdownNavItem = ({
  trigger,
  children,
}: {
  trigger: string;
  children: ReactNode;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-md font-medium transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground">
      {trigger}
    </NavigationMenuTrigger>
    <NavigationMenuContent>{children}</NavigationMenuContent>
  </NavigationMenuItem>
);

const ListItem = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & { title: string; href: LinkProps<string>['href'] }
>(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

const HeroTitle = () => (
  <>
    <div className="hidden items-start sm:inline-block">
      <Image
        src={CompanyLogo}
        width={35}
        alt="Neyvin Logo"
        className="mb-1 mr-2 inline-flex"
      />
    </div>
    <div className="block items-start sm:hidden">
      <Image
        src={CompanyLogo}
        width={35}
        alt="Neyvin Logo"
        className="mb-1 mr-2 inline-flex"
      />
    </div>
  </>
);

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto max-w-6xl">
        <nav
          className="px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex flex-shrink-0 items-center"
                aria-label="Neyvin Home"
              >
                <HeroTitle />
                <div className="h4 ml-1">Neyvin</div>
              </Link>
            </div>

            <div className="hidden items-center space-x-4 md:flex">
              {!loading && (
                <>
                  {user ? (
                    <UserMenu />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/login">
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href="/signup">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              <DarkModeToggle />
            </div>
            
            <div className="flex xl:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
