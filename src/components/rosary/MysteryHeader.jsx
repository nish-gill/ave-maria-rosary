import { memo } from 'react';
import { motion } from 'framer-motion';
import { getTranslatedMysteries } from './RosaryData';
import { TRANSLATIONS } from './Translations';
import { useTouchScreen } from '../../hooks/use-touch-screen';

function MysteryHeader({ 
  currentMystery, 
  currentPrayer,
  isDarkMode, 
  isHighContrast = false,
  language,
  onClick,
  controlsVisible,
  animationsEnabled,
  animationSpeed,
  fontSize = 18,
  accentColor = '#3b82f6',
}) {
  const mysteries = getTranslatedMysteries(language);
  const mystery = mysteries[currentMystery];
  const uiText = TRANSLATIONS[language].ui;
  const isTouch = useTouchScreen();

  const isInDecade = currentPrayer?.decade && currentPrayer.decade >= 1 && currentPrayer.decade <= 5;
  const isMysteryAnnouncement = currentPrayer?.type === 'mystery_announcement';
  const shouldShow = !isInDecade || isMysteryAnnouncement;

  if (!shouldShow) return null;

  const fadeDuration = animationsEnabled ? (0.3 / (animationSpeed || 1)) : 0;
  const hint = isTouch ? (uiText.changeHintTouch || 'Tap to change') : (uiText.changeHint || 'Click to change');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: controlsVisible ? 1 : 0,
        y: 0,
        pointerEvents: controlsVisible ? 'auto' : 'none'
      }}
      transition={{ duration: fadeDuration }}
      className={`fixed left-0 right-0 z-10 top-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
    >
      <button
        onClick={onClick}
        className={`w-full text-center px-6 py-2 transition-colors hover:cursor-pointer ${
          isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/50'
        }`}
      >
        <div className={`font-medium ${isHighContrast ? 'font-bold' : ''}`} style={{ fontSize: `${Math.round(fontSize * 0.78)}px` }}>
          <span className={isDarkMode ? (isHighContrast ? 'text-white' : 'text-gray-300') : (isHighContrast ? 'text-black' : 'text-gray-600')}>
            {uiText.todaysMystery}:{' '}
          </span>
          <span style={{ color: accentColor }}>
            {mystery.name}
          </span>
        </div>
        <div className={`mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} style={{ fontSize: `${Math.round(fontSize * 0.67)}px` }}>
          {hint}
        </div>
      </button>
    </motion.div>
  );
}

export default memo(MysteryHeader);