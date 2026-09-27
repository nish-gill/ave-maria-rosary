import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Map, Languages, Settings, Info } from 'lucide-react';
import { TRANSLATIONS } from './Translations';

const Label = ({ children }) =>
  <span className="text-[10px] font-medium leading-none mt-0.5 truncate">{children}</span>;

function CommandBar({
  isDarkMode,
  onPrevious,
  onNext,
  onOpenNav,
  onOpenLanguage,
  onOpenSettings,
  onOpenTutorial,
  visible = true,
  isFirst = false,
  isLast = false,
  uiLang = 'en',
  animationsEnabled = true,
  animationSpeed = 1.0,
  accentColor = '#3b82f6'
}) {
  const t = TRANSLATIONS[uiLang]?.ui || TRANSLATIONS.en.ui;

  const base = `flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-all active:scale-95 focus-visible:outline-none min-w-0 flex-1`;
  const active = isDarkMode ?
  'text-gray-200 hover:bg-gray-700/60' :
  'text-gray-700 hover:bg-gray-200/60';
  const disabled = 'opacity-30 cursor-not-allowed';


  const fadeDuration = animationsEnabled ? 0.3 / (animationSpeed || 1) : 0;

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: fadeDuration }}
      className={`fixed bottom-14 left-0 right-0 flex justify-center px-4 ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!visible}>
      
      <div className={`flex items-stretch w-full max-w-sm rounded-2xl backdrop-blur-md shadow-lg overflow-hidden border ${
      isDarkMode ?
      'bg-gray-900/85 border-gray-700/60 shadow-black/40' :
      'bg-white/90 border-gray-200/80 shadow-black/10'}`
      }>

        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`${base} ${isFirst ? disabled : active}`}
          aria-label="Previous prayer">
          
          <ChevronLeft className="w-5 h-5 flex-shrink-0" />
          <Label>{t.back}</Label>
        </button>

        <div className={`w-px self-stretch my-2 ${isDarkMode ? 'bg-gray-700/60' : 'bg-gray-200/80'}`} />

        <button onClick={onOpenNav} className={`${base} ${active}`} aria-label="Navigation menu">
          <Map className="w-5 h-5 flex-shrink-0" />
          <Label>{t.menu}</Label>
        </button>

        <button onClick={onOpenLanguage} className={`${base} ${active}`} aria-label="Language settings">
          <Languages className="w-5 h-5 flex-shrink-0" />
          <Label>{t.lang}</Label>
        </button>

        <button onClick={onOpenSettings} className={`${base} ${active}`} aria-label="App settings">
          <Settings className="w-5 h-5 flex-shrink-0" />
          <Label>{t.settings}</Label>
        </button>

        <button onClick={onOpenTutorial} className={`${base} ${active}`} aria-label="Help">
          <Info className="w-5 h-5 flex-shrink-0" />
          <Label>{t.help}</Label>
        </button>

        <div className={`w-px self-stretch my-2 ${isDarkMode ? 'bg-gray-700/60' : 'bg-gray-200/80'}`} />

        <button
          onClick={onNext}
          disabled={isLast}
          className={`${base} ${isLast ? disabled : active}`}
          aria-label="Next prayer">
          
          <ChevronRight className="w-5 h-5 flex-shrink-0" />
          <Label>{t.next}</Label>
        </button>

      </div>
      </motion.div>);
      }

      export default memo(CommandBar);