
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
    // This effect runs whenever the path changes.
    // We'll treat this as the *start* of a new page load.
    setIsVisible(true);
    setProgress(10); // Start with a small amount of progress

    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressTimer);
          return 95;
        }
        return prev + (100 - prev) * 0.1;
      });
    }, 200);

    // This function will run when the component re-renders for a new page,
    // or when it unmounts. We use it to "complete" the previous loading bar.
    return () => {
      clearInterval(progressTimer);
      setProgress(100);
      const completeTimer = setTimeout(() => {
        setIsVisible(false);
        // Reset progress after fade out
        setTimeout(() => setProgress(0), 500); 
      }, 500);
      
      // Cleanup timeout on unmount
      return () => clearTimeout(completeTimer);
    };
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
