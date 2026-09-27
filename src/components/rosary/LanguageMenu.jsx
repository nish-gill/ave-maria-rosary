import { memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TRANSLATIONS } from './Translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function LanguageMenu({
  isOpen, onClose, isDarkMode,
  uiLang, setUiLang,
  prayerLang, setPrayerLang,
  mysteryLang, setMysteryLang
}) {
  const uiText = TRANSLATIONS[uiLang].ui;

  const bg = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white';
  const labelClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const subClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const selectTrigger = isDarkMode
    ? 'bg-gray-800 border-gray-600 text-gray-100'
    : 'bg-white border-gray-300 text-gray-900';
  const selectContent = isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  const selectItem = isDarkMode
    ? 'text-gray-100 hover:bg-gray-800 hover:text-gray-100 focus:bg-gray-800 focus:text-gray-100'
    : 'text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900';

  const langOptions = Object.entries(TRANSLATIONS).map(([key, value]) => {
    const nativeName = value.name;
    const translatedName = uiText.languageNames?.[key] || value.name;
    const displayName = nativeName === translatedName ? nativeName : `${nativeName} — ${translatedName}`;
    return { key, displayName };
  });

  const renderLangSelect = (value, onChange, placeholder) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`mt-1 ${selectTrigger}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`max-h-[260px] ${selectContent}`}>
        {langOptions.map(({ key, displayName }) => (
          <SelectItem key={key} value={key} className={selectItem}>{displayName}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md p-0 max-h-[85vh] ${bg}`} closeClassName={isDarkMode ? 'text-white' : ''}>
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            {uiText.selectLanguage}
          </DialogTitle>
          <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            {uiText.selectLanguage}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(85vh-100px)]">
          <div className="p-6 pt-0 space-y-5">
            <div className={`rounded-lg p-4 border space-y-5 ${isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              {/* UI Language */}
              <div>
                <label className={`text-sm font-semibold block ${labelClass}`}>
                  {uiText.uiAndMysteries || 'Interface & Mysteries'}
                </label>
                <p className={`text-xs mt-0.5 mb-1 ${subClass}`}>
                  {uiText.uiAndMysteriesSub || 'Changes menus, navigation labels, and mystery titles.'}
                </p>
                {renderLangSelect(uiLang, setUiLang, uiText.selectUILanguage)}
              </div>

              {/* Mystery Language */}
              <div>
                <label className={`text-sm font-semibold block ${labelClass}`}>
                  {uiText.mysteryTexts}
                </label>
                <p className={`text-xs mt-0.5 mb-1 ${subClass}`}>
                  {uiText.mysteryTextsSub}
                </p>
                {renderLangSelect(mysteryLang, setMysteryLang, uiText.selectMysteryLanguage)}
              </div>

              {/* Prayer Language */}
              <div>
                <label className={`text-sm font-semibold block ${labelClass}`}>
                  {uiText.prayers || 'Prayers'}
                </label>
                <p className={`text-xs mt-0.5 mb-1 ${subClass}`}>
                  {uiText.prayersSub || 'Changes the text of the prayers themselves.'}
                </p>
                {renderLangSelect(prayerLang, setPrayerLang, uiText.selectPrayerLanguage)}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default memo(LanguageMenu);