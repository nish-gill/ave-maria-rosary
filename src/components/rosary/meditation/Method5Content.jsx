// St. Louis de Montfort — Fifth Method content.
// Based on Montfort's "150 Motives for Praying the Rosary" (and extended
// for the Luminous Mysteries). The subject of meditation is the Rosary
// itself; one motive is synchronized with each Hail Mary of the mysteries.
//
// Traditional 15 decades (joyful, sorrowful, glorious) -> 150 motives.
// Luminous 5 decades -> 50 additional motives in the same spirit.

// A one-line subject for each decade, shown on the mystery announcement.
export const METHOD5_DECADE_SUBJECTS = {
  joyful: [
    "What the Rosary is, and how it is composed.",
    "The excellence of the Rosary among prayers.",
    "The power of the Rosary against sin and the devil.",
    "The origin of the Rosary through Saint Dominic.",
    "The Blessed Virgin and her love for the Rosary.",
  ],
  sorrowful: [
    "The prayers of the Rosary and their worth.",
    "The mysteries of the Rosary as the life of Christ.",
    "The spiritual benefits obtained by the Rosary.",
    "How to pray the Rosary well and with fruit.",
    "Objections answered, and perseverance in the Rosary.",
  ],
  glorious: [
    "The Rosary and the hope of eternal life.",
    "The Confraternities of the Rosary and their privileges.",
    "Miracles obtained through the holy Rosary.",
    "The Rosary as a sure path of Christian perfection.",
    "Final motives; Mary crowns those who are faithful to her Rosary.",
  ],
  luminous: [
    "The Rosary and the public life of Christ among us.",
    "The Rosary and the sacraments of the Church.",
    "The Rosary as a call to continual conversion.",
    "The Rosary as a school of contemplation.",
    "The Rosary and the mystery of the Eucharist.",
  ],
};

// 150 motives for the traditional mysteries, ordered so that
// motive index = (setOffset[set] + (decade-1)) * 10 + (hailMaryNumber-1),
// where setOffset: joyful=0, sorrowful=5, glorious=10.
export const METHOD5_MOTIVES = [
  // ===== Joyful =====
  // Decade 1 — What the Rosary is (1-10)
  "The Rosary is a heavenly wreath of roses woven by the prayers of the Angel, the Our Father, and the Hail Mary.",
  "It is made up of the best and most excellent of all prayers.",
  "The Rosary is a compendium of the Gospel and of the whole life of Jesus Christ.",
  "It is at once vocal and mental prayer, a prayer of the lips and of the heart.",
  "In it the great mysteries of our redemption are proposed to our contemplation.",
  "It unites the prayer of the Angels (the Hail Mary) with the prayer of the Apostles (the Our Father).",
  "It is simple enough for the simplest soul and profound enough for the greatest contemplative.",
  "It may be prayed anywhere, at any time, by persons of every state of life.",
  "It is a prayer that grows with the soul; it is never exhausted.",
  "To pray the Rosary is to walk with Mary through the life of her Son.",

  // Decade 2 — Excellence (11-20)
  "The Rosary is the most excellent of all prayers after the Mass.",
  "It has the excellence of being composed of prayers taught us from heaven.",
  "The Our Father was taught by the Son of God Himself; it is the perfect prayer.",
  "The Hail Mary was begun by the Angel and Saint Elizabeth and completed by the Church.",
  "The mysteries contemplate the highest truths: the Incarnation, the Passion, the glory of Christ.",
  "The Rosary gives more glory to God than any other private devotion.",
  "It draws down greater graces upon the soul than any other vocal prayer.",
  "It is a remedy against sin, a light in darkness, and a comfort in sorrow.",
  "The saints have prized it above all devotions as a sure path to perfection.",
  "To honor Mary by the Rosary is to honor Jesus through His Mother.",

  // Decade 3 — Power against sin (21-30)
  "The Rosary is a powerful weapon against the devil, who trembles at the name of Mary.",
  "It has power to break the chains of sin and to deliver souls from evil habits.",
  "Saint Dominic by it converted the hardened Albigensians when all else had failed.",
  "It has rescued many a sinner whom no preaching could move.",
  "By it the fallen rise again, and the lukewarm are set on fire with the love of God.",
  "It is a shield against the temptations of the world, the flesh, and the devil.",
  "It obtains the grace of final perseverance, the greatest of all graces.",
  "The devout praying of it is a sign of predestination, according to many saints.",
  "It secures the protection of Mary at the hour of death.",
  "It is the chain with which the powers of hell are bound.",

  // Decade 4 — Origin through Saint Dominic (31-40)
  "The Rosary was given to Saint Dominic by the Blessed Virgin as a remedy for the sins of his age.",
  "Dominic preached it with such fruit that a hundred thousand souls were converted.",
  "He carried it always as his shield and his sword against the errors of his time.",
  "The Blessed Virgin appeared to him and bade him preach her Psalter.",
  "Through this devotion the face of the Church was renewed in his day.",
  "The Rosary is therefore called the Psalter of Jesus and Mary.",
  "Saint Dominic's Order became the great promoter of the Rosary throughout the world.",
  "Many popes have confirmed its origin and enriched it with indulgences.",
  "The Rosary has been the strength of the Church in every age of trial.",
  "To pray it is to enter into the apostolic spirit of Saint Dominic.",

  // Decade 5 — Mary and the Rosary (41-50)
  "The Blessed Virgin loves the Rosary as the prayer that honors her Son through her.",
  "She has shown herself again and again as Our Lady of the Rosary.",
  "At Lourdes she appeared with the Rosary in her hands, and at Fatima she asked for it daily.",
  "She has promised her special protection and the greatest graces to those who pray it.",
  "The Rosary is the chain of love that binds the soul to Mary.",
  "She who prays the Rosary gives Mary a crown of roses, one rose for each Hail Mary.",
  "Mary intercedes for all who are devoted to her Psalter, obtaining their requests.",
  "She presents these roses to her Son, and He grants the graces they ask.",
  "The Rosary is therefore both a prayer and a gift, a crown we weave for Mary.",
  "He who serves Mary by the Rosary will never be forsaken by her.",

  // ===== Sorrowful =====
  // Decade 6 — The prayers of the Rosary (51-60)
  "The Our Father is the perfect prayer, taught by Christ, containing all that we may ask.",
  "In it we call God our Father, and we claim the dignity of His children.",
  "We ask that His name be hallowed, His kingdom come, His will be done.",
  "We ask for our daily bread, for forgiveness, and for deliverance from evil.",
  "The Hail Mary is the greeting of the Angel and the cry of the Church.",
  "In it we praise Mary as full of grace and blessed among women.",
  "We bless the fruit of her womb, Jesus, the very center of the Rosary.",
  "We ask her to pray for us now and at the hour of our death.",
  "The Glory Be gives all honor to the Trinity through whom the Rosary is prayed.",
  "These prayers, often repeated, sink deep into the heart and transform it.",

  // Decade 7 — The mysteries (61-70)
  "The joyful mysteries show us the humility, charity, and obedience of Christ made flesh.",
  "The sorrowful mysteries teach us the depth of His love in suffering.",
  "The glorious mysteries lift our hope to the triumph of the resurrection.",
  "The luminous mysteries reveal His public life and His gifts to the Church.",
  "By meditating on them, we contemplate Christ with the eyes of Mary.",
  "We learn to imitate what they contain and to obtain what they promise.",
  "Each mystery is a school in which we are formed after the likeness of Christ.",
  "The Rosary makes the life of Jesus pass before our eyes, decade by decade.",
  "To pray it without the mysteries is to pray without its heart.",
  "The more we ponder the mysteries, the more we are conformed to Christ.",

  // Decade 8 — Spiritual benefits (71-80)
  "The Rosary obtains the grace to know ourselves and to sorrow for our sins.",
  "It gives a lively faith, which Montfort calls the root of all holiness.",
  "It increases hope by setting our eyes on the promises of Christ.",
  "It enkindles charity by filling us with the love of God and of Mary.",
  "It disposes us to receive the gifts and fruits of the Holy Spirit.",
  "It strengthens us to bear our crosses patiently after the example of Jesus.",
  "It detaches us from worldly pleasures and fixes our heart on heaven.",
  "It obtains the grace of a holy and peaceful death under the gaze of Mary.",
  "It draws souls out of purgatory by the suffrages of the Church.",
  "It leads at last to the eternal vision of God, the crown of all devotion.",

  // Decade 9 — How to pray well (81-90)
  "Pray the Rosary with attention, not as a duty merely to be finished.",
  "Pray it with reverence, as if Mary herself were present.",
  "Pray it slowly, letting each word sink into the heart.",
  "Pray it with contrition, mindful of our sins and God's mercy.",
  "Pray it with the mysteries, picturing each scene as you recite the decade.",
  "Pray it with perseverance, never abandoning the daily beads.",
  "Pray it in a spirit of humility, as the least of God's servants.",
  "Pray it with the desire to amend your life and to grow in virtue.",
  "Pray it in union with the intentions of the Church and of Mary.",
  "He who prays it thus will gather fruit beyond all reckoning.",

  // Decade 10 — Objections and perseverance (91-100)
  "Some say the Rosary is monotonous; but repetition is the language of love.",
  "Some say they have no time; but a chaplet takes but a quarter of an hour.",
  "Some say they cannot keep attention; but God rewards the will that tries.",
  "Some say it is a prayer for the unlearned; but the greatest saints have loved it.",
  "Some fear distraction; the very effort to return is itself a prayer.",
  "Do not measure the Rosary by feeling, but by fidelity.",
  "Do not leave it off when it seems dry; that is the hour of pure faith.",
  "Renew your resolution often, lest the habit be lost by degrees.",
  "Let no day pass without your beads, as Saint Louis de Montfort urges.",
  "Perseverance in the Rosary is the mark of true devotion to Mary.",

  // ===== Glorious =====
  // Decade 11 — Rosary and eternal life (101-110)
  "The Rosary lifts our hearts from earth to heaven, where Christ is already glorified.",
  "It makes us pilgrims who walk by faith toward the heavenly homeland.",
  "It plants in us the hope of sharing in Christ's own resurrection.",
  "It disposes us to desire the vision of God above all created goods.",
  "It obtains the grace to die in the love of God and under Mary's mantle.",
  "It shortens the pains of purgatory by the merits of Christ applied through Mary.",
  "It opens the gates of paradise to those who have served Mary on earth.",
  "It is the password by which Mary's children enter into her Son's kingdom.",
  "It prepares us to hear: Well done, good and faithful servant, enter into the joy of thy Lord.",
  "The faithful servant of the Rosary shall wear a crown of glory that fades not.",

  // Decade 12 — Confraternities (111-120)
  "The Confraternity of the Rosary unites the faithful in a holy fellowship of prayer.",
  "Its members share in the merits of all the Rosaries prayed throughout the world.",
  "Many popes have enriched it with indulgences and spiritual privileges.",
  "The saints and the faithful departed share in its suffrages by the bond of charity.",
  "To enroll is to place oneself under a regiment of prayer that never sleeps.",
  "The confraternity obtains the assistance of Mary and of the whole heavenly court.",
  "It strengthens the weak by the prayers of the many, and sustains the dying.",
  "It is a family under the motherhood of Mary, bound by the beads.",
  "No member is forgotten: the Rosary is prayed for the absent and the dead.",
  "The confraternity is a school of charity that leads to the perfection of love.",

  // Decade 13 — Miracles (121-130)
  "History records countless miracles obtained through the devout praying of the Rosary.",
  "Saint Dominic raised the dead and healed the sick by its power.",
  "Battles and plagues have been turned back by its public recitation.",
  "Sinners beyond hope have been converted by its faithful practice.",
  "Cities devoted to it have been preserved from disaster and heresy.",
  "Souls in distress have found peace at the very moment they took up the beads.",
  "The Rosary has obtained what no other prayer could obtain in numberless cases.",
  "These wonders are not the end, but the sign of Mary's maternal power.",
  "God works them through Mary to show that the Rosary is His chosen channel of grace.",
  "Trust, then, in the Rosary; Mary obtains what she wills for her servants.",

  // Decade 14 — A path of perfection (131-140)
  "The Rosary is a short and easy way to the heights of Christian perfection.",
  "It unites us to Christ through Mary, the surest of all ways.",
  "It teaches humility by placing us at the feet of the handmaid of the Lord.",
  "It teaches purity by contemplating the Virgin Mother and her Son.",
  "It teaches poverty of spirit by the mysteries of the stable and the cross.",
  "It teaches obedience by the fiat of Mary and the obedience of Christ.",
  "It teaches patience and love of the cross by the sorrowful mysteries.",
  "It enkindles zeal for souls by the mysteries of the kingdom and the Spirit.",
  "It perfects all the virtues by setting the mysteries of Christ before us.",
  "He who perseveres in the Rosary is led, almost without knowing it, to sanctity.",

  // Decade 15 — Final motives (141-150)
  "What greater grace than to be enrolled among the servants of Mary?",
  "What greater joy than to wear her beads as the livery of her Son?",
  "What greater confidence than to know Mary prays for us at every hour?",
  "What greater pledge of salvation than perseverance in her Psalter?",
  "What greater crown than the one Mary places upon her faithful servants?",
  "The Rosary is therefore the mark, the comfort, and the hope of the predestined.",
  "Let us resolve never to lay aside so great a treasure.",
  "Let us spread it by word and example, that others may share its grace.",
  "Let us pray it for the living and the dead, that none may be lost.",
  "And at last Mary, our Queen, will present us to her Son forever.",

  // ===== Luminous ===== (151-200)
  // Decade 16 — Public life (151-160)
  "The Luminous Mysteries reveal Christ walking among us as the light of the world.",
  "In His baptism He sanctifies the waters and is revealed as the Father's beloved Son.",
  "At Cana He begins His signs by the word of His Mother.",
  "He proclaims the kingdom, calling sinners to repentance and faith.",
  "He heals the sick and gives sight to the blind, the dawn of the new creation.",
  "He calls disciples to be with Him and to be sent forth in His name.",
  "He teaches with authority, unfolding the wisdom of the Father.",
  "He reveals the Father's mercy in every parable and every miracle.",
  "The Rosary thus follows Him from the Jordan to the gates of Jerusalem.",
  "We walk with Him as His disciples, learning from His words and His deeds.",

  // Decade 17 — Sacraments (161-170)
  "The mysteries of light point to the sacraments, the channels of Christ's grace.",
  "His baptism opens the way to our own, by which we are born again of water and the Spirit.",
  "At Cana He foreshadows the wine changed into His blood, the sacrament of the altar.",
  "His proclamation of the kingdom is inseparable from the sacrament of reconciliation.",
  "The preaching of the Gospel sends souls to the waters that wash and the oil that heals.",
  "In the Transfiguration He reveals the glory that the sacraments already begin in us.",
  "The sacraments are the prolongation of His incarnate presence among His people.",
  "The Rosary disposes us to receive them with faith and with fruit.",
  "He who prays it devoutly is prepared to meet Christ in every sacrament.",
  "Through the Rosary we learn to see the sacraments as Mary sees them, with faith.",

  // Decade 18 — Conversion (171-180)
  "The kingdom of God is at hand: the Rosary is a continual call to conversion.",
  "Each decade renews the cry, Repent and believe the Gospel.",
  "It reveals our sins in the light of Christ and moves us to sorrow.",
  "It obtains the grace to leave our old ways and to follow Him.",
  "It strengthens us against relapse by the steady return of prayer.",
  "It teaches that conversion is not once only, but the work of a lifetime.",
  "It makes us gentle with the conversion of others, as Mary is gentle with us.",
  "It shows that no sinner is beyond the reach of Christ's mercy.",
  "It makes of our very falls a reason to rise and to begin again.",
  "He who prays the Rosary will not despair, for Mary always leads back to her Son.",

  // Decade 19 — Contemplation (181-190)
  "The Rosary is a school of contemplation open to all the faithful.",
  "By meditating on the mysteries we learn to gaze upon Christ with love.",
  "The repeated Hail Marys become the rhythm of the heart resting in God.",
  "As a mother soothes her child with a lullaby, so Mary calms the soul by her beads.",
  "In time the lips fall silent and the heart continues the prayer within.",
  "The mysteries, often pondered, yield ever new light to the contemplative soul.",
  "Mary, who kept all these words in her heart, teaches us this interior prayer.",
  "The Rosary is thus a ladder by which we mount from vocal prayer to the prayer of the heart.",
  "It leads at last to that stillness where the soul simply adores.",
  "Blessed are those who, by persevering in the beads, are led into this interior peace.",

  // Decade 20 — Eucharist (191-200)
  "The Institution of the Eucharist is the crown of the mysteries of light.",
  "Christ gives His body and blood as the memorial of His sacrifice.",
  "The Rosary and the Mass are the two greatest devotions of the Church.",
  "To pray the Rosary is to prepare the heart for worthy communion.",
  "Mary, who bore the bread of life, leads us to the altar of her Son.",
  "The Hail Mary disposes us to receive Him whom the Angel proclaimed to her.",
  "The mysteries end where the Mass begins: in the giving of Christ Himself.",
  "The Rosary prolongs the Mass throughout the hours of the day.",
  "He who prays the Rosary and hears the Mass has the whole of the Gospel in his hands.",
  "May Mary lead us from her beads to the banquet of her Son, now and unto life everlasting.",
];

export const getMethod5Motive = (mysterySet, decade, hailMaryNumber) => {
  const setOffset = { joyful: 0, sorrowful: 5, glorious: 10, luminous: 15 };
  const offset = setOffset[mysterySet];
  if (offset === undefined) return null;
  const idx = (offset + (decade - 1)) * 10 + (hailMaryNumber - 1);
  return METHOD5_MOTIVES[idx] || null;
};

export const getMethod5DecadeSubject = (mysterySet, decade) => {
  const list = METHOD5_DECADE_SUBJECTS[mysterySet];
  return list && decade ? list[decade - 1] : null;
};
