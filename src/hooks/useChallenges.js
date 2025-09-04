import { useEffect, useState } from "react";

export function useChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchChallenges = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/challenges");
        const data = await response.json();
        if (data.success) {
          if (!ignore) setChallenges(data.challenges);
        } else {
          if (!ignore) setError(data.message || "Failed to fetch challenges");
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Error fetching challenges");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchChallenges();
    return () => {
      ignore = true;
    };
  }, []);

  return { challenges, loading, error };
}
