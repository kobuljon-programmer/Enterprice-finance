export default defineNuxtConfig({
  devtools: { enabled: true },

  // SSR mode - set to false for Netlify static hosting, true for Node.js server
  ssr: false,

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],

  // CSS - include Tailwind and Element Plus
  css: [
    'element-plus/dist/index.css',
    '~/assets/styles/main.css',
  ],

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
    transpile: ['element-plus/es'],
  },

  // i18n configuration
  i18n: {
    locales: [
      { code: 'uz', name: "O'zbek", file: 'uz.js' },
      { code: 'ru', name: 'Русский', file: 'ru.js' },
      { code: 'en', name: 'English', file: 'en.js' },
    ],
    defaultLocale: 'uz',
    lazy: true,
    langDir: 'i18n/locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
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
      htmlAttrs: { lang: 'uz' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        },
      ],
    },
  },

  // Nitro configuration
  // Use 'static' for Netlify, 'node-server' for your own hosting
  nitro: {
    preset: 'static',
  },

  compatibilityDate: '2024-11-01',
})
