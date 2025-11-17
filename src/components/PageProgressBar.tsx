
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function PageProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setProgress(0);
    setIsVisible(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const handleStart = () => {
      setIsVisible(true);
      setProgress(10);
      let currentProgress = 10;
      progressTimer = setInterval(() => {
        currentProgress += (100 - currentProgress) * 0.1;
        if (currentProgress > 95) currentProgress = 95;
        setProgress(currentProgress);
      }, 200);
    };

    const handleComplete = () => {
      if (progressTimer) clearInterval(progressTimer);
      setProgress(100);
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setProgress(0), 500);
      }, 500);
    };

    // This is a simplified way to detect navigation changes in App Router
    // A more robust solution might involve a custom Link component or context
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      handleStart();
      originalPushState.apply(history, args);
    };

    // Listen for popstate (browser back/forward buttons)
    window.addEventListener('popstate', handleStart);

    // When the component unmounts, we call complete
    return () => {
      handleComplete();
      clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
      history.pushState = originalPushState;
      window.removeEventListener('popstate', handleStart);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); 
  
   useEffect(() => {
    // This effect handles the completion of the loading bar
    // It runs when the pathname/searchParams change, indicating navigation has finished
    setProgress(100);
    const timer = setTimeout(() => {
      setIsVisible(false);
       setTimeout(() => setProgress(0), 500);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);


  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-[9999] h-1 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <Progress value={progress} className="h-full bg-transparent [&>div]:bg-accent" />
    </div>
  );
}
