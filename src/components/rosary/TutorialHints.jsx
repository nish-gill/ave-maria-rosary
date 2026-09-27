import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

// Detect if the primary input is a pointer (mouse/trackpad) vs touch
const isDesktop = () => window.matchMedia('(pointer: fine)').matches;

const TUTORIAL_I18N = {
  en: {
    prevTouch: 'Swipe back', prevSub: 'previous prayer',
    nextTouch: 'Swipe forward', nextSub: 'next prayer',
    prevKey: '← Arrow key', prevKeySub: 'previous prayer',
    nextKey: '→ Arrow key', nextKeySub: 'next prayer',
    toggleTouch: 'Double-tap center', toggleTouchSub: 'hide / show buttons',
    hideKey: 'H key', hideKeySub: 'hide / show buttons',
    darkKey: 'D key', darkKeySub: 'toggle dark mode',
    dismiss: 'Tap anywhere to continue', dismissKey: 'Press any key to continue'
  },
  la: {
    prevTouch: 'Striscia retro', prevSub: 'oratio prior',
    nextTouch: 'Striscia ante', nextSub: 'oratio sequens',
    prevKey: '← Clavis', prevKeySub: 'oratio prior',
    nextKey: '→ Clavis', nextKeySub: 'oratio sequens',
    toggleTouch: 'Duplici ictu centri', toggleTouchSub: 'absconde / ostende',
    hideKey: 'Clavis H', hideKeySub: 'absconde / ostende',
    darkKey: 'Clavis D', darkKeySub: 'modus obscurus',
    dismiss: 'Tange ad procedendum', dismissKey: 'Preme clavem ad procedendum'
  },
  fr: {
    prevTouch: 'Glisser en arrière', prevSub: 'prière précédente',
    nextTouch: 'Glisser en avant', nextSub: 'prière suivante',
    prevKey: '← Flèche gauche', prevKeySub: 'prière précédente',
    nextKey: '→ Flèche droite', nextKeySub: 'prière suivante',
    toggleTouch: 'Double-tap au centre', toggleTouchSub: 'afficher / masquer',
    hideKey: 'Touche H', hideKeySub: 'afficher / masquer',
    darkKey: 'Touche D', darkKeySub: 'mode sombre',
    dismiss: 'Tapez n\'importe où pour continuer', dismissKey: 'Appuyez sur une touche pour continuer'
  },
  pt: {
    prevTouch: 'Deslizar para trás', prevSub: 'oração anterior',
    nextTouch: 'Deslizar para frente', nextSub: 'próxima oração',
    prevKey: '← Seta esquerda', prevKeySub: 'oração anterior',
    nextKey: '→ Seta direita', nextKeySub: 'próxima oração',
    toggleTouch: 'Toque duplo no centro', toggleTouchSub: 'mostrar / ocultar',
    hideKey: 'Tecla H', hideKeySub: 'mostrar / ocultar',
    darkKey: 'Tecla D', darkKeySub: 'modo escuro',
    dismiss: 'Toque em qualquer lugar para continuar', dismissKey: 'Pressione qualquer tecla para continuar'
  },
  de: {
    prevTouch: 'Zurückwischen', prevSub: 'vorheriges Gebet',
    nextTouch: 'Vorwärtswischen', nextSub: 'nächstes Gebet',
    prevKey: '← Pfeiltaste links', prevKeySub: 'vorheriges Gebet',
    nextKey: '→ Pfeiltaste rechts', nextKeySub: 'nächstes Gebet',
    toggleTouch: 'Doppeltipp Mitte', toggleTouchSub: 'einblenden / ausblenden',
    hideKey: 'Taste H', hideKeySub: 'einblenden / ausblenden',
    darkKey: 'Taste D', darkKeySub: 'Dunkelmodus',
    dismiss: 'Tippen zum Fortfahren', dismissKey: 'Taste drücken zum Fortfahren'
  },
  es: {
    prevTouch: 'Deslizar atrás', prevSub: 'oración anterior',
    nextTouch: 'Deslizar adelante', nextSub: 'siguiente oración',
    prevKey: '← Flecha izquierda', prevKeySub: 'oración anterior',
    nextKey: '→ Flecha derecha', nextKeySub: 'siguiente oración',
    toggleTouch: 'Doble toque al centro', toggleTouchSub: 'mostrar / ocultar',
    hideKey: 'Tecla H', hideKeySub: 'mostrar / ocultar',
    darkKey: 'Tecla D', darkKeySub: 'modo oscuro',
    dismiss: 'Toca en cualquier lugar para continuar', dismissKey: 'Presiona cualquier tecla para continuar'
  },
  it: {
    prevTouch: 'Scorri indietro', prevSub: 'preghiera precedente',
    nextTouch: 'Scorri avanti', nextSub: 'preghiera successiva',
    prevKey: '← Freccia sinistra', prevKeySub: 'preghiera precedente',
    nextKey: '→ Freccia destra', nextKeySub: 'preghiera successiva',
    toggleTouch: 'Doppio tocco al centro', toggleTouchSub: 'mostra / nascondi',
    hideKey: 'Tasto H', hideKeySub: 'mostra / nascondi',
    darkKey: 'Tasto D', darkKeySub: 'modalità scura',
    dismiss: 'Tocca ovunque per continuare', dismissKey: 'Premi un tasto per continuare'
  },
  el: {
    prevTouch: 'Σύρε πίσω', prevSub: 'προηγούμενη προσευχή',
    nextTouch: 'Σύρε μπροστά', nextSub: 'επόμενη προσευχή',
    prevKey: '← Αριστερό βέλος', prevKeySub: 'προηγούμενη προσευχή',
    nextKey: '→ Δεξί βέλος', nextKeySub: 'επόμενη προσευχή',
    toggleTouch: 'Διπλό πάτημα κέντρου', toggleTouchSub: 'εμφάνιση / απόκρυψη',
    hideKey: 'Πλήκτρο H', hideKeySub: 'εμφάνιση / απόκρυψη',
    darkKey: 'Πλήκτρο D', darkKeySub: 'σκοτεινή λειτουργία',
    dismiss: 'Πατήστε οπουδήποτε για συνέχεια', dismissKey: 'Πατήστε οποιοδήποτε πλήκτρο για συνέχεια'
  },
  ru: {
    prevTouch: 'Смахнуть назад', prevSub: 'предыдущая молитва',
    nextTouch: 'Смахнуть вперёд', nextSub: 'следующая молитва',
    prevKey: '← Стрелка влево', prevKeySub: 'предыдущая молитва',
    nextKey: '→ Стрелка вправо', nextKeySub: 'следующая молитва',
    toggleTouch: 'Двойное касание в центре', toggleTouchSub: 'показать / скрыть',
    hideKey: 'Клавиша H', hideKeySub: 'показать / скрыть',
    darkKey: 'Клавиша D', darkKeySub: 'тёмный режим',
    dismiss: 'Нажмите где угодно для продолжения', dismissKey: 'Нажмите любую клавишу для продолжения'
  },
  nl: {
    prevTouch: 'Veeg terug', prevSub: 'vorig gebed',
    nextTouch: 'Veeg vooruit', nextSub: 'volgend gebed',
    prevKey: '← Pijltje links', prevKeySub: 'vorig gebed',
    nextKey: '→ Pijltje rechts', nextKeySub: 'volgend gebed',
    toggleTouch: 'Dubbel tikken midden', toggleTouchSub: 'tonen / verbergen',
    hideKey: 'Toets H', hideKeySub: 'tonen / verbergen',
    darkKey: 'Toets D', darkKeySub: 'donkere modus',
    dismiss: 'Tik ergens om door te gaan', dismissKey: 'Druk op een toets om door te gaan'
  },
  ga: {
    prevTouch: 'Sleamhnaigh siar', prevSub: 'paidir roimhe',
    nextTouch: 'Sleamhnaigh ar aghaidh', nextSub: 'paidir eile',
    prevKey: '← Eochair chlé', prevKeySub: 'paidir roimhe',
    nextKey: '→ Eochair dheas', nextKeySub: 'paidir eile',
    toggleTouch: 'Buail faoi dhó lár', toggleTouchSub: 'taispeáin / folaigh',
    hideKey: 'Eochair H', hideKeySub: 'taispeáin / folaigh',
    darkKey: 'Eochair D', darkKeySub: 'mód dorcha',
    dismiss: 'Buail áit ar bith chun leanúint', dismissKey: 'Brúigh eochair ar bith chun leanúint'
  },
  ja: {
    prevTouch: '左にスワイプ', prevSub: '前の祈り',
    nextTouch: '右にスワイプ', nextSub: '次の祈り',
    prevKey: '← 左矢印キー', prevKeySub: '前の祈り',
    nextKey: '→ 右矢印キー', nextKeySub: '次の祈り',
    toggleTouch: '中央をダブルタップ', toggleTouchSub: '表示 / 非表示',
    hideKey: 'Hキー', hideKeySub: '表示 / 非表示',
    darkKey: 'Dキー', darkKeySub: 'ダークモード',
    dismiss: 'どこかをタップして続ける', dismissKey: '任意のキーを押して続ける'
  }
};

function TutorialHints({ isDarkMode, uiLang = 'en', visible, animationsEnabled = true, onClose }) {
  const [internalVisible, setInternalVisible] = useState(true);
  const [desktop, setDesktop] = useState(isDesktop());

  const isVisible = visible !== undefined ? visible : internalVisible;
  const handleClose = () => {
    if (onClose) onClose();else
    setInternalVisible(false);
    requestAnimationFrame(() => {
      try {
        const badgeClose = document.getElementById('badge-close');
        if (badgeClose) {
          badgeClose.click();
        } else {
          const badge = document.getElementById('base44-edit-badge');
          if (badge) {
            const closeBtn = badge.querySelector('button, [role="button"]');
            if (closeBtn) closeBtn.click();
          }
        }
      } catch (e) {
        // Badge unavailable — ignore silently
      }
    });
  };



  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const handler = (e) => setDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const dismiss = () => handleClose();
    // capture-phase so we intercept interactions before child elements consume them
    const opts = { capture: true };
    window.addEventListener('pointerdown', dismiss, opts);
    window.addEventListener('keydown', dismiss, opts);
    window.addEventListener('touchstart', dismiss, opts);
    return () => {
      window.removeEventListener('pointerdown', dismiss, opts);
      window.removeEventListener('keydown', dismiss, opts);
      window.removeEventListener('touchstart', dismiss, opts);
    };
  }, [isVisible]);

  const t = TUTORIAL_I18N[uiLang] || TUTORIAL_I18N.en;

  const overlayBg = isDarkMode ? 'bg-black/60' : 'bg-black/40';
  const textColor = 'text-white';
  const subColor = 'text-white/80';

  const noAnim = !animationsEnabled;

  const renderPrevIcon = () => desktop ?
  <div className="w-12 h-12 rounded-lg border-2 border-white/70 bg-white/20 flex items-center justify-center">
      <span className="text-white text-xl font-light">←</span>
    </div> :

  <motion.div
    animate={noAnim ? undefined : { x: [-6, 6, -6] }}
    transition={noAnim ? { duration: 0 } : { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
    
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M28 20H12M12 20L20 12M12 20L20 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>;


  const renderNextIcon = () => desktop ?
  <div className="w-12 h-12 rounded-lg border-2 border-white/70 bg-white/20 flex items-center justify-center">
      <span className="text-white text-xl font-light">→</span>
    </div> :

  <motion.div
    animate={noAnim ? undefined : { x: [6, -6, 6] }}
    transition={noAnim ? { duration: 0 } : { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
    
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M12 20H28M28 20L20 12M28 20L20 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>;


  const renderToggleIcon = () => desktop ?
  <div className="flex gap-2">
      <div className="w-12 h-12 rounded-lg border-2 border-white/70 bg-white/20 flex items-center justify-center">
        <span className="text-white text-lg font-bold">H</span>
      </div>
      <div className="w-12 h-12 rounded-lg border-2 border-white/70 bg-white/20 flex items-center justify-center">
        <span className="text-white text-lg font-bold">D</span>
      </div>
    </div> :

  <div className="relative flex items-center justify-center">
      <motion.div
      animate={noAnim ? undefined : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
      transition={noAnim ? { duration: 0 } : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      className="absolute w-14 h-14 rounded-full bg-white/20 border border-white/40" />
    
      <motion.div
      animate={noAnim ? undefined : { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
      transition={noAnim ? { duration: 0 } : { repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
      className="w-10 h-10 rounded-full bg-white/30 border-2 border-white/70 flex items-center justify-center">
      
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="4" />
        </svg>
      </motion.div>
    </div>;


  return (
    <MotionConfig transition={noAnim ? { duration: 0 } : undefined}>
    <AnimatePresence>
      {isVisible &&
      <motion.div
        initial={noAnim ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={noAnim ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: noAnim ? 0 : 0.5 }}
        className={`fixed inset-0 z-30 pointer-events-auto select-none flex flex-col items-center justify-center opacity-100 ${overlayBg} backdrop-blur-[2px] cursor-pointer`}
        aria-label="Tutorial overlay"
        role="button"
        tabIndex={0}
        onClick={handleClose}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClose()}>
        
          {/* Hints row */}
          <div className="flex items-center justify-between w-full max-w-lg px-8 mb-12">
            {/* Previous */}
            <motion.div
            initial={noAnim ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={noAnim ? { duration: 0 } : { delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center gap-2">
            
              {renderPrevIcon()}
              <span className={`text-sm font-semibold ${textColor} drop-shadow text-center`}>
                {desktop ? t.prevKey : t.prevTouch}
              </span>
              <span className={`text-xs ${subColor} text-center`}>
                {desktop ? t.prevKeySub : t.prevSub}
              </span>
            </motion.div>

            {/* Center toggle */}
            <motion.div
            initial={noAnim ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={noAnim ? { duration: 0 } : { delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center gap-3 px-4">
            
              {renderToggleIcon()}
              {desktop ?
            <div className="flex flex-col items-center gap-1 text-center">
                  <span className={`text-sm font-semibold ${textColor} drop-shadow`}>{t.hideKey} <span className={`text-xs font-normal ${subColor}`}>— {t.hideKeySub}</span></span>
                  <span className={`text-sm font-semibold ${textColor} drop-shadow`}>{t.darkKey} <span className={`text-xs font-normal ${subColor}`}>— {t.darkKeySub}</span></span>
                </div> :

            <>
                  <span className={`text-sm font-semibold ${textColor} drop-shadow text-center`}>{t.toggleTouch}</span>
                  <span className={`text-xs ${subColor} text-center`}>{t.toggleTouchSub}</span>
                </>
            }
            </motion.div>

            {/* Next */}
            <motion.div
            initial={noAnim ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={noAnim ? { duration: 0 } : { delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center gap-2">
            
              {renderNextIcon()}
              <span className={`text-sm font-semibold ${textColor} drop-shadow text-center`}>
                {desktop ? t.nextKey : t.nextTouch}
              </span>
              <span className={`text-xs ${subColor} text-center`}>
                {desktop ? t.nextKeySub : t.nextSub}
              </span>
            </motion.div>
          </div>

          {/* Dismiss hint */}
          <motion.div
          initial={noAnim ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={noAnim ? { duration: 0 } : { delay: 1.0, duration: 0.5 }}
          className={`text-xs ${subColor} text-center`}>
          
            {desktop ? t.dismissKey : t.dismiss}
          </motion.div>
        </motion.div>
      }
      </AnimatePresence>
      </MotionConfig>
      );

      }

export default React.memo(TutorialHints);