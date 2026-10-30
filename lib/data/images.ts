/**
 * Mood photos for page banners and sections. Placeholders (Unsplash) until
 * the client delivers their own photography.
 */
const photo = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** One calm hero photo (the client chose this one, Oct 2026). */
export const heroImage = {
  src: photo("1618773928121-c32242e63f39", 2400),
  alt: "A warm, softly lit boutique hotel room",
};

export const homeImages = {
  about: photo("1564078516393-cf04bd966897", 1600),
  waitlist: photo("1543007630-9710e4a00a20", 2400),
};

export const pageImages = {
  hotels: photo("1566073771259-6a8506099945"),
  jobs: photo("1556910103-1c02745aae4d"),
  suppliers: photo("1556761175-5973dc0f32e7"),
  vouchers: photo("1517502884422-41eaead166d4"),
  purchasing: photo("1586528116311-ad8dd3c8310d"),
  stories: photo("1455587734955-081b22074882"),
  legal: photo("1497366216548-37526070297c"),
};
