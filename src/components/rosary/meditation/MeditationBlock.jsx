import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Feather, Gift, Heart, Crown, BookOpen } from 'lucide-react';
import { BLOCK_LABEL_KEY } from './MontfortMethods';
import { TRANSLATIONS } from '../Translations';

const TYPE_ICON = {
  offering: Gift,
  petition: Heart,
  meditation: BookOpen,
  motive: Crown,
  opening: Sparkles,
  decadeSubject: Feather,
};

function MeditationBlock({
  block,
  isDarkMode,
  uiLang,
  fontSize = 18,
  animationsEnabled = true,
  animationSpeed = 1.0,
  accentColor = '#3b82f6',
}) {
  const t = (TRANSLATIONS[uiLang]?.ui?.montfort) || TRANSLATIONS.en.ui.montfort;
  const d = animationsEnabled ? 1 / (animationSpeed || 1) : 0;

  if (!block || !block.body) return null;

  const Icon = TYPE_ICON[block.type] || Sparkles;
  const labelKey = BLOCK_LABEL_KEY[block.type] || 'meditation';
  let label = t[labelKey];
  if (block.hailMaryNumber) {
    label = `${label} \u00b7 ${block.hailMaryNumber} / 10`;
  }

  const cardBg = isDarkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-white/80 border-gray-200';
  const bodyColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${block.type}-${block.decade || 0}-${block.hailMaryNumber || 0}`}
        initial={animationsEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={animationsEnabled ? { opacity: 0, y: -6 } : false}
        transition={{ duration: 0.3 * d, ease: 'easeOut' }}
        className="max-w-3xl mx-auto mt-6"
        aria-live="polite"
      >
        <div
          className={`rounded-2xl border px-4 py-3 shadow-sm ${cardBg}`}
          style={{ borderLeft: `3px solid ${accentColor}` }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Icon className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
            <span
              className="text-[10px] uppercase tracking-wider font-semibold"
              style={{ color: accentColor }}
            >
              {label}
            </span>
          </div>
          <p
            className={`leading-relaxed ${bodyColor}`}
            style={{ fontSize: `${Math.round(fontSize * 0.9)}px` }}
          >
            {block.body}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(MeditationBlock);
