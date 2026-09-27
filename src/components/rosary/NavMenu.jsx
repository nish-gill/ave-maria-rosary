import React, { useEffect, useRef, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getTranslatedMysteries } from './RosaryData';
import { TRANSLATIONS } from './Translations';
import { CheckCircle, Home } from 'lucide-react';

function NavMenu({
  isOpen, onClose, onJumpTo, onReset,
  currentMystery, setCurrentMystery,
  currentIndex, isDarkMode, uiLang,
  PRAYER_SEQUENCE,
  accentColor = '#3b82f6',
}) {
  const uiText = TRANSLATIONS[uiLang].ui;
  const mysteries = getTranslatedMysteries(uiLang);

  const mystery = mysteries[currentMystery];

  const sections = useMemo(() => {
    const firstDecadeStart = PRAYER_SEQUENCE.findIndex(p => p.type === 'mystery_announcement' && p.decade === 1);
    const conclusionStart = PRAYER_SEQUENCE.findIndex(p => p.type === 'hail_holy_queen');
    const s = [];
    s.push({
      title: uiText.openingPrayers,
      prayers: PRAYER_SEQUENCE.slice(0, firstDecadeStart).map((p, i) => ({ ...p, originalIndex: i }))
    });
    for (let decade = 1; decade <= 5; decade++) {
      const mysteryStart = PRAYER_SEQUENCE.findIndex(p => p.type === 'mystery_announcement' && p.decade === decade);
      const ourFatherIndex = PRAYER_SEQUENCE.findIndex(p => p.type === 'our_father' && p.decade === decade);
      const firstHailMaryIndex = PRAYER_SEQUENCE.findIndex(p => p.type === 'hail_mary' && p.decade === decade && p.hailMaryNumber === 1);
      const gloryBeIndex = PRAYER_SEQUENCE.findIndex(p => p.type === 'glory_be' && p.decade === decade);
      s.push({
        title: `${decade}. ${mystery.decades[decade - 1]}`,
        prayers: [
          { label: PRAYER_SEQUENCE[mysteryStart]?.label, originalIndex: mysteryStart },
          { label: uiText.ourFather, originalIndex: ourFatherIndex },
          { label: `10 ${uiText.hailMary}s`, originalIndex: firstHailMaryIndex, isHailMaryGroup: true, decade },
          { label: `${uiText.gloryBe} & ${uiText.fatimaPrayer}`, originalIndex: gloryBeIndex }
        ]
      });
    }
    s.push({
      title: uiText.closingPrayers,
      prayers: PRAYER_SEQUENCE.slice(conclusionStart).map((p, i) => ({ ...p, originalIndex: conclusionStart + i }))
    });
    return s;
  }, [PRAYER_SEQUENCE, uiText, mystery]);

  const isCurrentlyInSection = (prayer) => {
    if (prayer.isHailMaryGroup) {
      const cp = PRAYER_SEQUENCE[currentIndex];
      return cp?.type === 'hail_mary' && cp?.decade === prayer.decade;
    }
    return currentIndex === prayer.originalIndex;
  };

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    const attemptScroll = (delay) => {
      setTimeout(() => {
        if (cancelled || !scrollContainerRef.current) return;
        const current = scrollContainerRef.current.querySelector('[data-current="true"]');
        if (!current) return;
        current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, delay);
    };

    // Try once early (covers instant-open when animations off)
    attemptScroll(50);
    // Retry after dialog enter animation finishes (covers animated open)
    attemptScroll(300);

    return () => { cancelled = true; };
  }, [isOpen, currentIndex, PRAYER_SEQUENCE]);

  const bg = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md p-0 max-h-[85vh] flex flex-col ${bg}`} closeClassName={isDarkMode ? 'text-white' : ''}>
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            {uiText.prayerNav}
          </DialogTitle>
          <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            {uiText.prayerNav}
          </DialogDescription>
          {/* Quick action — jump to start (pinned in header so it stays visible while scrolling) */}
          <div className="pt-3">
            <Button variant="outline" size="sm" onClick={() => { onJumpTo(0); onClose(); }}
              className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-white' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'}`}>
              <Home className="w-4 h-4 mr-2" />{uiText.jumpToStart}
            </Button>
          </div>
        </DialogHeader>
        <div ref={scrollContainerRef} className={`flex-1 min-h-0 overflow-y-auto themed-scroll ${isDarkMode ? 'themed-scroll-dark' : ''}`}>
          <div className="p-6 pt-0 space-y-5">
            {/* Mystery picker */}
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider" style={{ color: accentColor }}>
                {uiText.selectMystery}
              </h3>
              <div className="flex flex-col gap-1">
                {Object.entries(mysteries).map(([key, opt]) => (
                  <Button key={key} variant="ghost" onClick={() => { setCurrentMystery(key); onClose(); }}
                    className={`w-full justify-start h-auto py-2 text-left ${currentMystery === key
                      ? isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-900'
                      : isDarkMode ? 'hover:bg-gray-800 hover:text-gray-100 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                    style={currentMystery === key ? { boxShadow: `inset 0 0 0 1.5px ${accentColor}55` } : {}}>
                    {currentMystery === key && <CheckCircle className="w-4 h-4 mr-2 shrink-0" />}
                    <span className={currentMystery !== key ? 'ml-6' : ''}>{opt.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Prayer sections */}
            {sections.map((section, si) => (
              <div key={si}>
                <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider" style={{ color: accentColor }}>
                  {section.title}
                </h3>
                <div className="flex flex-col gap-1">
                  {section.prayers.map((prayer, pi) => {
                    const isCurrent = isCurrentlyInSection(prayer);
                    return (
                      <Button key={`${si}-${pi}`} variant="ghost" onClick={() => onJumpTo(prayer.originalIndex)}
                        data-current={isCurrent ? 'true' : undefined}
                        className={`w-full justify-start h-auto py-2 text-left ${isCurrent
                          ? isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-900'
                          : isDarkMode ? 'hover:bg-gray-800 hover:text-gray-100 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                        style={isCurrent ? { boxShadow: `inset 0 0 0 1.5px ${accentColor}55` } : {}}>
                        {isCurrent && <CheckCircle className="w-4 h-4 mr-2 shrink-0" />}
                        <span className={!isCurrent ? 'ml-6' : ''}>{prayer.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(NavMenu);