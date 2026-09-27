import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import PrayerDisplay from '../components/rosary/PrayerDisplay';
import ProgressIndicator from '../components/rosary/ProgressIndicator';
import MysteryHeader from '../components/rosary/MysteryHeader';
import { ACCENT_THEMES } from '../components/rosary/themes';
import TutorialHints from '../components/rosary/TutorialHints';
const NavMenu = lazy(() => import('../components/rosary/NavMenu'));
const LanguageMenu = lazy(() => import('../components/rosary/LanguageMenu'));
const SettingsMenu = lazy(() => import('../components/rosary/SettingsMenu'));
import CommandBar from '../components/rosary/CommandBar';
import ZenButton from '../components/rosary/ZenButton';
import { resolveMeditation, ensureMethodContentLoaded } from '../components/rosary/meditation/MontfortMethods';
import { generatePrayerSequence, getMysteryForDay, idToUrl, parseUrlId } from '../components/rosary/RosaryData';
import { TRANSLATIONS, LANGUAGE_LIST, ensureLanguageLoaded } from '../components/rosary/Translations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const detectBrowserLanguage = () => {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
  return LANGUAGE_LIST.some(l => l.code === browserLang) ? browserLang : 'en';
};

const detectDarkModePreference = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

// Settings (dark mode, contrast, font size, accent, animations, speed, the
// three languages, Zen button/mode, and whether the tutorial has been seen)
// are saved together under one key so a returning visitor gets their app
// back the way they left it, instead of the defaults every time.
const loadSettings = () => {
  try {
    const saved = localStorage.getItem('rosarySettings');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

export default function Rosary() {
  const [savedSettings] = useState(loadSettings);
  const [uiLang, setUiLang] = useState(() => savedSettings.uiLang || detectBrowserLanguage());
  const [prayerLang, setPrayerLang] = useState(() => savedSettings.prayerLang || detectBrowserLanguage());
  const [mysteryLang, setMysteryLang] = useState(() => savedSettings.mysteryLang || detectBrowserLanguage());
  const [currentMystery, setCurrentMystery] = useState(() => {
    const parsed = parseUrlId(window.location.hash.replace('#', ''));
    if (parsed?.mysterySet) return parsed.mysterySet;
    try {
      const saved = localStorage.getItem('rosaryProgress');
      if (saved) {
        const { urlId } = JSON.parse(saved);
        const p = parseUrlId(urlId);
        if (p?.mysterySet) return p.mysterySet;
      }
    } catch (e) {}
    return getMysteryForDay();
  });
  const [isDarkMode, setIsDarkMode] = useState(() => savedSettings.isDarkMode ?? detectDarkModePreference());
  const [isHighContrast, setIsHighContrast] = useState(() => savedSettings.isHighContrast ?? false);
  const [fontSize, setFontSize] = useState(() => savedSettings.fontSize ?? 18);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(() => savedSettings.animationsEnabled ?? true);
  const [animationSpeed, setAnimationSpeed] = useState(() => savedSettings.animationSpeed ?? 1.0);
  const [accentTheme, setAccentTheme] = useState(() => savedSettings.accentTheme || 'blue');
  const [zenButtonVisible, setZenButtonVisible] = useState(() => savedSettings.zenButtonVisible ?? false);
  const [zenMode, setZenMode] = useState(() => savedSettings.zenMode || 'tap');

  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // The first-run tutorial opens automatically only until it's been seen once.
  const [tutorialSeen, setTutorialSeen] = useState(() => !!savedSettings.tutorialSeen);
  const [tutorialOpen, setTutorialOpen] = useState(() => !savedSettings.tutorialSeen);
  const [navLoaded, setNavLoaded] = useState(false);
  const [langLoaded, setLangLoaded] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // St. Louis de Montfort's Five Methods. Persists the chosen method in
  // localStorage; changing it never resets the current prayer position.
  const [meditationMethod, setMeditationMethod] = useState(() => {
    try { return localStorage.getItem('rosaryMeditation') || 'none'; } catch (e) { return 'none'; }
  });

  useEffect(() => {
    try { localStorage.setItem('rosaryMeditation', meditationMethod); } catch (e) {}
  }, [meditationMethod]);

  const selectMeditation = useCallback((id) => setMeditationMethod(id), []);

  // Persist the settings above so a returning visitor keeps their choices.
  useEffect(() => {
    try {
      localStorage.setItem('rosarySettings', JSON.stringify({
        uiLang, prayerLang, mysteryLang,
        isDarkMode, isHighContrast, fontSize,
        animationsEnabled, animationSpeed, accentTheme,
        zenButtonVisible, zenMode,
        tutorialSeen,
      }));
    } catch (e) {}
  }, [
    uiLang, prayerLang, mysteryLang,
    isDarkMode, isHighContrast, fontSize,
    animationsEnabled, animationSpeed, accentTheme,
    zenButtonVisible, zenMode,
    tutorialSeen,
  ]);

  // Non-English translations load on demand (see Translations.jsx) rather
  // than all shipping up front. Everything that reads TRANSLATIONS[lang]
  // already falls back to English while a language is still loading; this
  // just kicks off the load whenever one of the three language settings
  // points at a language that isn't in memory yet, and forces a re-render
  // once it arrives so the fallback gets replaced with the real text.
  const [translationsVersion, bumpTranslationsVersion] = useReducer(v => v + 1, 0);
  useEffect(() => {
    let cancelled = false;
    ensureLanguageLoaded(uiLang).then(() => { if (!cancelled) bumpTranslationsVersion(); });
    return () => { cancelled = true; };
  }, [uiLang]);
  useEffect(() => {
    let cancelled = false;
    ensureLanguageLoaded(prayerLang).then(() => { if (!cancelled) bumpTranslationsVersion(); });
    return () => { cancelled = true; };
  }, [prayerLang]);
  useEffect(() => {
    let cancelled = false;
    ensureLanguageLoaded(mysteryLang).then(() => { if (!cancelled) bumpTranslationsVersion(); });
    return () => { cancelled = true; };
  }, [mysteryLang]);

  // Build prayer sequence. When languages change we rebuild but preserve position
  // by mapping the current prayer type/decade/hailMaryNumber to the new sequence.
  const prevPrayerRef = useRef(null);

  const PRAYER_SEQUENCE = useMemo(
    () => generatePrayerSequence(prayerLang, uiLang),
    // translationsVersion isn't read directly, but a newly-loaded language
    // mutates TRANSLATIONS in place — this dependency forces the sequence to
    // rebuild with the real text once that happens (see ensureLanguageLoaded
    // above), instead of staying stuck on whatever was available synchronously.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prayerLang, uiLang, translationsVersion]
  );

  // Map of permanent prayer id -> sequence index for O(1) URL restoration
  const idToIndex = useMemo(() => {
    const map = {};
    PRAYER_SEQUENCE.forEach((p, i) => { if (p.id) map[p.id] = i; });
    return map;
  }, [PRAYER_SEQUENCE]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const parsed = parseUrlId(window.location.hash.replace('#', ''));
    if (parsed && idToIndex[parsed.id] !== undefined) return idToIndex[parsed.id];
    try {
      const saved = localStorage.getItem('rosaryProgress');
      if (saved) {
        const { urlId } = JSON.parse(saved);
        const p = parseUrlId(urlId);
        if (p && idToIndex[p.id] !== undefined) return idToIndex[p.id];
      }
    } catch (e) {}
    return 0;
  });

  const currentPrayer = PRAYER_SEQUENCE[currentIndex];

  // Preserve position when language changes: find the equivalent prayer in the new sequence
  useEffect(() => {
    const prev = prevPrayerRef.current;
    if (!prev) {
      prevPrayerRef.current = PRAYER_SEQUENCE[currentIndex];
      return;
    }
    // Try to find a prayer of the same type, decade, and hailMaryNumber in the new sequence
    const matched = PRAYER_SEQUENCE.findIndex(p =>
      p.type === prev.type &&
      (p.decade === prev.decade || (!p.decade && !prev.decade)) &&
      (p.hailMaryNumber === prev.hailMaryNumber || (!p.hailMaryNumber && !prev.hailMaryNumber)) &&
      (p.isIntroductory === prev.isIntroductory)
    );
    if (matched !== -1) {
      setCurrentIndex(matched);
    }
    prevPrayerRef.current = PRAYER_SEQUENCE[matched !== -1 ? matched : currentIndex];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PRAYER_SEQUENCE]);

  // Update ref whenever currentIndex changes normally (not from language switch)
  useEffect(() => {
    prevPrayerRef.current = PRAYER_SEQUENCE[currentIndex];
  }, [currentIndex, PRAYER_SEQUENCE]);

  // Guards to prevent duplicate history entries and spurious resets
  const skipResetRef = useRef(false);
  const firstMysteryRunRef = useRef(true);
  const isFirstUrlSyncRef = useRef(true);

  // Reset only when the user explicitly changes mystery (skip mount + URL-driven changes)
  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    prevPrayerRef.current = null;
  }, []);

  useEffect(() => {
    if (firstMysteryRunRef.current) { firstMysteryRunRef.current = false; return; }
    if (skipResetRef.current) { skipResetRef.current = false; return; }
    handleReset();
  }, [currentMystery, handleReset]);

  // State -> URL: set the hash only once (initial load / restore).
  // No further history entries are pushed as the user prays, so the URL
  // stays anchored to the starting prayer.
  useEffect(() => {
    if (!isFirstUrlSyncRef.current) return;
    const prayer = PRAYER_SEQUENCE[currentIndex];
    if (!prayer?.id) return;
    const urlId = idToUrl(prayer.id, currentMystery);
    const expectedHash = `#${urlId}`;
    if (window.location.hash !== expectedHash) {
      window.history.replaceState(null, '', expectedHash);
    }
    isFirstUrlSyncRef.current = false;
  }, [currentIndex, currentMystery, PRAYER_SEQUENCE]);

  // Persist current prayer to localStorage for sessions without a URL hash
  useEffect(() => {
    const prayer = PRAYER_SEQUENCE[currentIndex];
    if (!prayer?.id) return;
    const urlId = idToUrl(prayer.id, currentMystery);
    try { localStorage.setItem('rosaryProgress', JSON.stringify({ urlId })); } catch (e) {}
  }, [currentIndex, currentMystery, PRAYER_SEQUENCE]);

  // Browser Back/Forward: URL -> State
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseUrlId(window.location.hash.replace('#', ''));
      if (parsed && idToIndex[parsed.id] !== undefined) {
        if (parsed.mysterySet && parsed.mysterySet !== currentMystery) {
          skipResetRef.current = true;
          setCurrentMystery(parsed.mysterySet);
        }
        setCurrentIndex(idToIndex[parsed.id]);
        prevPrayerRef.current = PRAYER_SEQUENCE[idToIndex[parsed.id]];
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [idToIndex, PRAYER_SEQUENCE, currentMystery]);

  // Toggle body class to disable dialog CSS animations
  useEffect(() => {
    document.body.classList.toggle('no-animations', !animationsEnabled);
    return () => document.body.classList.remove('no-animations');
  }, [animationsEnabled]);

  // System dark mode listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setIsDarkMode(e.matches);
    mq.addEventListener?.('change', handler) ?? mq.addListener?.(handler);
    return () => mq.removeEventListener?.('change', handler) ?? mq.removeListener?.(handler);
  }, []);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PRAYER_SEQUENCE.length - 1;

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, PRAYER_SEQUENCE.length - 1));
  }, [PRAYER_SEQUENCE.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleJumpTo = useCallback((index) => {
    setCurrentIndex(index);
    prevPrayerRef.current = PRAYER_SEQUENCE[index];
    setNavOpen(false);
  }, [PRAYER_SEQUENCE]);

  // Manually resetting to the start (the R key, or the Reset Prayer button in
  // the nav menu) asks for confirmation first; it's easy to hit by accident
  // and would otherwise silently throw away the current position.
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const requestReset = useCallback(() => setResetConfirmOpen(true), []);
  const confirmReset = useCallback(() => {
    handleReset();
    setResetConfirmOpen(false);
  }, [handleReset]);
  const cancelReset = useCallback(() => setResetConfirmOpen(false), []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrevious(); }
      else if (e.key === 'r' || e.key === 'R') requestReset();
      else if (e.key === 'd' || e.key === 'D') setIsDarkMode(p => !p);
      else if (e.key === 'h' || e.key === 'H') setControlsVisible(p => !p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleNext, handlePrevious, requestReset]);

  // Touch: swipe + double-tap
  const lastTapRef = useRef(0);
  const tapTimerRef = useRef(null);

  useEffect(() => {
    let startX = 0, startY = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;

      // Swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        deltaX > 0 ? handleNext() : handlePrevious();
        return;
      }

      // Double-tap anywhere on screen
      if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15) {
        const now = Date.now();
        if (now - lastTapRef.current < 350) {
          clearTimeout(tapTimerRef.current);
          setControlsVisible(prev => !prev);
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
        }
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleNext, handlePrevious]);

  const openNav = useCallback(() => { setNavOpen(true); setNavLoaded(true); }, []);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const openLang = useCallback(() => { setLangOpen(true); setLangLoaded(true); }, []);
  const closeLang = useCallback(() => setLangOpen(false), []);
  const openSettings = useCallback(() => { setSettingsOpen(true); setSettingsLoaded(true); }, []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const openTutorial = useCallback(() => setTutorialOpen(true), []);
  const closeTutorial = useCallback(() => {
    setTutorialOpen(false);
    setControlsVisible(true);
    setTutorialSeen(true);
  }, []);

  const uiText = TRANSLATIONS[uiLang]?.ui || TRANSLATIONS.en.ui;
  const accentThemeObj = ACCENT_THEMES.find(t => t.id === accentTheme);
  const accentColor = (isDarkMode && accentThemeObj?.darkColor) ? accentThemeObj.darkColor : (accentThemeObj?.color || '#3b82f6');

  // Methods 4 and 5's content (~35 KB combined) loads on demand rather than
  // always — see ensureMethodContentLoaded. This mirrors the translations
  // loading above: kick off the load whenever the selected method needs it,
  // and force a recompute once it arrives.
  const [methodContentVersion, bumpMethodContentVersion] = useReducer(v => v + 1, 0);
  useEffect(() => {
    let cancelled = false;
    ensureMethodContentLoaded(meditationMethod).then(() => { if (!cancelled) bumpMethodContentVersion(); });
    return () => { cancelled = true; };
  }, [meditationMethod]);

  // Resolve the Montfort meditation augmentation for the current prayer.
  // The Rosary sequence and permanent IDs are untouched; this only adds a
  // content layer (phrase + inline block) for the selected method.
  const { phrase: hmPhrase, block: meditationBlock } = useMemo(
    () => resolveMeditation(meditationMethod, currentPrayer, currentMystery),
    // methodContentVersion isn't read directly, but it forces this to
    // recompute once Method 4/5's lazily-loaded content module arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [meditationMethod, currentPrayer, currentMystery, methodContentVersion]
  );

  // The inline Prayer Method selector appears near the beginning (first
  // screen) and near the mystery context (each decade announcement), so
  // the user can change method mid-Rosary without losing position.
  // PrayerDisplay renders the selector and the meditation block itself from
  // these data props (rather than receiving pre-built JSX) so its React.memo
  // can actually skip re-rendering when nothing here has changed.
  const showMethodSection = isFirst || currentPrayer?.type === 'mystery_announcement';

  // High contrast overrides prayer display background / text
  const contrastClass = isHighContrast
    ? isDarkMode
      ? 'hc-dark'
      : 'hc-light'
    : '';

  return (
    <div
      className={`relative ${isDarkMode ? 'dark' : ''} ${contrastClass}`}
      style={isHighContrast ? {
        '--hc-bg': isDarkMode ? '#000000' : '#ffffff',
        '--hc-fg': isDarkMode ? '#ffffff' : '#000000',
      } : {}}
    >
      <MysteryHeader
        currentMystery={currentMystery}
        currentPrayer={currentPrayer}
        isDarkMode={isDarkMode}
        isHighContrast={isHighContrast}
        language={uiLang}
        onClick={openNav}
        controlsVisible={controlsVisible}
        animationsEnabled={animationsEnabled}
        animationSpeed={animationSpeed}
        fontSize={fontSize}
        accentColor={accentColor}
        translationsVersion={translationsVersion}
      />

      <ProgressIndicator
        currentPrayer={currentPrayer}
        isDarkMode={isDarkMode}
        language={uiLang}
        onOpenNav={openNav}
        controlsVisible={controlsVisible}
        animationsEnabled={animationsEnabled}
        animationSpeed={animationSpeed}
        translationsVersion={translationsVersion}
      />

      <main role="main" aria-label="Prayer text">
        <PrayerDisplay
          currentPrayer={currentPrayer}
          currentMystery={currentMystery}
          isDarkMode={isDarkMode}
          isHighContrast={isHighContrast}
          language={uiLang}
          mysteryLang={mysteryLang}
          fontSize={fontSize}
          animationsEnabled={animationsEnabled}
          animationSpeed={animationSpeed}
          accentColor={accentColor}
          prayerLang={prayerLang}
          hailMaryPhrase={hmPhrase}
          showMethodSection={showMethodSection}
          meditationMethod={meditationMethod}
          onSelectMeditation={selectMeditation}
          meditationBlock={meditationBlock}
          translationsVersion={translationsVersion}
        />
      </main>

      <TutorialHints
        isDarkMode={isDarkMode}
        uiLang={uiLang}
        visible={tutorialOpen}
        animationsEnabled={animationsEnabled}
        onClose={closeTutorial}
      />

      {zenButtonVisible && (
        <ZenButton
          controlsVisible={controlsVisible}
          setControlsVisible={setControlsVisible}
          isDarkMode={isDarkMode}
          isHighContrast={isHighContrast}
          accentColor={accentColor}
          zenMode={zenMode}
        />
      )}

      <CommandBar
        isDarkMode={isDarkMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onOpenNav={openNav}
        onOpenLanguage={openLang}
        onOpenSettings={openSettings}
        onOpenTutorial={openTutorial}
        visible={controlsVisible}
        isFirst={isFirst}
        isLast={isLast}
        uiLang={uiLang}
        animationsEnabled={animationsEnabled}
        animationSpeed={animationSpeed}
        accentColor={accentColor}
        translationsVersion={translationsVersion}
      />

      {navLoaded && (
        <Suspense fallback={null}>
          <NavMenu
            isOpen={navOpen}
            onClose={closeNav}
            onJumpTo={handleJumpTo}
            onReset={requestReset}
            currentMystery={currentMystery}
            setCurrentMystery={setCurrentMystery}
            currentIndex={currentIndex}
            isDarkMode={isDarkMode}
            uiLang={uiLang}
            PRAYER_SEQUENCE={PRAYER_SEQUENCE}
            accentColor={accentColor}
            translationsVersion={translationsVersion}
          />
        </Suspense>
      )}

      {langLoaded && (
        <Suspense fallback={null}>
          <LanguageMenu
            isOpen={langOpen}
            onClose={closeLang}
            isDarkMode={isDarkMode}
            uiLang={uiLang}
            setUiLang={setUiLang}
            prayerLang={prayerLang}
            setPrayerLang={setPrayerLang}
            mysteryLang={mysteryLang}
            setMysteryLang={setMysteryLang}
            translationsVersion={translationsVersion}
          />
        </Suspense>
      )}

      {settingsLoaded && (
        <Suspense fallback={null}>
          <SettingsMenu
            isOpen={settingsOpen}
            onClose={closeSettings}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isHighContrast={isHighContrast}
            setIsHighContrast={setIsHighContrast}
            fontSize={fontSize}
            setFontSize={setFontSize}
            uiLang={uiLang}
            animationsEnabled={animationsEnabled}
            setAnimationsEnabled={setAnimationsEnabled}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            accentTheme={accentTheme}
            setAccentTheme={setAccentTheme}
            zenButtonVisible={zenButtonVisible}
            setZenButtonVisible={setZenButtonVisible}
            zenMode={zenMode}
            setZenMode={setZenMode}
            translationsVersion={translationsVersion}
          />
        </Suspense>
      )}

      {isLast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-28 left-0 right-0 text-center pointer-events-none"
          aria-live="polite"
        >
          <div className="text-lg font-medium" style={{ color: accentColor }}>
            {uiText.rosaryComplete}
          </div>
          <div className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {uiText.blessing}
          </div>
        </motion.div>
      )}

      <Dialog open={resetConfirmOpen} onOpenChange={(open) => !open && cancelReset()}>
        <DialogContent className={`max-w-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : ''}`} closeClassName={isDarkMode ? 'text-white' : ''}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              {uiText.resetPrayer}
            </DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              {uiText.resetConfirmBody}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelReset}
              className={isDarkMode ? 'border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-white' : ''}>
              {uiText.cancel}
            </Button>
            <Button onClick={confirmReset}>{uiText.resetPrayer}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}