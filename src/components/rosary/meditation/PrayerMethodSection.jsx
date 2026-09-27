import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { MONTFORT_METHODS } from './MontfortMethods';
import { TRANSLATIONS } from '../Translations';

function PrayerMethodSection({
  method,
  onSelect,
  isDarkMode,
  uiLang,
  accentColor = '#3b82f6',
  fontSize = 18,
}) {
  const t = (TRANSLATIONS[uiLang]?.ui?.montfort) || TRANSLATIONS.en.ui.montfort;
  const [expanded, setExpanded] = useState(false);

  const selected = MONTFORT_METHODS.find((m) => m.id === method);
  const selectedLabel = selected ? t[selected.nameKey] : t.none;

  const cardBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBg = isDarkMode ? 'bg-gray-900/60' : 'bg-white/70';
  const titleColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const subColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const changeBtn = isDarkMode
    ? 'text-gray-300 hover:bg-gray-800'
    : 'text-gray-600 hover:bg-gray-100';

  const handleSelect = (id) => {
    onSelect(id);
    setExpanded(false);
  };

  return (
    <div className={`max-w-3xl mx-auto mt-2 mb-2 rounded-2xl border ${cardBorder} ${cardBg} overflow-hidden`}>
      {/* Header (always visible) */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={expanded}
      >
        <span className="min-w-0">
          <span
            className="block text-[10px] uppercase tracking-wider font-semibold"
            style={{ color: accentColor }}
          >
            {t.sectionTitle}
          </span>
          <span className={`block text-sm font-medium truncate mt-0.5 ${titleColor}`}>
            {method === 'none' || !selected ? (
              t.noMethod
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="truncate">
                  {selectedLabel}
                  {selected.author && (
                    <span className={`font-normal ${subColor}`}>{' \u2014 '}{t.author}</span>
                  )}
                </span>
              </span>
            )}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-2 transition-transform ${expanded ? 'rotate-180' : ''} ${subColor}`}
        />
      </button>

      {/* Expanded choices */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`px-3 pb-3 pt-1 space-y-2 border-t ${cardBorder}`}>
              {MONTFORT_METHODS.map((m) => {
                const isSel = m.id === method;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelect(m.id)}
                    className={`w-full text-left rounded-xl border p-3 transition-colors ${
                      isSel
                        ? isDarkMode
                          ? 'bg-white/10 border-white/20'
                          : 'bg-black/5 border-black/10'
                        : isDarkMode
                          ? 'bg-transparent border-gray-700 hover:bg-gray-800'
                          : 'bg-transparent border-gray-200 hover:bg-gray-50'
                    }`}
                    style={isSel ? { boxShadow: `inset 0 0 0 1.5px ${accentColor}88` } : {}}
                  >
                    <div className="flex items-start gap-2.5">
                      {isSel ? (
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
                      ) : (
                        <span
                          className="w-4 h-4 mt-0.5 shrink-0 rounded-full border"
                          style={{ borderColor: isDarkMode ? '#4b5563' : '#d1d5db' }}
                        />
                      )}
                      <div className="min-w-0">
                        <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {t[m.nameKey]}
                          {m.author && (
                            <span className={`font-normal ml-1 ${subColor}`}>{' \u2014 '}{t.author}</span>
                          )}
                        </div>
                        <div className={`text-xs mt-0.5 leading-relaxed ${subColor}`}>
                          {t[m.descKey]}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(PrayerMethodSection);