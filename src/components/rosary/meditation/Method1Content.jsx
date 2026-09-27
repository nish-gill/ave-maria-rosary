// St. Louis de Montfort — First Method content.
// The decade is offered in honor of the mystery, then after the decade a
// grace (petition) is asked for. The underlying prayers are unchanged.

export const METHOD1_OFFERINGS = {
  joyful: [
    "We offer this decade in honor of the Annunciation of the Angel to Mary.",
    "We offer this decade in honor of the Visitation of our Lady to Saint Elizabeth.",
    "We offer this decade in honor of the Nativity of our Lord Jesus Christ.",
    "We offer this decade in honor of the Presentation of Jesus in the Temple.",
    "We offer this decade in honor of the Finding of the Child Jesus in the Temple.",
  ],
  sorrowful: [
    "We offer this decade in honor of the Agony of Jesus in the Garden of Olives.",
    "We offer this decade in honor of the Scourging of our Lord at the pillar.",
    "We offer this decade in honor of the Crowning of Jesus with thorns.",
    "We offer this decade in honor of the Carrying of the Cross by our Lord.",
    "We offer this decade in honor of the Crucifixion and death of our Lord.",
  ],
  glorious: [
    "We offer this decade in honor of the Resurrection of our Lord Jesus Christ.",
    "We offer this decade in honor of the Ascension of Jesus into heaven.",
    "We offer this decade in honor of the Descent of the Holy Spirit upon the Apostles.",
    "We offer this decade in honor of the Assumption of the Blessed Virgin Mary.",
    "We offer this decade in honor of the Coronation of Mary as Queen of Heaven.",
  ],
  luminous: [
    "We offer this decade in honor of the Baptism of our Lord in the Jordan.",
    "We offer this decade in honor of the Wedding at Cana and Mary's intercession.",
    "We offer this decade in honor of the Proclamation of the Kingdom of God.",
    "We offer this decade in honor of the Transfiguration of our Lord.",
    "We offer this decade in honor of the Institution of the Holy Eucharist.",
  ],
};

export const METHOD1_PETITIONS = {
  joyful: [
    "Grant us, Lord, the grace of humility, to answer Thy will as Mary did.",
    "Grant us the grace of charity, that we may carry Christ to our neighbor.",
    "Grant us the grace of a spirit of poverty, to welcome Christ in the lowly.",
    "Grant us purity of heart and obedience, offering our lives to God.",
    "Grant us the grace of wisdom, to seek Jesus where He is to be found.",
  ],
  sorrowful: [
    "Grant us true sorrow for our sins and conformity to the will of the Father.",
    "Grant us the spirit of penance and the mortification of our senses.",
    "Grant us contempt for the world and patience in humiliations.",
    "Grant us patience to carry our cross after our Lord Jesus Christ.",
    "Grant us forgiveness of our enemies and final perseverance.",
  ],
  glorious: [
    "Grant us a lively faith in the risen Christ and the power of His resurrection.",
    "Grant us a firm hope in our heavenly home, prepared by Christ.",
    "Grant us the gifts of the Holy Spirit and a burning charity.",
    "Grant us a tender devotion to Mary and the grace of a happy death.",
    "Grant us final perseverance and the crown of eternal life.",
  ],
  luminous: [
    "Grant us openness to the Holy Spirit and faithfulness to our baptism.",
    "Grant us trust in Mary's intercession and obedience to Christ's word.",
    "Grant us true conversion of heart and faith in the Gospel.",
    "Grant us the grace of holiness and a desire for prayer.",
    "Grant us love of the Eucharist and intimate union with Christ.",
  ],
};

export const getOffering = (mysterySet, decade) => {
  const list = METHOD1_OFFERINGS[mysterySet];
  return list && decade ? list[decade - 1] : null;
};

export const getPetition = (mysterySet, decade) => {
  const list = METHOD1_PETITIONS[mysterySet];
  return list && decade ? list[decade - 1] : null;
};
