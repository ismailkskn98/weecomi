import { useEffect, useRef } from "react";

/**
 * Tracks pointer position relative to `ref`, rAF-throttled.
 * Adapted from Animata useMousePosition — also syncs on pointerenter.
 */
export function useMousePosition(ref, callback) {
  const callbackRef = useRef(callback);
  const rectRef = useRef(null);
  const frameRef = useRef(null);
  const latestPointRef = useRef(null);

  callbackRef.current = callback;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const updateRect = () => {
      rectRef.current = node.getBoundingClientRect();
    };

    const flush = () => {
      frameRef.current = null;
      if (latestPointRef.current) {
        callbackRef.current?.(latestPointRef.current);
      }
    };

    const setPointFromEvent = (event) => {
      if (!rectRef.current) updateRect();
      const currentRect = rectRef.current;
      if (!currentRect) return;

      latestPointRef.current = {
        x: event.clientX - currentRect.left,
        y: event.clientY - currentRect.top,
      };
    };

    const handlePointerEnter = (event) => {
      updateRect();
      setPointFromEvent(event);
      // Immediate sync so re-entry does not animate from the last leave position
      flush();
    };

    const handlePointerMove = (event) => {
      setPointFromEvent(event);
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(flush);
      }
    };

    updateRect();
    node.addEventListener("pointerenter", handlePointerEnter);
    node.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true, capture: true });

    return () => {
      node.removeEventListener("pointerenter", handlePointerEnter);
      node.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [ref]);
}
