"use client";

import { Code2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const { user, loading: loadingUser } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (data?.error) {
        setLoading(false);
        return;
      }
      window.location.href = "/login";
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  const name = user?.user_metadata?.full_name || "John Doe";
  const avatar = user?.user_metadata?.avatar_url || "/default-avatar.png";

  return (
    <header className="border-border bg-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-lg p-2">
              <Link href="/">
                <Code2 className="text-primary-foreground h-6 w-6" />
              </Link>
            </div>
            <div>
              <h1 className="text-foreground text-xl font-bold">Method Sync</h1>
              <div className="flex items-center space-x-2">
                <p className="text-muted-foreground text-sm">Coding Challenges</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {loadingUser ? (
                <Skeleton className="size-8 rounded-full" />
              ) : (
                <Avatar className="size-8">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}

              {loadingUser ? (
                <Skeleton className="h-[20px] w-[120px] rounded-full" />
              ) : (
                <span className="text-foreground h-[20px] text-sm font-medium">{name}</span>
              )}
            </div>
            <Button
              onClick={handleLogout}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {loading ? <Spinner /> : <LogOut className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
