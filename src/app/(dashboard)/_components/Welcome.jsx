"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

export default function Welcome() {
  const { user, loading: loadingUser } = useAuth();

  const name = user?.user_metadata?.full_name.split(" ")[0];

  return (
    <div className="mb-8">
      {loadingUser ? (
        <Skeleton className="mb-2 h-8 w-64" />
      ) : (
        <h2 className="text-foreground mb-2 text-3xl font-bold">Welcome back, {name}</h2>
      )}
      <p className="text-muted-foreground text-lg">Ready for your next coding challenge?</p>
    </div>
  );
}
