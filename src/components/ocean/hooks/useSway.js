import { useEffect, useRef, useState } from 'react';

// useSway returns an inline style object with transform that oscillates over time.
export default function useSway({ amplitude = 6, speed = 0.8, phase = 0 } = {}) {
  const rafRef = useRef();
  const startRef = useRef(null);
  const [style, setStyle] = useState({ transform: 'translateY(0px) rotate(0deg)' });

  useEffect(() => {
    function tick(t) {
      if (!startRef.current) startRef.current = t;
      const elapsed = (t - startRef.current) / 1000; // seconds
      const y = Math.sin((elapsed * speed) + phase) * amplitude; // px
      const rot = Math.sin((elapsed * speed * 0.7) + phase) * (amplitude * 0.6); // deg
      setStyle({ transform: `translateY(${y.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)` });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [amplitude, speed, phase]);

  return style;
}
