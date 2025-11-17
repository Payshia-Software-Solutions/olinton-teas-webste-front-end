
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function PageProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setProgress(10);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressTimer);
          return 95;
        }
        return prev + (100 - prev) * 0.1;
      });
    }, 200);
    
    // This is the key part for completing the progress bar.
    // We want this to run when the component thinks it's "done" loading.
    // A simple timeout works well for visual effect after the initial loading simulation starts.
    const completeLoading = () => {
      clearInterval(progressTimer);
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        // Reset progress after the fade-out animation
        setTimeout(() => setProgress(0), 500);
      }, 500);
    };
    
    // Simulate the end of loading after a short delay.
    // This gives a good visual feel without complex state management.
    const loadTimer = setTimeout(completeLoading, 1000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(loadTimer);
    };
  }, [pathname]);

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
