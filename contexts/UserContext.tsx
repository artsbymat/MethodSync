"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  email: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    const res = await fetch(`${API_URL}/api/user`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.error || "Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser, setLoading, setError }}>
      {children}
    </UserContext.Provider>
  );
};
