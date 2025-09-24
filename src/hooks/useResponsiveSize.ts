import { useState, useEffect } from 'react';

export const useResponsiveSize = () => {
  const [size, setSize] = useState(400);

  useEffect(() => {
    const calculateSize = () => {
      if (typeof window !== 'undefined') {
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.6;
        const calculatedSize = Math.min(600, Math.min(maxWidth, maxHeight));
        setSize(Math.max(300, calculatedSize)); // Minimum size of 300px
      }
    };

    // Calculate initial size
    calculateSize();

    // Recalculate on window resize
    window.addEventListener('resize', calculateSize);
    
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, []);

  return size;
};