"use client";

import { useState } from "react";
import { toast } from "sonner";

import { GoogleIcon } from "@/components/icons";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Users } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (data?.error) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      if (data?.url) {
        toast.success(data.message);
        window.location.href = data.url;
      } else {
        setLoading(false);
        toast.error("No redirect URL received.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-primary rounded-lg p-3">
              <Code2 className="text-primary-foreground h-8 w-8" />
            </div>
            <h1 className="text-foreground text-3xl font-bold">Method Sync</h1>
          </div>
          <p className="text-muted-foreground text-lg">Real-time multiplayer coding challenges</p>
        </div>

        {/* Features Preview */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="text-primary h-5 w-5" />
              <div>
                <h3 className="text-card-foreground font-semibold">Multiplayer Rooms</h3>
                <p className="text-muted-foreground text-sm">Create and join coding challenges</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Card */}
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-card-foreground">Welcome Back</CardTitle>
            <CardDescription>Sign in to start your coding challenge journey</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              type="submit"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className={`bg-primary hover:bg-primary/90 text-primary-foreground w-full ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              size="lg"
            >
              {loading ? <Spinner className="mr-2" /> : <GoogleIcon className="mr-2" />}
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
