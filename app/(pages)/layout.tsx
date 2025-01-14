"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    document.addEventListener('beforeunload', handleStart);
    document.addEventListener('DOMContentLoaded', handleComplete);

    // Handle client-side navigation
    window.addEventListener('popstate', handleStart);
    
    return () => {
      document.removeEventListener('beforeunload', handleStart);
      document.removeEventListener('DOMContentLoaded', handleComplete);
      window.removeEventListener('popstate', handleStart);
    };
  }, []);

  if (loading) {
    return <Loader />
  } else {
    return children
  }
}
