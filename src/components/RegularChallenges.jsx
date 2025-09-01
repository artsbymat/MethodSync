"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import ChallengeCard from "./CardChallenge";

export default function RegularChallenges() {
  const router = useRouter();
  const [listChallenges, setListChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/challenges");
        const data = await response.json();
        if (data.success) {
          setListChallenges(data.challenges);
        } else {
          console.error("Failed to fetch challenges:", data.message);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center justify-start">
        <div>
          <h3 className="text-foreground text-2xl font-bold">Regular Challenges</h3>
          <p className="text-muted-foreground">Practice coding challenges at your own pace</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => router.push(`/challenges/${challenge.slug}`)}
            />
          ))}
        </div>
      )}
    </>
  );
}
