import { useState, useEffect, useCallback } from "react";

export function useFavorite(challengeId) {
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!challengeId) return;
    const controller = new AbortController();

    async function fetchFavorite() {
      setLoading(true);
      try {
        const res = await fetch(`/api/submission/favorite?id=${challengeId}`, {
          method: "GET",
          signal: controller.signal
        });
        if (!res.ok) throw new Error("Failed to fetch favorite status");
        const data = await res.json();
        setFavorited(!!data.favorited);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorite();
    return () => controller.abort();
  }, [challengeId]);

  const toggleFavorite = useCallback(async () => {
    if (!challengeId) return;
    setLoading(true);

    setFavorited((prev) => !prev);

    try {
      const res = await fetch("/api/submission/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: challengeId })
      });
      if (!res.ok) throw new Error("Failed to toggle favorite");
      const data = await res.json();
      setFavorited(!!data.favorited);
      return data.favorited;
    } catch (err) {
      console.error(err);
      setFavorited((prev) => !prev);
      return favorited;
    } finally {
      setLoading(false);
    }
  }, [challengeId, favorited]);

  return { favorited, toggleFavorite, loading };
}
