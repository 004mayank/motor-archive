export type PhotoFeature = {
  slug: string;
  title: string;
  deck: string;
  place: string;
  date: string;
  category: string;
  cover: string;
  images: string[];
  intro: string;
  sections: { heading: string; body: string; sourceUrl?: string }[];
};
export const features: PhotoFeature[] = [
  {
    slug: "le-mans-1966",
    title: "The longest day.",
    deck: "Le Mans. June 1966. Back to the pit wall, before the moment became a myth.",
    place: "LA SARTHE, FRANCE",
    date: "JUNE 1966",
    category: "ENDURANCE",
    cover: "/images/lemans-1966-grid.jpg",
    images: [
      "/images/lemans-1966-grid.jpg",
      "/images/lemans-1966-race.jpg",
      "/images/lemans-1966-start.jpg",
      "/images/lemans-1966-pits.jpg",
    ],
    intro:
      "Forget the polished museum floor. This is the view from the other side of the fence: crowded balconies, hand-painted signs, mechanics on the pit wall, and racing cars doing what they were made to do.",
    sections: [
      {
        heading: "24 hours. One obsession.",
        sourceUrl:
          "https://www.24h-lemans.com/en/news/24-hours-of-le-mans-1966-chris-amon-ford-looks-back-at-his-win-1-2-40897",
        body: "On 19 June 1966, Bruce McLaren and Chris Amon took Ford’s first victory at the 24 Hours of Le Mans. Their GT40 Mk II headed a Ford sweep: Ken Miles and Denny Hulme finished second, with Ronnie Bucknum and Dick Hutcherson third. The race organizer’s historical account records the cars as numbers 2, 1 and 5.\n\nThe finishing order became the headline. These photographs let us look away from the podium for a moment: at the working pit wall, at the spectators, at the ordinary details surrounding an extraordinary result.",
      },
      {
        heading: "History, at eye level.",
        body: "These photographs were taken at the 1966 24 Hours of Le Mans and are credited to ZANTAFIO56. They place us among the spectators rather than above them. The pit buildings are packed; the foreground sometimes belongs to the back of someone’s head. That imperfect point of view is part of the record.\n\nLook beyond the cars. The lettering, the people on the balconies and the narrow strip separating the crowd from the circuit all belong to the same moment. A period photograph keeps those details together.",
      },
      {
        heading: "Keep the blur.",
        body: "One frame catches a dark blue car passing the pits, its number visible while the scene around it softens into motion. A modern photograph might offer more precision. This one preserves the sensation of trying to follow something moving fast.\n\nWe have kept the original colors. The photographs are resized and cropped for these layouts, with links to their source records and Creative Commons licenses. They are period images, not modern recreations or generated scenes.",
      },
      {
        heading: "A photograph is a starting line.",
        body: "This is a photographic essay, not a complete race report. Results, lap times and driver attribution need their own supporting records; we do not infer them from an image alone. Here the subject is the experience preserved by the photographer: the crowds, the working pit lane and the cars passing through the frame.",
      },
    ],
  },
  {
    slug: "rally-without-barriers",
    title: "Into the dust.",
    deck: "Australia, 1975. A Stratos, a dirt road, and a crowd close enough to feel it.",
    place: "AUSTRALIAN CAPITAL TERRITORY",
    date: "1975",
    category: "RALLY",
    cover: "/images/stratos-1975-rally.jpg",
    images: ["/images/stratos-1975-rally.jpg"],
    intro:
      "The car is already turning away. Dust hangs behind the rear wheels. On the edge of the road, spectators lean toward the action. John Lloyd’s photograph takes us into a very different rallying world.",
    sections: [
      {
        heading: "A rally, from the roadside.",
        body: "The source caption identifies this scene as the Castrol International Rallye in the Australian Capital Territory in 1975. John Lloyd’s photograph shows a Lancia Stratos on an unsealed road, with spectators standing close to the car.\n\nThe image does not need an invented driver quotation or an unsupported claim about the result. The view itself carries the story: the squat tail, the rough surface and the spectators’ attention.",
      },
      {
        heading: "The shape, under pressure.",
        body: "Viewed from behind, the Stratos is a study in compressed proportions: a broad tail, a steep rear window and bodywork gathered around the wheels. Here those lines are surrounded by movement rather than display stands.\n\nThe vehicle story and workshop are linked below for a closer look. Historical specifications and repair guidance remain separate from this photographic reading.",
      },
      {
        heading: "Keep the dates straight.",
        body: "The event date comes from the source caption. The file’s digital metadata shows a later date, which relates to the digital copy rather than establishing when the rally took place. We preserve that distinction in the photograph record. The original is credited to John Lloyd and shared under CC BY 2.0.",
      },
    ],
  },
];
