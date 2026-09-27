// St. Louis de Montfort — Second Method content.
// A short phrase relating to the mystery is inserted into each Hail Mary
// immediately after the name of Jesus. The base Hail Mary text is never
// permanently modified; the phrase is applied only for display.

// Each phrase is a short clause that reads naturally after "Jesus, ".
export const METHOD2_PHRASES = {
  joyful: [
    "incarnate in thy womb by the Holy Spirit",
    "whom Saint Elizabeth called blessed among women",
    "born for us in a stable at Bethlehem",
    "presented in the temple by thy hands",
    "found again among the doctors in the temple",
  ],
  sorrowful: [
    "in agony and sweating blood for us in the garden",
    "cruelly scourged for our sins",
    "crowned with thorns in mockery of His kingship",
    "carrying His Cross to Calvary",
    "crucified and dying for our salvation",
  ],
  glorious: [
    "risen in glory from the dead",
    "ascended into heaven and seated at the right hand of the Father",
    "who sends the Holy Spirit upon the Church",
    "who crowns thee Queen of Heaven",
    "who keeps thee eternally as our Mother and Queen",
  ],
  luminous: [
    "baptized in the Jordan and revealed as the Father's beloved Son",
    "who worked His first sign at Cana through thy intercession",
    "preaching the kingdom of God and calling us to conversion",
    "transfigured in glory upon the holy mountain",
    "who gives Himself to us as the living bread of life",
  ],
};

export const getMysteryPhrase = (mysterySet, decade) => {
  const list = METHOD2_PHRASES[mysterySet];
  return list && decade ? list[decade - 1] : null;
};

// Insert the phrase into a Hail Mary text after the name "Jesus"
// (English text). Returns the original text if insertion is not possible.
export const insertPhraseIntoHailMary = (hailMaryText, phrase) => {
  if (!phrase) return hailMaryText;
  // The English Hail Mary reads "...the fruit of thy womb, Jesus. Holy Mary..."
  const marker = ", Jesus.";
  const idx = hailMaryText.indexOf(marker);
  if (idx === -1) return hailMaryText;
  // Rebuild: "...thy womb, Jesus, {phrase}. Holy Mary..." (single period).
  return (
    hailMaryText.slice(0, idx + marker.length - 1) +
    ", " +
    phrase +
    "." +
    hailMaryText.slice(idx + marker.length)
  );
};
