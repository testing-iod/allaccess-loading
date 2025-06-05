
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

// This constant defines the duration (in milliseconds) the splash screen's
// main content (logo, loader, text) is visible *before* the fade-out animation begins.
// After this duration, the fade-out starts.
const LOAD_DURATION = 300; 

// This constant defines the delay (in milliseconds) *before* the `_gl` parameter
// processing logic begins. This processing runs independently of the main splash screen
// navigation timer. For example, to delay `_gl` processing by 1 second, set this to 1000.
const GL_PARAM_PROCESS_DELAY = 5000; // Example: Set to 1000ms for a 1-second delay

// Duration of the fade-out animation for the splash screen (in milliseconds).
// This should ideally match any CSS transition durations for opacity.
const FADE_OUT_DURATION = 300; // Matches `duration-300` in Tailwind CSS

export default function SplashScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log(`SplashScreen Effect: Mounting. GL_PARAM_PROCESS_DELAY=${GL_PARAM_PROCESS_DELAY}ms, LOAD_DURATION=${LOAD_DURATION}ms, FADE_OUT_DURATION=${FADE_OUT_DURATION}ms`);

    const glProcessScheduledTime = Date.now() + GL_PARAM_PROCESS_DELAY;
    console.log(`SplashScreen Effect: _gl parameter processing scheduled to start around: ${new Date(glProcessScheduledTime).toLocaleTimeString()}.${glProcessScheduledTime % 1000}`);

    // Timer for _gl parameter processing.
    // This timer runs independently and its callback executes after GL_PARAM_PROCESS_DELAY.
    const glParamTimer = setTimeout(() => {
      console.log(`SplashScreen Effect: _gl parameter processing starting now: ${new Date().toLocaleTimeString()}.${Date.now() % 1000}`);
      try {
        const params = new URLSearchParams(window.location.search);
        const glParam = params.get('_gl');

        if (glParam) {
          console.log("SplashScreen Effect: Found _gl parameter:", glParam);
          const parts = glParam.split('*');
          for (let i = 0; i < parts.length - 1; i++) {
            const keyCandidate = parts[i];
            
            if (keyCandidate === '_ga' || (keyCandidate.startsWith('_ga_') && keyCandidate !== '_ga')) {
              const cookieName = keyCandidate;
              let cookieValue = parts[i + 1]; 

              try {
                const decodedValue = atob(cookieValue);
                // console.log(`Successfully Base64 decoded value for ${cookieName}: ${decodedValue}`);
                cookieValue = decodedValue;
              } catch (e) {
                console.warn(`Value for cookie ${cookieName} from _gl parameter ('${cookieValue}') does not appear to be Base64 encoded or is invalid. Using original value. Error:`, e);
              }

              const twoYearsInSeconds = 2 * 365 * 24 * 60 * 60;
              let cookieString = `${cookieName}=${cookieValue}; path=/; max-age=${twoYearsInSeconds}`;
              
              cookieString += "; SameSite=Lax";
              
              if (window.location.protocol === 'https:') {
                cookieString += "; Secure";
              }
              
              document.cookie = cookieString;
              // console.log(`Cookie from _gl parameter set: ${cookieName}=${cookieValue}`);
              i++; 
            }
          }
          console.log("SplashScreen Effect: Finished processing _gl parameter.");
        } else {
          // console.log("SplashScreen Effect: No _gl parameter found.");
        }
      } catch (error) {
        console.error('SplashScreen Effect: Error processing _gl parameter or setting cookies:', error);
      }
    }, GL_PARAM_PROCESS_DELAY);

    const navigationFadeOutScheduledTime = Date.now() + LOAD_DURATION;
    console.log(`SplashScreen Effect: Navigation fade-out scheduled to start around: ${new Date(navigationFadeOutScheduledTime).toLocaleTimeString()}.${navigationFadeOutScheduledTime % 1000}`);

    // Splash screen timer logic for navigation.
    // This timer controls when the splash screen starts to fade out and then navigates.
    // It runs independently of the glParamTimer.
    const navigationTimer = setTimeout(() => {
      console.log(`SplashScreen Effect: Navigation fade-out starting now: ${new Date().toLocaleTimeString()}.${Date.now() % 1000}`);
      setIsVisible(false);
      
      const navigationPushScheduledTime = Date.now() + FADE_OUT_DURATION;
      console.log(`SplashScreen Effect: Actual navigation to /profile scheduled around: ${new Date(navigationPushScheduledTime).toLocaleTimeString()}.${navigationPushScheduledTime % 1000}`);
      
      // Wait for fade out animation (defined by FADE_OUT_DURATION) before navigating
      setTimeout(() => {
        console.log(`SplashScreen Effect: Navigating to /profile now: ${new Date().toLocaleTimeString()}.${Date.now() % 1000}`);
        router.push('/profile');
      }, FADE_OUT_DURATION); 
    }, LOAD_DURATION);

    // Cleanup function to clear both timers when the component unmounts.
    // This is important to prevent memory leaks and unexpected behavior if the
    // component unmounts before timers complete (e.g., user navigates away manually).
    return () => {
      console.log(`SplashScreen Effect: Unmounting. Clearing timers.`);
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
