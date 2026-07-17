// Centralized remote image sources for the mock/prototype dataset.
// Using Unsplash CDN URLs so the app has realistic imagery without shipping local binaries.

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const chefAvatars = {
  woman1: unsplash('photo-1544005313-94ddf0286df2', 300),
  woman2: unsplash('photo-1531123897727-8f129e1688ce', 300),
  woman3: unsplash('photo-1489424731084-a5d8b219a5bb', 300),
  woman4: unsplash('photo-1524504388940-b1c1722653e1', 300),
  man1: unsplash('photo-1507003211169-0a1dd7228f2d', 300),
  man2: unsplash('photo-1500648767791-00dcc994a43e', 300),
  man3: unsplash('photo-1519085360753-af0119f7cbe7', 300),
  man4: unsplash('photo-1522529599102-193c0d76b5b6', 300),
};

export const chefCovers = {
  cover1: unsplash('photo-1556910103-1c02745aae4d'),
  cover2: unsplash('photo-1556909212-d5b604d0c90d'),
  cover3: unsplash('photo-1490645935967-10de6ba17061'),
  cover4: unsplash('photo-1466637574441-749b8f19452f'),
  cover5: unsplash('photo-1556909114-f6e7ad7d3136'),
  cover6: unsplash('photo-1607330289024-1535c6b4e1c1'),
  cover7: unsplash('photo-1607330289024-1535c6b4e1c1'),
  cover8: unsplash('photo-1591300805238-3e1a4b3b1a9b'),
};

export const dishImages = {
  jollof: unsplash('photo-1604329760661-e71dc83f8f26', 500),
  eguisi: unsplash('photo-1631452180519-c014fe946bc7', 500),
  suya: unsplash('photo-1529193591184-b1d58069ecdd', 500),
  pepperSoup: unsplash('photo-1547592180-85f173990554', 500),
  friedRice: unsplash('photo-1512058564366-18510be2db19', 500),
  grilledFish: unsplash('photo-1580476262798-bddd9f4b7369', 500),
  moiMoi: unsplash('photo-1585937421612-70a008356fbe', 500),
  saladBowl: unsplash('photo-1512621776951-a57141f2eefd', 500),
  pastaBowl: unsplash('photo-1551183053-bf91a1d81141', 500),
  pastries: unsplash('photo-1509440159596-0249088772ff', 500),
  smoothieBowl: unsplash('photo-1490474418585-ba9bad8fd0ea', 500),
  okroSoup: unsplash('photo-1547592166-23ac45744acd', 500),
  asunGoat: unsplash('photo-1544025162-d76694265947', 500),
  veggieStirFry: unsplash('photo-1512621776951-a57141f2eefd', 500),
};

export const galleryPhotos = {
  plating1: unsplash('photo-1414235077428-338989a2e8c0', 500),
  plating2: unsplash('photo-1547573854-74d2a71d0826', 500),
  plating3: unsplash('photo-1495521821757-a1efb6729352', 500),
  kitchen1: unsplash('photo-1556909172-54557c7e4fb7', 500),
};

export const reviewerAvatars = {
  r1: unsplash('photo-1633332755192-727a05c4013d', 200),
  r2: unsplash('photo-1580489944761-15a19d654956', 200),
  r3: unsplash('photo-1573496359142-b8d87734a5a2', 200),
  r4: unsplash('photo-1560250097-0b93528c311a', 200),
};
