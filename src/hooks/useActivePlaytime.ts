import { useEffect, useRef, useState } from "react";

const TICK_MS = 1000;

/** Counts only time while the document is visible and play is not paused. */
export function useActivePlaytime(enabled: boolean): number {
  const elapsedRef = useRef(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const segmentStartedAt = performance.now();
    const update = () => {
      setElapsed(elapsedRef.current + performance.now() - segmentStartedAt);
    };
    const timer = window.setInterval(update, TICK_MS);

    return () => {
      window.clearInterval(timer);
      elapsedRef.current += performance.now() - segmentStartedAt;
      setElapsed(elapsedRef.current);
    };
  }, [enabled]);

  return elapsed;
}
