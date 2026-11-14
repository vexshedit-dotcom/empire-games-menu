/**
 * Site-wide settings. Edit this file to change links, prices rules and defaults
 * without touching any other code.
 */
export const CONFIG = {
  brand: {
    name: { ar: "إمباير جيمز", en: "Empire Games" },
    tagline: { ar: "مقهى ألعاب • مشروبات • أكل", en: "Gaming Café • Drinks • Food" },
    logo: "assets/images/logo.png",
  },

  // Paste the real links here (leave empty to hide the button).
  links: {
    maps: "https://maps.app.goo.gl/hosybPYYfHPgT2336",
    instagram: "https://www.instagram.com/empire.games1",
  },

  currency: { ar: "د.ع", en: "IQD" },

  // Turning a sandwich into a meal (Pepsi + fries).
  meal: {
    extra: 2000,
  },

  // Hookah: German price = Babylon price + this amount.
  hookah: {
    germanExtra: 1000,
  },

  music: {
    // Optional: put an mp3 in assets/audio and write its path here,
    // e.g. "assets/audio/ambient.mp3". Empty = built-in generated ambient music.
    file: "",
    volume: 0.35,
  },

  defaults: {
    lang: "ar",
    theme: "dark",
  },

  // Minimum time (ms) the loading screen stays visible.
  loaderMinTime: 1800,
};
