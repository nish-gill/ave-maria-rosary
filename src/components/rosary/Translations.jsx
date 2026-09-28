// Translations loader. English is bundled directly (it's the fallback used
// everywhere while another language is still loading, and for anyone who
// never changes the language). The other 11 languages live in their own
// files under ./translations/ and are loaded on demand with dynamic import()
// — most visitors only ever use one or two languages, so there's no reason
// to ship all ~127 KB of translated text up front.
//
// TRANSLATIONS is a plain mutable object. Every existing call site already
// reads it as `TRANSLATIONS[lang]?.ui || TRANSLATIONS.en.ui` (or similar), so
// a language that hasn't loaded yet just falls back to English until
// ensureLanguageLoaded() resolves and something triggers a re-render.
import en from './translations/en';

export const TRANSLATIONS = { en };

// Static manifest of every supported language's own name for itself, used by
// the language picker (LanguageMenu) so it can list all 12 choices without
// needing their full translation data loaded first.
export const LANGUAGE_LIST = [
  { code: 'en', name: 'English' },
  { code: 'la', name: 'Latina' },
  { code: 'fr', name: 'Français' },
  { code: 'pt', name: 'Português' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'ru', name: 'Русский' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'ga', name: 'Gaeilge' },
  { code: 'ja', name: '日本語' },
];

const loaders = {
  la: () => import('./translations/la'),
  fr: () => import('./translations/fr'),
  pt: () => import('./translations/pt'),
  de: () => import('./translations/de'),
  es: () => import('./translations/es'),
  it: () => import('./translations/it'),
  el: () => import('./translations/el'),
  ru: () => import('./translations/ru'),
  nl: () => import('./translations/nl'),
  ga: () => import('./translations/ga'),
  ja: () => import('./translations/ja'),
};

const pending = {};

// Fetches a language's data if needed and stores it on TRANSLATIONS[code].
// Safe to call repeatedly (returns the same in-flight promise) and safe to
// call with 'en' or an unknown code (resolves immediately). Callers should
// re-render after this resolves — mutating TRANSLATIONS in place doesn't
// trigger React on its own.
export function ensureLanguageLoaded(code) {
  if (TRANSLATIONS[code] || !loaders[code]) return Promise.resolve(TRANSLATIONS[code] || TRANSLATIONS.en);
  if (!pending[code]) {
    pending[code] = loaders[code]()
      .then((mod) => { TRANSLATIONS[code] = mod.default; return mod.default; })
      .finally(() => { delete pending[code]; });
  }
  return pending[code];
}
