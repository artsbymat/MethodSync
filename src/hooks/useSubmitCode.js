import { useState } from "react";

export function useSubmitCode() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const submitCode = async ({ id, code }) => {
    setIsSubmitting(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch("/api/submission/regular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, code })
      });
      const data = await res.json();
      setResponse(data);
      if (!res.ok) throw new Error(data.error || "Submission failed");
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitCode, isSubmitting, error, response };
}
