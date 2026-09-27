import { TRANSLATIONS } from './Translations';

// Get translated mysteries based on language
const _mysteriesCache = new Map();

export const getTranslatedMysteries = (language) => {
  if (_mysteriesCache.has(language)) return _mysteriesCache.get(language);
  const uiText = TRANSLATIONS[language]?.ui || TRANSLATIONS['en'].ui;
  
  // Default English mysteries data
  const defaultMysteries = {
    joyful: {
      decades: [
        "The Annunciation",
        "The Visitation",
        "The Nativity",
        "The Presentation in the Temple",
        "The Finding in the Temple"
      ],
      biblicalTexts: [
        {
          verse: "Luke 1:26-28",
          text: "In the sixth month the angel Gabriel was sent by God to a town in Galilee called Nazareth, to a virgin engaged to a man whose name was Joseph, of the house of David. The virgin's name was Mary. And he came to her and said, 'Greetings, favored one! The Lord is with you.'",
          meditation: "In this mystery, we contemplate Mary's humility and trust in God's plan, as she accepts her role in salvation history."
        },
        {
          verse: "Luke 1:39-42",
          text: "In those days Mary set out and went with haste to a Judean town in the hill country, where she entered the house of Zechariah and greeted Elizabeth. When Elizabeth heard Mary's greeting, the child leaped in her womb. And Elizabeth was filled with the Holy Spirit and exclaimed with a loud cry, 'Blessed are you among women, and blessed is the fruit of your womb.'",
          meditation: "Mary's visit to Elizabeth shows us the joy of charity and service to others, carrying Christ within us to share with the world."
        },
        {
          verse: "Luke 2:6-7",
          text: "While they were there, the time came for her to deliver her child. And she gave birth to her firstborn son and wrapped him in bands of cloth, and laid him in a manger, because there was no place for them in the inn.",
          meditation: "In the humility of the stable, God enters our world. This mystery reminds us that Christ comes to dwell with the poor and lowly."
        },
        {
          verse: "Luke 2:22-23",
          text: "When the time came for their purification according to the law of Moses, they brought him up to Jerusalem to present him to the Lord (as it is written in the law of the Lord, 'Every firstborn male shall be designated as holy to the Lord').",
          meditation: "Mary and Joseph's obedience to the Law shows us the importance of offering our lives to God and living according to His will."
        },
        {
          verse: "Luke 2:46-48",
          text: "After three days they found him in the temple, sitting among the teachers, listening to them and asking them questions. And all who heard him were amazed at his understanding and his answers. When his parents saw him they were astonished; and his mother said to him, 'Child, why have you treated us like this? Look, your father and I have been searching for you in great anxiety.'",
          meditation: "Jesus in the temple reveals His divine mission. This mystery teaches us to seek Christ in prayer and Scripture, even when He seems distant."
        }
      ]
    },
    sorrowful: {
      decades: [
        "The Agony in the Garden",
        "The Scourging at the Pillar",
        "The Crowning with Thorns",
        "The Carrying of the Cross",
        "The Crucifixion"
      ],
      biblicalTexts: [
        {
          verse: "Luke 22:41-44",
          text: "Then he withdrew from them about a stone's throw, knelt down, and prayed, 'Father, if you are willing, remove this cup from me; yet, not my will but yours be done.' Then an angel from heaven appeared to him and gave him strength. In his anguish he prayed more earnestly, and his sweat became like great drops of blood falling down on the ground.",
          meditation: "In the garden, Jesus shows us perfect submission to God's will despite great suffering. We learn to unite our sufferings with His."
        },
        {
          verse: "John 19:1",
          text: "Then Pilate took Jesus and had him flogged.",
          meditation: "The scourging reveals the depth of Christ's love for us, willingly enduring brutal torture for our sins. Each stripe He bore was for our healing."
        },
        {
          verse: "Matthew 27:27-29",
          text: "Then the soldiers of the governor took Jesus into the governor's headquarters, and they gathered the whole cohort around him. They stripped him and put a scarlet robe on him, and after twisting some thorns into a crown, they put it on his head. They put a reed in his right hand and knelt before him and mocked him, saying, 'Hail, King of the Jews!'",
          meditation: "The crown of thorns mocks Christ's kingship, yet reveals the true nature of His reign - one of humility and suffering love."
        },
        {
          verse: "John 19:17",
          text: "And carrying the cross by himself, he went out to what is called The Place of the Skull, which in Hebrew is called Golgotha.",
          meditation: "Jesus carries the cross that should be ours, teaching us to embrace our own crosses with patience and trust in God's plan."
        },
        {
          verse: "Luke 23:33-34, 46",
          text: "When they came to the place that is called The Skull, they crucified Jesus there with the criminals, one on his right and one on his left. Then Jesus said, 'Father, forgive them; for they do not know what they are doing.' Then Jesus, crying with a loud voice, said, 'Father, into your hands I commend my spirit.' Having said this, he breathed his last.",
          meditation: "On the cross, Christ completes His sacrifice for our salvation. His words of forgiveness and surrender teach us the ultimate act of love."
        }
      ]
    },
    glorious: {
      decades: [
        "The Resurrection",
        "The Ascension",
        "The Descent of the Holy Spirit",
        "The Assumption of Mary",
        "The Coronation of Mary"
      ],
      biblicalTexts: [
        {
          verse: "Matthew 28:5-6",
          text: "But the angel said to the women, 'Do not be afraid; I know that you are looking for Jesus who was crucified. He is not here; for he has been raised, as he said. Come, see the place where he lay.'",
          meditation: "Christ's resurrection is the foundation of our faith and the promise of our own resurrection. Death has been conquered, and eternal life is ours."
        },
        {
          verse: "Acts 1:9-11",
          text: "When he had said this, as they were watching, he was lifted up, and a cloud took him out of their sight. While he was going and they were gazing up toward heaven, suddenly two men in white robes stood by them. They said, 'Men of Galilee, why do you stand looking up toward heaven? This Jesus, who has been taken up from you into heaven, will come in the same way as you saw him go into heaven.'",
          meditation: "Christ ascends to prepare a place for us in heaven. He opens the gates of paradise and invites us to follow Him home."
        },
        {
          verse: "Acts 2:1-4",
          text: "When the day of Pentecost had come, they were all together in one place. And suddenly from heaven there came a sound like the rush of a violent wind, and it filled the entire house where they were sitting. Divided tongues, as of fire, appeared among them, and a tongue rested on each of them. All of them were filled with the Holy Spirit and began to speak in other languages, as the Spirit gave them ability.",
          meditation: "The Holy Spirit transforms the fearful apostles into bold witnesses. We receive the same Spirit to guide and strengthen us in our faith."
        },
        {
          verse: "Revelation 12:1",
          text: "A great portent appeared in heaven: a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars.",
          meditation: "Mary is assumed body and soul into heaven, a sign of the glory that awaits all who remain faithful to Christ."
        },
        {
          verse: "Revelation 12:1",
          text: "A great portent appeared in heaven: a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars.",
          meditation: "Mary is crowned Queen of Heaven and Earth. As our mother, she intercedes for us and leads us closer to her Son."
        }
      ]
    },
    luminous: {
      decades: [
        "The Baptism of Jesus",
        "The Wedding at Cana",
        "The Proclamation of the Kingdom",
        "The Transfiguration",
        "The Institution of the Eucharist"
      ],
      biblicalTexts: [
        {
          verse: "Matthew 3:16-17",
          text: "And when Jesus had been baptized, just as he came up from the water, suddenly the heavens were opened to him and he saw the Spirit of God descending like a dove and alighting on him. And a voice from heaven said, 'This is my Son, the Beloved, with whom I am well pleased.'",
          meditation: "At His baptism, Jesus begins His public ministry and the Father reveals Him as His beloved Son. We are reminded of our own baptism and call to discipleship."
        },
        {
          verse: "John 2:3-5",
          text: "When the wine gave out, the mother of Jesus said to him, 'They have no wine.' And Jesus said to her, 'Woman, what concern is that to you and to me? My hour has not yet come.' His mother said to the servants, 'Do whatever he tells you.'",
          meditation: "At Cana, Jesus performs His first miracle through Mary's intercession. This shows us Mary's role in leading us to Christ and the power of faith."
        },
        {
          verse: "Mark 1:14-15",
          text: "Now after John was arrested, Jesus came to Galilee, proclaiming the good news of God, and saying, 'The time is fulfilled, and the kingdom of God has come near; repent, and believe in the good news.'",
          meditation: "Jesus proclaims the Kingdom of God and calls us to conversion. We are invited to repent and believe in the Gospel."
        },
        {
          verse: "Matthew 17:1-2, 5",
          text: "Six days later, Jesus took with him Peter and James and his brother John and led them up a high mountain, by themselves. And he was transfigured before them, and his face shone like the sun, and his clothes became dazzling white. Then from the cloud came a voice that said, 'This is my Son, the Beloved; with him I am well pleased; listen to him!'",
          meditation: "On Mount Tabor, Jesus reveals His divine glory to strengthen the apostles for the passion to come. We are called to listen to Him and follow faithfully."
        },
        {
          verse: "Matthew 26:26-28",
          text: "While they were eating, Jesus took a loaf of bread, and after blessing it he broke it, gave it to the disciples, and said, 'Take, eat; this is my body.' Then he took a cup, and after giving thanks he gave it to them, saying, 'Drink from it, all of you; for this is my blood of the covenant, which is poured out for many for the forgiveness of sins.'",
          meditation: "In the Eucharist, Jesus gives us Himself completely. This mystery deepens our appreciation for the Mass and our desire for union with Christ."
        }
      ]
    }
  };
  
  // Try to get language-specific mysteries, fall back to English if not available
  const languageMysteries = TRANSLATIONS[language]?.mysteries || defaultMysteries;
  
  const result = {
    joyful: {
      name: uiText.TheJoyfulMysteries,
      color: "blue",
      days: [uiText.Monday, uiText.Saturday],
      decades: languageMysteries.joyful?.decades || defaultMysteries.joyful.decades,
      biblicalTexts: languageMysteries.joyful?.biblicalTexts || defaultMysteries.joyful.biblicalTexts
    },
    sorrowful: {
      name: uiText.TheSorrowfulMysteries,
      color: "purple",
      days: [uiText.Tuesday, uiText.Friday],
      decades: languageMysteries.sorrowful?.decades || defaultMysteries.sorrowful.decades,
      biblicalTexts: languageMysteries.sorrowful?.biblicalTexts || defaultMysteries.sorrowful.biblicalTexts
    },
    glorious: {
      name: uiText.TheGloriousMysteries,
      color: "gold",
      days: [uiText.Wednesday, uiText.Sunday],
      decades: languageMysteries.glorious?.decades || defaultMysteries.glorious.decades,
      biblicalTexts: languageMysteries.glorious?.biblicalTexts || defaultMysteries.glorious.biblicalTexts
    },
    luminous: {
      name: uiText.TheLuminousMysteries,
      color: "white",
      days: [uiText.Thursday],
      decades: languageMysteries.luminous?.decades || defaultMysteries.luminous.decades,
      biblicalTexts: languageMysteries.luminous?.biblicalTexts || defaultMysteries.luminous.biblicalTexts
    }
  };
  _mysteriesCache.set(language, result);
  return result;
};

// Keep the original MYSTERIES for backwards compatibility (English only)
export const MYSTERIES = getTranslatedMysteries('en');

// Mystery set abbreviations used in URL hash identifiers
export const MYSTERY_SET_PREFIX = { joyful: 'J', luminous: 'L', sorrowful: 'S', glorious: 'G' };
const PREFIX_TO_SET = { J: 'joyful', L: 'luminous', S: 'sorrowful', G: 'glorious' };

// Convert an internal prayer id to its URL form.
// Decade ids use a set-agnostic "D" prefix internally (e.g. D1-HM05);
// this replaces it with the active mystery set letter (e.g. J1-HM05).
// Opening/closing ids have no set prefix and are returned unchanged.
export const idToUrl = (id, mysterySet) => {
  const prefix = MYSTERY_SET_PREFIX[mysterySet];
  if (prefix && /^D\d-/.test(id)) {
    return prefix + id.slice(1);
  }
  return id;
};

// Parse a URL hash id back into { mysterySet, id }.
// Returns null for unrecognized hashes so callers can fall back gracefully.
export const parseUrlId = (urlId) => {
  if (!urlId) return null;
  const match = /^([JLSG])(\d)-(.+)$/.exec(urlId);
  if (match) {
    const set = PREFIX_TO_SET[match[1]];
    return { mysterySet: set || null, id: 'D' + match[2] + '-' + match[3] };
  }
  if (/^(OPEN|CLOSE)-/.test(urlId)) {
    return { mysterySet: null, id: urlId };
  }
  return null;
};

// This function generates the prayer sequence dynamically based on the selected language.
// Each prayer carries a permanent, language-independent `id` used for URL synchronization.
export const generatePrayerSequence = (prayerLang, uiLang) => {
  const PRAYERS = TRANSLATIONS[prayerLang]?.prayers || TRANSLATIONS['en'].prayers;
  const UI = TRANSLATIONS[uiLang]?.ui || TRANSLATIONS['en'].ui;

  return [
    // Opening prayers
    { id: 'OPEN-SIGN', type: 'sign_of_cross', text: PRAYERS.sign_of_cross, label: UI.signOfCross },
    { id: 'OPEN-CREED', type: 'apostles_creed', text: PRAYERS.apostles_creed, label: UI.apostlesCreed },
    { id: 'OPEN-OF', type: 'our_father', text: PRAYERS.our_father, label: UI.ourFather },
    { id: 'OPEN-HM01', type: 'hail_mary', text: PRAYERS.hail_mary, label: `${UI.hailMary} 1`, hailMaryNumber: 1, isIntroductory: true },
    { id: 'OPEN-HM02', type: 'hail_mary', text: PRAYERS.hail_mary, label: `${UI.hailMary} 2`, hailMaryNumber: 2, isIntroductory: true },
    { id: 'OPEN-HM03', type: 'hail_mary', text: PRAYERS.hail_mary, label: `${UI.hailMary} 3`, hailMaryNumber: 3, isIntroductory: true },
    { id: 'OPEN-GB', type: 'glory_be', text: PRAYERS.glory_be, label: UI.gloryBe },

    // Five Decades — internal ids use D<decade> prefix, resolved to set letter via idToUrl
    ...Array.from({ length: 5 }, (_, decadeIndex) => {
      const decade = decadeIndex + 1;
      return [
        {
          id: `D${decade}-ANN`,
          type: 'mystery_announcement',
          label: `${decade}. ${UI.mysteryAnnouncement}`,
          decade: decade
        },
        {
          id: `D${decade}-OF`,
          type: 'our_father',
          text: PRAYERS.our_father,
          label: UI.ourFather,
          decade: decade
        },
        // Individual 10 Hail Marys
        ...Array.from({ length: 10 }, (_, hailMaryIndex) => ({
          id: `D${decade}-HM${String(hailMaryIndex + 1).padStart(2, '0')}`,
          type: 'hail_mary',
          text: PRAYERS.hail_mary,
          label: `${UI.hailMary} ${hailMaryIndex + 1}`,
          decade: decade,
          hailMaryNumber: hailMaryIndex + 1
        })),
        {
          id: `D${decade}-GB`,
          type: 'glory_be',
          text: PRAYERS.glory_be,
          label: UI.gloryBe,
          decade: decade
        },
        {
          id: `D${decade}-FP`,
          type: 'fatima_prayer',
          text: PRAYERS.fatima_prayer,
          label: UI.fatimaPrayer,
          decade: decade
        }
      ];
    }).flat(),

    // Closing prayers
    { id: 'CLOSE-HOLY-QUEEN', type: 'hail_holy_queen', text: PRAYERS.hail_holy_queen, label: UI.hailHolyQueen },
    { id: 'CLOSE-FINAL', type: 'final_prayer', text: PRAYERS.final_prayer, label: UI.finalPrayer }
  ];
}


export const getMysteryForDay = () => {
  const today = new Date().getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = dayNames[today];
  
  const mysteries = getTranslatedMysteries('en'); // Use English for day matching
  
  for (const [mysteryKey, mystery] of Object.entries(mysteries)) {
    if (mystery.days.some(day => day.includes(currentDay) || currentDay.includes(day))) {
      return mysteryKey;
    }
  }
  return 'joyful';
};