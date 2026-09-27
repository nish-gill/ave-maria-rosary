import { memo } from 'react';
import { motion } from 'framer-motion';
import { getTranslatedMysteries } from './RosaryData';
import { TRANSLATIONS } from './Translations';
import { insertPhraseIntoHailMary } from './meditation/Method2Content';

function PrayerDisplay({ 
  currentPrayer, 
  currentMystery, 
  isDarkMode,
  isHighContrast = false,
  language,
  mysteryLang,
  fontSize = 18,
  animationsEnabled = true,
  animationSpeed = 1.0,
  accentColor = '#3b82f6',
  prayerLang = 'en',
  hailMaryPhrase = null,
  methodSection = null,
  meditation = null,
}) {
  const d = animationsEnabled ? (1 / (animationSpeed || 1)) : 0;
  const mysteries = getTranslatedMysteries(mysteryLang || language);
  const mystery = mysteries[currentMystery];
  const uiText = TRANSLATIONS[language].ui;

  const hcBold = isHighContrast ? 'font-bold' : '';

  const textMain = isHighContrast
    ? (isDarkMode ? 'text-white font-bold' : 'text-black font-bold')
    : (isDarkMode ? 'text-white' : 'text-gray-800');

  const textMuted = isHighContrast
    ? (isDarkMode ? 'text-gray-100 font-bold' : 'text-gray-900 font-bold')
    : (isDarkMode ? 'text-gray-300' : 'text-gray-700');

  const textSub = isHighContrast
    ? (isDarkMode ? 'text-gray-200 font-semibold' : 'text-gray-800 font-semibold')
    : (isDarkMode ? 'text-gray-400' : 'text-gray-600');

  const accentStyle = { color: accentColor };
  // textAccent is used as a fallback class; we'll override with inline style
  const textAccent = isHighContrast
    ? (isDarkMode ? 'font-bold' : 'font-bold')
    : '';

  const renderMysteryAnnouncement = () => {
    const decadeIndex = currentPrayer.decade - 1;
    const mysteryTitle = mystery.decades[decadeIndex];
    const biblicalText = mystery.biblicalTexts[decadeIndex];
    
    return (
      <div className="text-center space-y-6 max-w-4xl mx-auto py-8" role="article" aria-label={`Mystery: ${mysteryTitle}`}>
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 * d, delay: 0.1 * d }}
          className={`font-medium ${textAccent}`}
          style={{ fontSize: `${Math.round(fontSize * 0.9)}px`, ...accentStyle }}
        >
          {mystery.name}
        </motion.div>
        
        <motion.h2
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 * d, delay: 0.2 * d }}
          className={`leading-relaxed ${isHighContrast ? 'font-bold' : 'font-light'} ${textMain}`}
          style={{ fontSize: `${Math.round(fontSize * 1.4)}px` }}
        >
          {currentPrayer.decade}. {mysteryTitle}
        </motion.h2>
        
        {/* Biblical Text */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 * d, delay: 0.3 * d }}
          className="space-y-4"
        >
          <div className={`font-medium ${textAccent}`} style={{ fontSize: `${Math.round(fontSize * 0.8)}px`, ...accentStyle }}>
            {biblicalText.verse}
          </div>
          <blockquote className={`italic leading-relaxed ${textMuted}`} style={{ fontSize: `${fontSize}px` }}>
            "{biblicalText.text}"
          </blockquote>
        </motion.div>

        {/* Meditation */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 * d, delay: 0.4 * d }}
          className={`leading-relaxed max-w-2xl mx-auto ${textSub}`}
          style={{ fontSize: `${Math.round(fontSize * 0.85)}px` }}
        >
          {biblicalText.meditation}
        </motion.div>

        <motion.div
          initial={animationsEnabled ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 * d, delay: 0.5 * d }}
          className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${hcBold}`}
          style={{ fontSize: `${Math.round(fontSize * 0.75)}px` }}
        >
          {uiText.meditateOnMystery}
        </motion.div>
      </div>
    );
  };

  const renderPrayerText = () => {
    const showPhrase = currentPrayer.type === 'hail_mary' && hailMaryPhrase;
    const insertable = showPhrase && prayerLang === 'en';
    const displayText = insertable
      ? insertPhraseIntoHailMary(currentPrayer.text, hailMaryPhrase)
      : currentPrayer.text;

    return (
      <div className="text-center space-y-4 py-8" role="article" aria-label={currentPrayer.label}>
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 * d, delay: 0.1 * d }}
          className={`text-sm font-medium tracking-wide uppercase ${textAccent}`}
          style={accentStyle}
          aria-label={`Prayer: ${currentPrayer.label}`}
        >
          {currentPrayer.label}
          {currentPrayer.decade && !currentPrayer.isIntroductory && (
            <span className={`block text-xs mt-1 ${textSub}`}>
              {uiText.decade || 'Decade'} {currentPrayer.decade} - {mystery.decades[currentPrayer.decade - 1]}
            </span>
          )}
        </motion.div>

        <motion.p
          key={`${currentPrayer.text}-${currentPrayer.hailMaryNumber || 0}`}
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 * d, delay: 0.15 * d }}
          className={`leading-relaxed font-light max-w-3xl mx-auto ${textMain}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {displayText}
        </motion.p>

        {/* For non-English Hail Marys, show the mystery phrase as a caption */}
        {showPhrase && !insertable && (
          <motion.p
            initial={animationsEnabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 * d, delay: 0.25 * d }}
            className={`italic max-w-3xl mx-auto ${textSub}`}
            style={{ fontSize: `${Math.round(fontSize * 0.8)}px` }}
          >
            &hellip;Jesus, {hailMaryPhrase}.
          </motion.p>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex items-start justify-center transition-all duration-500 ${
        isHighContrast
          ? isDarkMode ? 'bg-black' : 'bg-white'
          : isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div className="w-full max-w-5xl mx-auto px-6 pt-32 pb-40">
        {methodSection}
        <motion.div
          key={`${language}-${currentPrayer.type}-${currentPrayer.decade}-${currentPrayer.hailMaryNumber}`}
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={animationsEnabled ? { opacity: 0, y: -20 } : false}
          transition={{ duration: 0.3 * d, ease: 'easeOut' }}
        >
          {currentPrayer.type === 'mystery_announcement' 
            ? renderMysteryAnnouncement() 
            : renderPrayerText()
          }
        </motion.div>
        {meditation}
      </div>
    </div>
  );
}

export default memo(PrayerDisplay);