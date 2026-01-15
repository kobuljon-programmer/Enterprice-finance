const BACKEND_MODE = process.env.NUXT_BACKEND === "true";

export default defineNuxtConfig({
  devtools: { enabled: false },

  // SSR mode - set to false for static hosting (e.g., Netlify), true for Node.js server
  ssr: BACKEND_MODE,
  nitro: {
    preset: BACKEND_MODE ? "node-server" : "static",
  },

  // Modules
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@vueuse/nuxt"],

  // CSS - include Tailwind and Element Plus
  css: ["element-plus/dist/index.css", "~/assets/styles/main.css"],

  // PostCSS config for Tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Vite configuration for Element Plus SCSS theming
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/element/index.scss" as *;`,
        },
      },
    },
  },

  // Element Plus transpile
  build: {
    transpile: ["element-plus/es"],
  },

  // i18n configuration
  i18n: {
    locales: [
      { code: "uz", name: "O'zbek", file: "uz.js" },
      { code: "ru", name: "Русский", file: "ru.js" },
      { code: "en", name: "English", file: "en.js" },
    ],
    defaultLocale: "uz",
    lazy: true,
    langDir: "i18n/locales",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      redirectOn: "root",
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
    // Required for SSR with .js locale files
    experimental: {
      jsTsFormatResource: true,
    },
  },

  // App configuration
  app: {
    head: {
      htmlAttrs: { lang: "uz" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },

  // Nitro configuration - controlled by NUXT_BACKEND env variable
  nitro: {
    preset: BACKEND_MODE ? "node-server" : "static",
  },

  compatibilityDate: "2024-11-01",
});
