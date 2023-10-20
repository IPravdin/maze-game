import { useEffect, useState } from 'react';

export default function useMediaQueryHeight(size: number) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const query = `(min-height: ${size}px)`;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, size]);
  
  return matches;
}