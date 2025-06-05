
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

// This constant defines the duration (in milliseconds) the splash screen's
// main content (logo, loader, text) is visible. After this duration,
// a fade-out animation (currently 300ms) begins, and then navigation to '/profile' occurs.
// Adjust this value to change how long the main loading elements are displayed.
// For example, to show the loading elements for 3 seconds, set LOAD_DURATION to 3000.
// To make the splash screen very short (e.g., mostly for _gl processing), 
// you could set this to a small value like 100 (0.1 seconds).
const LOAD_DURATION = 300; 
const GL_PARAM_PROCESS_DELAY = 1000; // Delay for _gl parameter processing

export default function SplashScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Timer for _gl parameter processing
    const glParamTimer = setTimeout(() => {
      // Handle _gl parameter for cross-domain tracking (Google Analytics Linker)
      try {
        const params = new URLSearchParams(window.location.search);
        const glParam = params.get('_gl');

        if (glParam) {
          const parts = glParam.split('*');
          // The _gl parameter typically follows a format like: version*linker_data_segment1*linker_data_segment2...
          // where some segments are keys (e.g., _ga, _ga_CONTAINER_ID) and subsequent segments are their values.
          for (let i = 0; i < parts.length - 1; i++) {
            const keyCandidate = parts[i];
            
            // Check if the keyCandidate is a GA cookie name we want to process
            if (keyCandidate === '_ga' || (keyCandidate.startsWith('_ga_') && keyCandidate !== '_ga')) {
              const cookieName = keyCandidate;
              let cookieValue = parts[i + 1]; // The value associated with the keyCandidate

              try {
                // Attempt to Base64 decode the value as per user request.
                const decodedValue = atob(cookieValue); // Browser's built-in Base64 decoder
                cookieValue = decodedValue;
                // console.log(`Successfully Base64 decoded value for ${cookieName}: ${cookieValue}`);
              } catch (e) {
                // If decoding fails, it means the string was not valid Base64.
                // Log a warning and proceed with the original value.
                console.warn(`Value for cookie ${cookieName} from _gl parameter ('${cookieValue}') does not appear to be Base64 encoded or is invalid. Using original value. Error:`, e);
              }

              // Set the cookie. GA cookies typically have a 2-year lifespan.
              // Assigning to document.cookie with the same name, path, and domain will replace/update the existing cookie.
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
    }, GL_PARAM_PROCESS_DELAY);

    // Original splash screen timer logic for navigation
    const navigationTimer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation before navigating
      // The fade-out duration is 300ms, defined by the CSS transition-opacity duration-300
      setTimeout(() => {
        router.push('/profile');
      }, 300); 
    }, LOAD_DURATION);

    // Cleanup function to clear both timers
    return () => {
      clearTimeout(glParamTimer);
      clearTimeout(navigationTimer);
    };
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
