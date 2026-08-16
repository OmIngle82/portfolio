import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial check on mount
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    checkIsMobile();

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
};
