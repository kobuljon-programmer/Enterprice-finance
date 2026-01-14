const BACKEND_MODE = process.env.NUXT_BACKEND === "true";
// Netlify sets `NETLIFY=true` during build; detect it to use Nitro's Netlify preset
const IS_NETLIFY = process.env.NETLIFY === "true";

// Choose Nitro preset based on desired backend mode and deployment platform:
// - static: fully statically generated site (no server endpoints)
// - netlify: Netlify Functions for server endpoints (use when deploying to Netlify and you need server/api)
// - node-server: standard Node server for self-hosting
const NITRO_CONFIG = BACKEND_MODE
  ? IS_NETLIFY
    ? { preset: "netlify" }
    : { preset: "node-server" }
  : { preset: "static" };

export default defineNuxtConfig({
  // ✅ switchable
  ssr: BACKEND_MODE,

  nitro: NITRO_CONFIG,

  // runtimeConfig: top-level keys are server-only; use `runtimeConfig.public` for client-exposed values
  runtimeConfig: {
    GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    GOOGLE_SHEETS_TAB_NAME: process.env.GOOGLE_SHEETS_TAB_NAME,

    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,

    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  },
  devtools: { enabled: false },

  // SSR mode - set to false for Netlify static hosting, true for Node.js server
  // ssr: false,

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
    server: {
      hmr: false,
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

  // Nitro configuration
  // Use 'static' for Netlify, 'node-server' for your own hosting
  // nitro: {
  //   preset: "static",
  // },

  compatibilityDate: "2024-11-01",
});
