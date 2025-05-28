
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

// This constant defines the duration (in milliseconds) the splash screen's
// main content (logo, loader, text) is visible. After this duration,
// a fade-out animation (currently 300ms) begins, and then navigation to '/profile' occurs.
// Adjust this value to change how long the main loading elements are displayed.
const LOAD_DURATION = 5000; // Default: 1000ms = 1 second for active loading phase

export default function SplashScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Handle _gl parameter for cross-domain tracking (Google Analytics Linker)
    try {
      const params = new URLSearchParams(window.location.search);
      const glParam = params.get('_gl');

      if (glParam) {
        const parts = glParam.split('*');
        // The _gl parameter typically follows a format like: version*linker_data*key1*value1*key2*value2...
        // We iterate through the parts to find known GA cookie keys (_ga, _ga_CONTAINER_ID)
        for (let i = 0; i < parts.length - 1; i++) {
          const keyCandidate = parts[i];
          const valueCandidate = parts[i + 1]; // The value associated with the keyCandidate

          // Check if the keyCandidate is a GA cookie name we want to process
          if (keyCandidate === '_ga' || (keyCandidate.startsWith('_ga_') && keyCandidate !== '_ga')) {
            const cookieName = keyCandidate;
            const cookieValue = valueCandidate;

            // Set the cookie. GA cookies typically have a 2-year lifespan.
            const twoYearsInSeconds = 2 * 365 * 24 * 60 * 60;
            let cookieString = `${cookieName}=${cookieValue}; path=/; max-age=${twoYearsInSeconds}`;
            
            // Add SameSite=Lax for modern browser security; GA cookies often use this.
            cookieString += "; SameSite=Lax";
            
            // Add Secure attribute if the page is served over HTTPS.
            if (window.location.protocol === 'https:') {
              cookieString += "; Secure";
            }
            
            document.cookie = cookieString;
            // console.log(`Cookie from _gl parameter set: ${cookieName}=${cookieValue}`);
            
            // Increment i because we've processed parts[i] (as key) and parts[i+1] (as value),
            // so parts[i+1] should not be considered as a key in the next iteration.
            i++; 
          }
        }
      }
    } catch (error) {
      console.error('Error processing _gl parameter or setting cookies:', error);
    }

    // Original splash screen timer logic
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation before navigating
      // The fade-out duration is 300ms, defined by the CSS transition-opacity duration-300
      setTimeout(() => {
        router.push('/profile');
      }, 300); 
    }, LOAD_DURATION);

    return () => clearTimeout(timer);
  }, [router]); // router is a dependency for navigation

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
