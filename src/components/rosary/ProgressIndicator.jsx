import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from './Translations';
import { useTouchScreen } from '../../hooks/use-touch-screen';

function ProgressIndicator({ 
  currentPrayer,
  isDarkMode,
  language,
  onOpenNav,
  controlsVisible,
  animationsEnabled,
  animationSpeed
}) {
  const uiText = TRANSLATIONS[language]?.ui || TRANSLATIONS.en.ui;
  const isTouch = useTouchScreen();

  // Sequential fade: track which panel is actually visible
  // 'full' | 'zen' | null
  const targetPanel = controlsVisible ? 'full' : 'zen';
  const [visiblePanel, setVisiblePanel] = useState(targetPanel);
  const [transitioning, setTransitioning] = useState(false);

  const fadeDuration = animationsEnabled ? (0.25 / (animationSpeed || 1)) : 0;

  useEffect(() => {
    if (targetPanel === visiblePanel) return;
    // Start fade-out of current panel, then swap
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setVisiblePanel(targetPanel);
      setTransitioning(false);
    }, fadeDuration * 1000);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPanel]);

  const isInDecade = currentPrayer?.decade && currentPrayer.decade >= 1 && currentPrayer.decade <= 5;
  const isMysteryAnnouncement = currentPrayer?.type === 'mystery_announcement';

  if (!isInDecade || isMysteryAnnouncement) return null;

  const currentDecade = currentPrayer.decade;
  const prayerType = currentPrayer.type;
  
  let dots = [];
  let labelText = '';
  let shorthand = '';

  if (prayerType === 'our_father' && currentPrayer.decade) {
    dots = [
      { label: uiText.ourFather, isActive: true, isCompleted: false },
      ...Array.from({ length: 10 }, (_, i) => ({ label: `${uiText.hailMary} ${i + 1}`, isActive: false, isCompleted: false })),
      { label: uiText.gloryBe, isActive: false, isCompleted: false },
      { label: uiText.fatimaPrayer, isActive: false, isCompleted: false }
    ];
    labelText = `${uiText.decade || 'Decade'} ${currentDecade} ${uiText.of || 'of'} 5 — ${uiText.ourFather}`;
    shorthand = `[${currentDecade}:P]`;
  }
  else if (prayerType === 'hail_mary') {
    const currentHailMary = currentPrayer.hailMaryNumber || 1;
    dots = Array.from({ length: 10 }, (_, index) => ({
      label: `${uiText.hailMary} ${index + 1}`,
      isActive: index + 1 === currentHailMary,
      isCompleted: index + 1 < currentHailMary
    }));
    labelText = `${uiText.decade || 'Decade'} ${currentDecade} ${uiText.of || 'of'} 5 — ${uiText.hailMary} ${currentHailMary} ${uiText.of || 'of'} 10`;
    shorthand = `[${currentDecade}:${currentHailMary}]`;
  }
  else if (prayerType === 'glory_be' && currentPrayer.decade) {
    dots = [
      { label: uiText.gloryBe, isActive: true, isCompleted: false },
      { label: uiText.fatimaPrayer, isActive: false, isCompleted: false }
    ];
    labelText = `${uiText.decade || 'Decade'} ${currentDecade} ${uiText.of || 'of'} 5 — ${uiText.gloryBe}`;
    shorthand = `[${currentDecade}:G]`;
  }
  else if (prayerType === 'fatima_prayer') {
    dots = [
      { label: uiText.gloryBe, isActive: false, isCompleted: true },
      { label: uiText.fatimaPrayer, isActive: true, isCompleted: false }
    ];
    labelText = `${uiText.decade || 'Decade'} ${currentDecade} ${uiText.of || 'of'} 5 — ${uiText.fatimaPrayer}`;
    shorthand = `[${currentDecade}:F]`;
  }
  else {
    return null;
  }

  const tapHint = isTouch ? uiText.tapToNavigate : (uiText.clickToNavigate || 'Click to navigate');

  const dotRow = (opacity) => (
    <div className="flex justify-center gap-2" role="presentation">
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          animate={{ 
            scale: dot.isActive ? 1.3 : 1,
            opacity: dot.isActive || dot.isCompleted ? opacity : opacity * 0.3
          }}
          transition={{ duration: fadeDuration, ease: 'easeOut' }}
          className={`w-2 h-2 rounded-full transition-all ${
            dot.isActive
              ? isDarkMode ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 'bg-blue-500 shadow-lg shadow-blue-500/30'
              : dot.isCompleted
              ? isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
              : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          title={dot.label}
        />
      ))}
    </div>
  );

  // Fade out = transitioning, fade in = !transitioning
  const panelOpacity = transitioning ? 0 : 1;

  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      {/* Full UI panel */}
      {visiblePanel === 'full' && (
        <motion.div
          animate={{ opacity: panelOpacity }}
          transition={{ duration: fadeDuration }}
          className={`${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}
          role="status"
          aria-label={labelText}
        >
          <button
            onClick={onOpenNav}
            className="w-full px-6 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`${labelText} — ${tapHint}`}
          >
            <div className="max-w-sm mx-auto">
              <div className={`text-center text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {labelText}
              </div>
              {dotRow(1)}
              <div className={`text-center text-xs mt-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                {tapHint}
              </div>
            </div>
          </button>
        </motion.div>
      )}

      {/* Zen mode */}
      {visiblePanel === 'zen' && (
        <motion.div
          animate={{ opacity: panelOpacity }}
          transition={{ duration: fadeDuration }}
          className="pt-3 pb-1"
        >
          <div className="max-w-sm mx-auto flex flex-col items-center gap-1.5">
            <div className={`text-xs font-mono tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {shorthand}
            </div>
            {dotRow(0.7)}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default React.memo(ProgressIndicator);