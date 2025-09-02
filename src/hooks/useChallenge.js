import { useEffect, useState } from "react";

export function useChallenge(slug) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionCode, setSubmissionCode] = useState(null);

  useEffect(() => {
    if (!slug) {
      setChallenge(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchChallenge = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/challenges/${slug}`);
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || "Unknown error");
        }

        setChallenge(data.challenge);

        if (data.challenge && data.challenge.id) {
          const submissionCodeRes = await fetch(
            `/api/submission/regular?id=${encodeURIComponent(data.challenge.id)}`
          );
          const responseData = await submissionCodeRes.json();

          if (responseData.submission) {
            setSubmissionCode(responseData.submission.code);
          }
        }
      } catch (err) {
        setChallenge(null);
        setError(err.message || "Failed to fetch challenge");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [slug]);

  return { challenge, loading, error, submissionCode };
}
