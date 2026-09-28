// St. Louis de Montfort — method metadata, the Third Method opening
// prayer, and the resolver that maps a prayer position (identified by its
// permanent id/type/decade/hailMaryNumber) to the meditation content for
// the selected method. The Rosary sequence and its permanent IDs are
// never altered; this only adds an augmentation layer.

import { getOffering, getPetition } from './Method1Content';
import { getMysteryPhrase } from './Method2Content';

// Method 4 and 5's content (~35 KB combined) only loads once the user
// actually picks one of them — most visitors never do. Method 1/2/3 stay
// statically imported above since they're small (~6 KB together) and not
// worth the added complexity.
const methodContentModules = {};
const pendingMethodContent = {};
const lazyLoaders = {
  'montfort-4': () => import('./Method4Content'),
  'montfort-5': () => import('./Method5Content'),
};

// Fetches a method's content module if needed. Safe to call repeatedly and
// safe to call for a method with nothing to lazy-load (resolves to null).
// Callers should re-run resolveMeditation() after this resolves — until
// then, resolveMeditation() simply omits the block for that method.
export function ensureMethodContentLoaded(methodId) {
  if (methodContentModules[methodId] || !lazyLoaders[methodId]) {
    return Promise.resolve(methodContentModules[methodId] || null);
  }
  if (!pendingMethodContent[methodId]) {
    pendingMethodContent[methodId] = lazyLoaders[methodId]()
      .then((mod) => { methodContentModules[methodId] = mod; return mod; })
      .finally(() => { delete pendingMethodContent[methodId]; });
  }
  return pendingMethodContent[methodId];
}

export const MONTFORT_METHODS = [
  { id: 'none', nameKey: 'none', descKey: 'noneDesc', author: false },
  { id: 'montfort-1', nameKey: 'method1', descKey: 'method1Desc', author: true },
  { id: 'montfort-2', nameKey: 'method2', descKey: 'method2Desc', author: true },
  { id: 'montfort-3', nameKey: 'method3', descKey: 'method3Desc', author: true },
  { id: 'montfort-4', nameKey: 'method4', descKey: 'method4Desc', author: true },
  { id: 'montfort-5', nameKey: 'method5', descKey: 'method5Desc', author: true },
];

// Third Method — a short opening prayer, offered once at the beginning.
export const METHOD3_OPENING =
  "O sovereign and immaculate Mary, we beseech thee to offer this Rosary to the most Holy Trinity in union with all the Angels and Saints; and through it to obtain from thy divine Son the grace of a living faith, a firm hope, and a burning charity.";

const isDecadeHailMary = (prayer) =>
  prayer.type === 'hail_mary' && prayer.decade && !prayer.isIntroductory;

/**
 * Resolve the meditation augmentation for a prayer step.
 * @returns {{ phrase: string|null, block: object|null }}
 *   - phrase: for Method 2/3, the mystery phrase to add to each Hail Mary.
 *   - block: { type, body, decade?, hailMaryNumber? } to render inline.
 */
export const resolveMeditation = (methodId, prayer, mysterySet) => {
  if (!prayer || methodId === 'none') return { phrase: null, block: null };

  const result = { phrase: null, block: null };

  switch (methodId) {
    case 'montfort-1':
      if (prayer.type === 'mystery_announcement') {
        result.block = { type: 'offering', decade: prayer.decade, body: getOffering(mysterySet, prayer.decade) };
      } else if (prayer.type === 'glory_be' && prayer.decade) {
        result.block = { type: 'petition', decade: prayer.decade, body: getPetition(mysterySet, prayer.decade) };
      }
      break;

    case 'montfort-2':
      if (isDecadeHailMary(prayer)) {
        result.phrase = getMysteryPhrase(mysterySet, prayer.decade);
      }
      break;

    case 'montfort-3':
      if (prayer.id === 'OPEN-SIGN') {
        result.block = { type: 'opening', body: METHOD3_OPENING };
      } else if (prayer.type === 'mystery_announcement') {
        result.block = { type: 'offering', decade: prayer.decade, body: getOffering(mysterySet, prayer.decade) };
      } else if (isDecadeHailMary(prayer)) {
        result.phrase = getMysteryPhrase(mysterySet, prayer.decade);
      } else if (prayer.type === 'glory_be' && prayer.decade) {
        result.block = { type: 'petition', decade: prayer.decade, body: getPetition(mysterySet, prayer.decade) };
      }
      break;

    case 'montfort-4': {
      const mod4 = methodContentModules['montfort-4'];
      if (prayer.type === 'mystery_announcement') {
        result.block = { type: 'offering', decade: prayer.decade, body: getOffering(mysterySet, prayer.decade) };
      } else if (isDecadeHailMary(prayer) && mod4) {
        result.block = {
          type: 'meditation',
          decade: prayer.decade,
          hailMaryNumber: prayer.hailMaryNumber,
          body: mod4.getMethod4Meditation(mysterySet, prayer.decade, prayer.hailMaryNumber),
        };
      } else if (prayer.type === 'glory_be' && prayer.decade) {
        result.block = { type: 'petition', decade: prayer.decade, body: getPetition(mysterySet, prayer.decade) };
      }
      break;
    }

    case 'montfort-5': {
      const mod5 = methodContentModules['montfort-5'];
      if (prayer.type === 'mystery_announcement' && mod5) {
        result.block = {
          type: 'decadeSubject',
          decade: prayer.decade,
          body: mod5.getMethod5DecadeSubject(mysterySet, prayer.decade),
        };
      } else if (isDecadeHailMary(prayer) && mod5) {
        result.block = {
          type: 'motive',
          decade: prayer.decade,
          hailMaryNumber: prayer.hailMaryNumber,
          body: mod5.getMethod5Motive(mysterySet, prayer.decade, prayer.hailMaryNumber),
        };
      }
      break;
    }

    default:
      break;
  }

  return result;
};

// Label key (into the montfort UI strings) for each block type.
export const BLOCK_LABEL_KEY = {
  offering: 'offering',
  petition: 'petition',
  meditation: 'meditation',
  motive: 'motive',
  opening: 'openingPrayer',
  decadeSubject: 'motive',
};
