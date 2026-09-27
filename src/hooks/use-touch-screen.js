import { useState, useEffect } from 'react';

// Returns true when the primary pointer is NOT fine (i.e. touch/coarse) —
// uses (pointer: fine) to match TutorialHints' detection exactly.
export function useTouchScreen() {
  const [isTouch, setIsTouch] = useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const handler = (e) => setIsTouch(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isTouch;
}
