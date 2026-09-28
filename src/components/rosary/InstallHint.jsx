import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share, X } from 'lucide-react';
import { TRANSLATIONS } from './Translations';

// iOS Safari has no automatic "install this app" prompt the way Chrome/
// Android does, so this fills that gap with its own small, dismissible
// banner. Shown only when it would actually be useful: Safari on iOS/iPadOS,
// and not already running installed (standalone) from the home screen.
export const shouldShowInstallHint = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);
  const isStandalone = window.navigator.standalone === true ||
    window.matchMedia?.('(display-mode: standalone)').matches;
  return isIOS && isSafari && !isStandalone;
};

function InstallHint({ isDarkMode, uiLang = 'en', visible, animationsEnabled = true, onDismiss }) {
  const t = TRANSLATIONS[uiLang]?.ui || TRANSLATIONS.en.ui;

  const bg = isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200';
  const textMain = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={animationsEnabled ? { opacity: 0, y: 20 } : false}
          transition={{ duration: animationsEnabled ? 0.3 : 0 }}
          className={`fixed left-4 right-4 bottom-32 z-40 mx-auto max-w-sm rounded-2xl border shadow-lg backdrop-blur-md p-4 ${bg}`}
          role="dialog"
          aria-label={t.installHintTitle}
        >
          <div className="flex items-start gap-3">
            <Share className={`w-5 h-5 mt-0.5 shrink-0 ${textSub}`} />
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${textMain}`}>{t.installHintTitle}</p>
              <p className={`text-xs mt-1 leading-relaxed ${textSub}`}>{t.installHintBody}</p>
              <button
                type="button"
                onClick={onDismiss}
                className={`mt-3 text-xs font-medium px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {t.gotIt}
              </button>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label={t.gotIt}
              className={`shrink-0 p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-800 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(InstallHint);
