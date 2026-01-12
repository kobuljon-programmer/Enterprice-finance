
// @ts-nocheck


export const localeCodes =  [
  "uz",
  "ru",
  "en"
]

export const localeLoaders = {
  "uz": [{ key: "../i18n/locales/uz.js", load: () => import("../i18n/locales/uz.js" /* webpackChunkName: "locale__Users_kobuljonrasuljonov_EnterPriceFinanceForClaude_i18n_locales_uz_js" */), cache: true }],
  "ru": [{ key: "../i18n/locales/ru.js", load: () => import("../i18n/locales/ru.js" /* webpackChunkName: "locale__Users_kobuljonrasuljonov_EnterPriceFinanceForClaude_i18n_locales_ru_js" */), cache: true }],
  "en": [{ key: "../i18n/locales/en.js", load: () => import("../i18n/locales/en.js" /* webpackChunkName: "locale__Users_kobuljonrasuljonov_EnterPriceFinanceForClaude_i18n_locales_en_js" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": ""
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false,
    "optimizeTranslationDirective": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "uz",
      "name": "O'zbek",
      "files": [
        "i18n/locales/uz.js"
      ]
    },
    {
      "code": "ru",
      "name": "Русский",
      "files": [
        "i18n/locales/ru.js"
      ]
    },
    {
      "code": "en",
      "name": "English",
      "files": [
        "i18n/locales/en.js"
      ]
    }
  ],
  "defaultLocale": "uz",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "i18n/locales",
  "rootRedirect": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_locale",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const nuxtI18nOptionsDefault = {
  "experimental": {
    "localeDetector": ""
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [],
  "defaultLocale": "",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": null,
  "rootRedirect": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false
}

export const normalizedLocales = [
  {
    "code": "uz",
    "name": "O'zbek",
    "files": [
      {
        "path": "i18n/locales/uz.js"
      }
    ]
  },
  {
    "code": "ru",
    "name": "Русский",
    "files": [
      {
        "path": "i18n/locales/ru.js"
      }
    ]
  },
  {
    "code": "en",
    "name": "English",
    "files": [
      {
        "path": "i18n/locales/en.js"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const STRATEGIES = {
  "PREFIX": "prefix",
  "PREFIX_EXCEPT_DEFAULT": "prefix_except_default",
  "PREFIX_AND_DEFAULT": "prefix_and_default",
  "NO_PREFIX": "no_prefix"
}
export const DEFAULT_LOCALE = ""
export const DEFAULT_STRATEGY = "prefix_except_default"
export const DEFAULT_TRAILING_SLASH = false
export const DEFAULT_ROUTES_NAME_SEPARATOR = "___"
export const DEFAULT_LOCALE_ROUTE_NAME_SUFFIX = "default"
export const DEFAULT_DETECTION_DIRECTION = "ltr"
export const DEFAULT_BASE_URL = ""
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"


