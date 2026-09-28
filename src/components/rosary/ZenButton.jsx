import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HOLD_DURATION = 1000; // ms

function ZenButton({
  controlsVisible,
  setControlsVisible,
  isDarkMode,
  isHighContrast,
  accentColor,
  zenMode = 'tap', // 'tap' | 'hold'
}) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef(null);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const accent = accentColor || '#3b82f6';

  const clearAll = () => {
    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
    setHolding(false);
    setProgress(0);
  };

  const showTapHint = () => {
    clearTimeout(hintTimerRef.current);
    setShowHint(true);
    hintTimerRef.current = setTimeout(() => setShowHint(false), 2000);
  };

  const handleRelease = (e) => {
    if (zenMode === 'tap') {
      setControlsVisible(v => !v);
      return;
    }
    endHold();
  };

  const startHold = (e) => {
    // Prevent the browser from following a touchstart/touchend with a
    // synthesized mousedown/mouseup/click — without this, a tap on a
    // touchscreen fires handleRelease twice (once per input type), which
    // toggles controlsVisible twice and makes the button look like it does
    // nothing at all.
    e.preventDefault();
    if (zenMode === 'tap') {
      // do nothing else on press; toggle happens on release
      return;
    }
    // In hold mode, a short tap shows a hint
    const tapStart = performance.now();
    const checkTap = () => {
      if (performance.now() - tapStart < 300) showTapHint();
    };
    setTimeout(checkTap, 320);
    setHolding(true);
    startRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const p = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setControlsVisible(v => !v);
        clearAll();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const endHold = () => {
    if (zenMode === 'hold') clearAll();
  };


  useEffect(() => () => { clearAll(); clearTimeout(hintTimerRef.current); }, []);

  // Opacity: when controls are hidden, this button stays faintly visible
  const opacity = controlsVisible ? 0.45 : 0.3;

  const circumference = 2 * Math.PI * 18; // r=18

  return (
    <>
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-48 z-40 px-3 py-2 rounded-xl text-xs font-medium shadow-lg pointer-events-none"
          style={{
            background: isDarkMode ? 'rgba(30,30,40,0.92)' : 'rgba(255,255,255,0.95)',
            color: isDarkMode ? '#e5e7eb' : '#374151',
            border: `1px solid ${accentColor}44`,
            backdropFilter: 'blur(8px)',
            maxWidth: '10rem',
            textAlign: 'center',
          }}
        >
          Hold to toggle UI
        </motion.div>
      )}
    </AnimatePresence>
    <motion.button
      animate={{ opacity }}
      transition={{ duration: 0.4 }}
      onMouseDown={startHold}
      onMouseUp={handleRelease}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={handleRelease}
      className={`fixed right-5 bottom-32 z-30 w-12 h-12 rounded-full flex items-center justify-center select-none focus-visible:outline-none`}
      style={{
        background: isDarkMode ? 'rgba(30,30,40,0.7)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(8px)',
        border: `1.5px solid ${isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)'}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}
      aria-label={controlsVisible ? 'Hide controls (Zen mode)' : 'Show controls'}
    >

      {/* Progress ring for hold mode */}
      {zenMode === 'hold' && (
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24" cy="24" r="18"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
      )}
      {/* Leaf / eye icon — simple SVG */}
      <svg viewBox="0 0 24 24" className="w-5 h-5 relative z-10" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20c-4.4 0-8-3.6-8-8 0-3.2 2.1-6 5.2-7.2C10.6 4.3 12 4 12 4s1.4.3 2.8.8C17.9 6 20 8.8 20 12c0 4.4-3.6 8-8 8z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    </motion.button>
    </>
  );
}

export default React.memo(ZenButton);