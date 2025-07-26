"use client";

import { Code } from "lucide-react";
import JoinRoomForm from "@/components/JoinRoomForm";
import QuickStats from "@/components/QuickStats";
import { useEffect, useRef, useState, useCallback } from "react";
import CardChallenge from "@/components/CardChallenge";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  estimated_time: number;
  category: string;
}

export default function Page() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchChallenges = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/challenges/js?page=${pageNumber}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Failed to fetch challenges");
      } else {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setChallenges((prev) => [...prev, ...data]);
          setError(null);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching challenges.");
      console.error("Fetch challenges error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges(page);
  }, [page]);

  // Observer untuk memicu pagination saat user scroll ke bawah
  const observer = useRef<IntersectionObserver | null>(null);

  const lastChallengeRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="mt-18 min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <JoinRoomForm />
            <QuickStats />
          </div>

          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Code className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Code Challenges</h2>
                <p className="text-muted-foreground">
                  Practice your coding skills with these challenges
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-red-500">
                <p>Error: {error}</p>
              </div>
            )}

            <div className="space-y-4">
              {challenges.map((challenge, index) => {
                const isLast = index === challenges.length - 1;
                return (
                  <div key={challenge.id} ref={isLast ? lastChallengeRef : null}>
                    <CardChallenge challenge={challenge} />
                  </div>
                );
              })}
            </div>

            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[180px] w-full rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-4 h-3 w-full" />
                    <Skeleton className="mt-4 h-3 w-[30%]" />
                    <div className="mt-8 flex items-center justify-between">
                      <Skeleton className="h-3 w-[10%]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!hasMore && !loading && (
              <div className="text-muted-foreground pt-4 text-center text-sm">
                You&apos;ve reached the end.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
