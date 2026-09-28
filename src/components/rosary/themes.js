// Accent color themes, shared by SettingsMenu (to render the picker) and
// Rosary.jsx (to resolve the current accent color). Kept in its own file so
// Rosary.jsx doesn't have to statically import from SettingsMenu.jsx — that
// static import was defeating SettingsMenu's lazy() code-splitting, since a
// module that's both statically and dynamically imported can't be moved into
// its own chunk.
export const ACCENT_THEMES = [
  { id: 'blue',        label: 'Blue',        color: '#3b82f6' },
  { id: 'gold',        label: 'Gold',        color: '#d97706' },
  { id: 'rose',        label: 'Rose',        color: '#db2777' },
  { id: 'green',       label: 'Green',       color: '#16a34a' },
  { id: 'red',         label: 'Red',         color: '#dc2626' },
  { id: 'hc-white',    label: 'White/Black', color: '#000000', darkColor: '#ffffff', highContrast: true, splitSwatch: true },
  { id: 'hc-yellow',   label: 'Yellow',      color: '#facc15', highContrast: true },
  { id: 'hc-cyan',     label: 'Cyan',        color: '#22d3ee', highContrast: true },
  { id: 'hc-lime',     label: 'Lime',        color: '#a3e635', highContrast: true },
];
