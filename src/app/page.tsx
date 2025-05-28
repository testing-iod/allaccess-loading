
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

// This constant defines the duration (in milliseconds) the splash screen's
// main content (logo, loader, text) is visible. After this duration,
// a fade-out animation (currently 300ms) begins, and then navigation to '/profile' occurs.
// Adjust this value to change how long the main loading elements are displayed.
const LOAD_DURATION = 500; // Default: 1000ms = 1 second for active loading phase

export default function SplashScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation before navigating
      // The fade-out duration is 300ms, defined by the CSS transition-opacity duration-300
      setTimeout(() => {
        router.push('/profile');
      }, 300); 
    }, LOAD_DURATION);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-background transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-busy={isVisible}
    >
      <Logo className="h-16 w-16 text-primary mb-6" />
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <h1 className="text-3xl font-bold text-primary mb-2">QuickIntro</h1>
      <p className="text-lg text-muted-foreground">Loading your experience...</p>
    </div>
  );
}
