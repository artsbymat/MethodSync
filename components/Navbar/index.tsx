"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Navbar = () => {
  const { user, setUser } = useUser();

  console.log(user);
  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      console.log(res);

      if (res.ok) {
        setUser(null);
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 transform rounded-full bg-black/90 p-1 shadow-lg backdrop-blur-sm md:block">
        <NavigationMenuList className="flex items-center gap-1">
          {/* Logo */}
          <NavigationMenuItem>
            <Link
              href="https://artsbymat.vercel.app"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
            >
              <Image
                src="/artsbymat-logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          </NavigationMenuItem>

          {/* Navigation Links */}
          <NavigationMenuItem className="px-4">
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-white transition-colors hover:text-black"
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="px-2">
            <NavigationMenuLink asChild>
              <Link
                href="/challenge"
                className="px-3 py-2 text-sm font-medium text-white transition-colors hover:text-black"
              >
                Challenge
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="px-2">
            <NavigationMenuLink asChild>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-white transition-colors hover:text-black"
              >
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Account Dropdown */}
          <NavigationMenuItem className="ml-2">
            <NavigationMenuTrigger className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100">
              Account
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[360px]">
                <ul className="grid gap-4">
                  {user ? (
                    <>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/profile"
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          >
                            <div className="text-sm leading-none font-medium">Profile</div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              View and edit your profile information.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/profile"
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          >
                            <div className="text-sm leading-none font-medium">History</div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              View your past challenges and submissions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Button
                          variant="outline"
                          className="w-full cursor-pointer bg-red-400 text-white hover:bg-red-600 focus:bg-red-600"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/login"
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          >
                            <div className="text-sm leading-none font-medium">Login</div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              Access your account to manage your profile and settings.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/register"
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          >
                            <div className="text-sm leading-none font-medium">Register</div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              Create a new account to get started.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 transform md:hidden">
        <div className="flex items-center gap-4 rounded-full bg-black/90 p-1 shadow-lg backdrop-blur-sm">
          {/* Logo */}
          <Link
            href="https://artsbymat.vercel.app"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <Image
              src="/artsbymat-logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-4 ml-8 flex flex-col gap-4">
                <Link
                  href="/"
                  className="hover:text-primary py-2 text-lg font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/challenge"
                  className="hover:text-primary py-2 text-lg font-medium transition-colors"
                >
                  Challenge
                </Link>
                <Link
                  href="/about"
                  className="hover:text-primary py-2 text-lg font-medium transition-colors"
                >
                  About
                </Link>

                <div className="mt-4 border-t pt-4">
                  <h3 className="mb-4 font-medium">Account</h3>
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      className="hover:bg-accent block space-y-1 rounded-md p-3 transition-colors"
                    >
                      <div className="font-medium">Login</div>
                      <p className="text-muted-foreground text-sm">
                        Access your account to manage your profile and settings.
                      </p>
                    </Link>
                    <Link
                      href="/register"
                      className="hover:bg-accent block space-y-1 rounded-md p-3 transition-colors"
                    >
                      <div className="font-medium">Register</div>
                      <p className="text-muted-foreground text-sm">
                        Create a new account to get started.
                      </p>
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Navbar;
