import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { defineComponent, h } from 'vue'

// Custom Shield icon since Element Plus doesn't have one
const Shield = defineComponent({
  name: 'Shield',
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 1024 1024',
      fill: 'currentColor',
      width: '1em',
      height: '1em',
    }, [
      h('path', {
        d: 'M512 64L128 192v298.667c0 247.466 163.2 479.146 384 533.333 220.8-54.187 384-285.867 384-533.333V192L512 64zm0 469.333h298.667c-23.467 183.467-145.067 346.667-298.667 399.147V533.333H213.333V241.067L512 147.2v386.133z',
      }),
    ])
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  // Provide ID injection key to fix hydration mismatches
  // This ensures consistent IDs between server and client
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })

  nuxtApp.vueApp.use(ElementPlus)

  // Register all Element Plus icons globally
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }

  // Register custom Shield icon
  nuxtApp.vueApp.component('Shield', Shield)
})
