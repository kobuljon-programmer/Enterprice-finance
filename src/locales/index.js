import { createI18n } from 'vue-i18n'
import uz from './uz.js'
import ru from './ru.js'
import en from './en.js'

const i18n = createI18n({
  legacy: false,
  locale: 'uz',
  fallbackLocale: 'en',
  messages: {
    uz,
    ru,
    en,
  },
})

export default i18n
