import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";
const slogan = "Just make it fun.";

const YukinaConfig: Configuration = {
  title: "Asdrome",
  subTitle: slogan,
  brandTitle: "Asdrome",

  description: "Landing page of Asdrome - blog",

  site: "https://asdrome.com",

  locale: "en", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_showcase,
      href: "/showcase",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/asdrome",
    },
  ],

  username: "Asdrome",
  sign: slogan,
  avatarUrl: "/src/assets/logo-color.svg",
  socialLinks: [
    {
      name: "GitHub",
      icon: "mingcute:github-line",
      link: "https://github.com/asdrome",
    },
    {
      name: "Youtube",
      icon: "mingcute:youtube-line",
      link: "https://www.youtube.com/@AsdromeLabs",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "/src/assets/bubbletron_banner.webp",
    "https://res.cloudinary.com/asdrome-media/image/upload/v1706409941/banner/BannerLabs.jpg",
    "/src/assets/bmos_flower.webp",
    // "https://s2.loli.net/2025/01/25/PBvHFjr5yDu6t4a.webp",
    // "https://s2.loli.net/2025/01/25/6bKcwHZigzlM4mJ.webp",
    // "https://s2.loli.net/2025/01/25/H9WgEK6qNTcpFiS.webp",
    // "https://s2.loli.net/2025/01/25/njNVtuUMzxs81RI.webp",
    // "https://s2.loli.net/2025/01/25/tozsJ8QHAjFN3Mm.webp",
    // "https://s2.loli.net/2025/01/25/Pm89OveZq7NWUxF.webp",
    // "https://s2.loli.net/2025/01/25/UCYKvc1ZhgPHB9m.webp",
    // "https://s2.loli.net/2025/01/25/JjpLOW8VSmufzlA.webp",
  ],

  slugMode: "RAW", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
