import React, { useState } from 'react';
import { Zap, Moon, Sun, Contrast, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { TRANSLATIONS } from './Translations';
import { ACCENT_THEMES } from './themes';

function SettingsMenu({
  isOpen, onClose, isDarkMode, setIsDarkMode,
  isHighContrast, setIsHighContrast,
  fontSize, setFontSize, uiLang,
  animationsEnabled, setAnimationsEnabled,
  animationSpeed, setAnimationSpeed,
  accentTheme, setAccentTheme,
  zenButtonVisible, setZenButtonVisible,
  zenMode, setZenMode,
}) {
  const t = TRANSLATIONS[uiLang]?.ui || TRANSLATIONS.en.ui;
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const accentThemeObj = ACCENT_THEMES.find(th => th.id === accentTheme);
  const accent = (isDarkMode && accentThemeObj?.darkColor) ? accentThemeObj.darkColor : (accentThemeObj?.color || '#3b82f6');

  const bg = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white';
  const labelClass = isHighContrast
    ? (isDarkMode ? 'text-white font-bold' : 'text-black font-bold')
    : (isDarkMode ? 'text-gray-200' : 'text-gray-800');
  const subClass = isHighContrast
    ? (isDarkMode ? 'text-gray-200 font-semibold' : 'text-gray-700 font-semibold')
    : (isDarkMode ? 'text-gray-400' : 'text-gray-500');
  const divClass = isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-200';
  const uiFontSize = Math.max(14, Math.round(fontSize * 0.85));

  const useGrid = fontSize <= 20;

  // Every hand-rolled CSS transition in this menu is gated on animationsEnabled
  // too — otherwise turning animations off wouldn't even affect the very
  // screen that offers the toggle.
  const transitionClass = animationsEnabled ? 'transition-all duration-150' : '';

  const cardBase = `rounded-xl border cursor-pointer ${transitionClass} active:scale-[0.98] select-none flex flex-col items-center justify-center gap-2 text-center`;
  const cardIdle = isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-700/60' : 'bg-gray-50 border-gray-200 hover:bg-gray-100';

  const rowBase = `rounded-xl border cursor-pointer ${transitionClass} active:scale-[0.98] select-none`;
  const rowIdle = isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-700/60' : 'bg-gray-50 border-gray-200 hover:bg-gray-100';

  const activeStyle = { borderColor: accent, boxShadow: `inset 0 0 0 1px ${accent}44` };
  const activeBg = isDarkMode ? 'bg-white/5' : 'bg-black/3';

  const toggles = [
    {
      active: isDarkMode,
      onToggle: () => setIsDarkMode(!isDarkMode),
      icon: isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />,
      iconBg: isDarkMode ? 'bg-yellow-400/20 text-yellow-300' : 'bg-gray-200 text-gray-600',
      label: isDarkMode ? t.lightMode : t.darkMode,
      sub: isDarkMode ? t.switchToLight : t.switchToDark,
      ariaLabel: 'darkMode',
    },
    {
      active: !!isHighContrast,
      onToggle: () => setIsHighContrast(!isHighContrast),
      icon: <Contrast className="w-6 h-6" />,
      iconBg: isHighContrast ? 'bg-white/10' : (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-400'),
      label: t.highContrast,
      sub: isHighContrast ? t.highContrastOn : t.increaseContrast,
      ariaLabel: 'highContrast',
    },
    {
      active: animationsEnabled,
      onToggle: () => setAnimationsEnabled(!animationsEnabled),
      icon: <Zap className="w-6 h-6" />,
      iconBg: animationsEnabled ? 'bg-white/10' : (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-400'),
      label: t.animations,
      sub: animationsEnabled ? t.animationsOn : t.animationsOff,
      ariaLabel: 'animations',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md p-0 max-h-[85vh] overflow-y-auto themed-scroll ${isDarkMode ? 'themed-scroll-dark' : ''} ${bg}`} aria-label={t.settingsTitle} closeClassName={isDarkMode ? 'text-white' : ''}>
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className={isHighContrast ? (isDarkMode ? 'text-white font-bold' : 'text-black font-bold') : (isDarkMode ? 'text-white' : 'text-gray-900')} style={{ fontSize: `${uiFontSize + 2}px` }}>
            {t.settingsTitle}
          </DialogTitle>
          <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            {t.settingsTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-0 space-y-4">

          {/* Toggle grid — 3-column when font is small, stacked when large */}
          {useGrid ? (
            <div className="grid grid-cols-3 gap-3">
              {toggles.map((tog) => (
                <button
                  key={tog.ariaLabel}
                  role="switch"
                  aria-checked={tog.active}
                  onClick={tog.onToggle}
                  className={`${cardBase} ${tog.active ? activeBg : cardIdle} p-3`}
                  style={tog.active ? activeStyle : {}}
                >
                  <div className={`p-2 rounded-full`} style={tog.active ? { background: `${accent}22`, color: accent } : { background: isDarkMode ? '#374151' : '#e5e7eb', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                    {tog.icon}
                  </div>
                  <p className={`font-semibold leading-tight ${labelClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.82)}px` }}>
                    {tog.label}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {toggles.map((tog) => (
                <button
                  key={tog.ariaLabel}
                  role="switch"
                  aria-checked={tog.active}
                  onClick={tog.onToggle}
                  className={`w-full text-left ${rowBase} p-4 ${tog.active ? activeBg : rowIdle} flex items-center justify-between`}
                  style={tog.active ? activeStyle : {}}
                >
                  <div>
                    <p className={`font-semibold ${labelClass}`} style={{ fontSize: `${uiFontSize}px` }}>{tog.label}</p>
                    <p className={`mt-0.5 ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.85)}px` }}>{tog.sub}</p>
                  </div>
                  <div className="ml-4 p-2 rounded-full" style={tog.active ? { background: `${accent}22`, color: accent } : { background: isDarkMode ? '#374151' : '#e5e7eb', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{tog.icon}</div>
                </button>
              ))}
            </div>
          )}

          {/* Font size */}
          <div className={`rounded-xl p-4 border space-y-3 ${divClass}`}>
            <div className="flex items-center justify-between">
              <p className={`font-semibold ${labelClass}`} style={{ fontSize: `${uiFontSize}px` }}>{t.fontSize}</p>
              <span className={`font-mono ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.85)}px` }}>{fontSize}px</span>
            </div>
            <input
              type="range"
              min={14} max={28} step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: accent, '--slider-color': accent }}
              aria-label={t.fontSize}
            />
            <div className={`flex justify-between ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.8)}px` }}>
              <span>{t.fontSizeSmall}</span>
              <span>{t.fontSizeLarge}</span>
            </div>
          </div>

          {/* Advanced section */}
          <div className={`rounded-xl p-4 border space-y-5 ${divClass}`}>
            <button
              onClick={() => setAdvancedOpen(v => !v)}
              className="w-full flex items-center justify-between"
            >
              <span className={`font-semibold ${isHighContrast ? 'font-bold' : ''} ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} style={{ fontSize: `${uiFontSize}px` }}>{t.advanced}</span>
              {advancedOpen ? <ChevronUp className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} /> : <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />}
            </button>

            {advancedOpen && (
              <>
                {/* Animation Speed */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className={`font-semibold ${labelClass}`} style={{ fontSize: `${uiFontSize}px` }}>{t.animationSpeed}</p>
                    <span className={`font-mono ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.85)}px` }}>{animationSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.2} max={2.0} step={0.1}
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(parseFloat(parseFloat(e.target.value).toFixed(1)))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ accentColor: accent, '--slider-color': accent }}
                    aria-label={t.animationSpeed}
                    disabled={!animationsEnabled}
                  />
                  <div className={`flex justify-between ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.8)}px` }}>
                    <span>{t.slow}</span>
                    <span>{t.fast}</span>
                  </div>
                  {!animationsEnabled && (
                    <p className={`text-center pt-1 ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.8)}px` }}>{t.animationsOff}</p>
                  )}
                </div>

                {/* Divider */}
                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                {/* Accent Theme */}
                <div className="space-y-3">
                  <p className={`font-semibold ${labelClass}`} style={{ fontSize: `${uiFontSize}px` }}>{t.accentTheme}</p>
                  {/* Standard */}
                  <div className="flex gap-3 flex-wrap">
                    {ACCENT_THEMES.filter(th => !th.highContrast).map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setAccentTheme(theme.id)}
                        title={t.colorNames?.[theme.id] || theme.label}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${transitionClass}`}
                          style={{
                            background: theme.color,
                            boxShadow: accentTheme === theme.id
                              ? `0 0 0 3px ${isDarkMode ? '#1f2937' : '#ffffff'}, 0 0 0 5px ${theme.color}`
                              : '0 1px 4px rgba(0,0,0,0.2)',
                            transform: accentTheme === theme.id ? 'scale(1.15)' : 'scale(1)',
                          }}
                        />
                        <span className={`${subClass} leading-tight text-center`} style={{ fontSize: `${Math.round(uiFontSize * 0.72)}px` }}>
                          {t.colorNames?.[theme.id] || theme.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {/* High Contrast */}
                  <p className={`${subClass} font-medium`} style={{ fontSize: `${Math.round(uiFontSize * 0.78)}px` }}>{t.highContrast}</p>
                  <div className="flex gap-3 flex-wrap">
                    {ACCENT_THEMES.filter(th => th.highContrast).map(theme => {
                      const swatchColor = (isDarkMode && theme.darkColor) ? theme.darkColor : theme.color;
                      const ringColor = swatchColor;
                      const isSelected = accentTheme === theme.id;
                      return (
                      <button
                        key={theme.id}
                        onClick={() => setAccentTheme(theme.id)}
                        title={t.colorNames?.[theme.id] || theme.label}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${transitionClass}`}
                          style={{
                            background: theme.splitSwatch ? undefined : swatchColor,
                            boxShadow: isSelected
                              ? `0 0 0 3px ${isDarkMode ? '#1f2937' : '#ffffff'}, 0 0 0 5px ${ringColor}`
                              : '0 1px 4px rgba(0,0,0,0.2)',
                            transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                          }}
                        >
                          {theme.splitSwatch && (
                            <svg viewBox="0 0 32 32" className="w-full h-full block">
                              <defs>
                                <clipPath id="splitClip">
                                  <circle cx="16" cy="16" r="16" />
                                </clipPath>
                              </defs>
                              <g clipPath="url(#splitClip)">
                                <rect x="0" y="0" width="32" height="32" fill="#ffffff" />
                                <polygon points="0,32 32,0 32,32" fill="#000000" />
                              </g>
                            </svg>
                          )}
                        </div>
                        <span className={`${subClass} leading-tight text-center`} style={{ fontSize: `${Math.round(uiFontSize * 0.72)}px` }}>
                          {t.colorNames?.[theme.id] || theme.label}
                        </span>
                      </button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                {/* Zen Button Settings */}
                <div className="space-y-3">
                  <p className={`font-semibold ${labelClass}`} style={{ fontSize: `${uiFontSize}px` }}>{t.zenButton}</p>
                  <p className={`${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.82)}px` }}>
                    {t.zenButtonDesc}
                  </p>

                  {/* Show/hide zen button */}
                  <button
                  role="switch"
                  aria-checked={zenButtonVisible}
                  onClick={() => setZenButtonVisible(v => !v)}
                  className={`w-full text-left rounded-xl p-3 border flex items-center justify-between ${transitionClass} ${zenButtonVisible ? activeBg : rowIdle}`}
                  style={zenButtonVisible ? activeStyle : {}}
                  >
                    <span className={`font-medium ${labelClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.9)}px` }}>
                      {t.showZenButton}
                    </span>
                    <div className={`rounded-full flex items-center px-0.5 ${animationsEnabled ? 'transition-colors' : ''}`}
                      style={{ minWidth: '2rem', height: '1.1rem', background: zenButtonVisible ? accent : (isDarkMode ? '#4b5563' : '#d1d5db') }}>
                      <div className={`rounded-full bg-white shadow ${animationsEnabled ? 'transition-transform duration-200' : ''} ${zenButtonVisible ? 'translate-x-3.5' : 'translate-x-0'}`}
                        style={{ width: '0.85rem', height: '0.85rem' }} />
                    </div>
                  </button>

                  {/* Interaction mode */}
                  {zenButtonVisible && (
                    <div className="flex gap-2 pt-1">
                      {[
                        { id: 'tap',  label: t.instantTap,    sub: t.instantTapDesc },
                        { id: 'hold', label: t.pressAndHold,  sub: t.pressAndHoldDesc },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setZenMode(opt.id)}
                          className={`flex-1 rounded-xl p-3 border text-center ${transitionClass} ${zenMode === opt.id ? activeBg : rowIdle}`}
                          style={zenMode === opt.id ? activeStyle : {}}
                        >
                          <p className={`font-semibold ${labelClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.85)}px` }}>{opt.label}</p>
                          <p className={`mt-0.5 ${subClass}`} style={{ fontSize: `${Math.round(uiFontSize * 0.74)}px` }}>{opt.sub}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(SettingsMenu);