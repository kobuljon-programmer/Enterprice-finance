<script setup>
import { computed } from 'vue'

const props = defineProps({
  productId: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const { t, tm, rt } = useI18n()
const { scrollToElement } = useScrollTo()

const productConfig = {
  murabaha: {
    icon: 'ShoppingCart',
    gradient: 'from-primary-500 to-primary-700',
    bgLight: 'bg-primary-50',
    bgMedium: 'bg-primary-100',
    textColor: 'text-primary-600',
    borderColor: 'border-primary-200',
    accentColor: 'primary',
    iconBg: 'bg-primary-500',
  },
  ijara: {
    icon: 'Key',
    gradient: 'from-green-500 to-green-700',
    bgLight: 'bg-green-50',
    bgMedium: 'bg-green-100',
    textColor: 'text-green-600',
    borderColor: 'border-green-200',
    accentColor: 'green',
    iconBg: 'bg-green-500',
  },
  musharaka: {
    icon: 'Connection',
    gradient: 'from-purple-500 to-purple-700',
    bgLight: 'bg-purple-50',
    bgMedium: 'bg-purple-100',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    accentColor: 'purple',
    iconBg: 'bg-purple-500',
  },
  mudaraba: {
    icon: 'TrendCharts',
    gradient: 'from-secondary-500 to-secondary-600',
    bgLight: 'bg-secondary-50',
    bgMedium: 'bg-secondary-100',
    textColor: 'text-secondary-600',
    borderColor: 'border-secondary-200',
    accentColor: 'secondary',
    iconBg: 'bg-secondary-500',
  },
}

const config = computed(() => productConfig[props.productId] || productConfig.murabaha)

// Helper to get array items with proper string resolution
const getArrayItems = (key) => {
  const messages = tm(key)
  if (Array.isArray(messages)) {
    return messages.map(msg => rt(msg))
  }
  return []
}

// Get arrays using tm() and rt() for proper array access
const howItWorksSteps = computed(() => getArrayItems(`products.${props.productId}.detail.howItWorks.steps`))
const benefitItems = computed(() => getArrayItems(`products.${props.productId}.detail.benefits.items`))
const traditionalItems = computed(() => getArrayItems(`products.${props.productId}.detail.comparison.traditional.items`))
const islamicItems = computed(() => getArrayItems(`products.${props.productId}.detail.comparison.islamic.items`))

const handleApply = () => {
  emit('close')
  setTimeout(() => {
    scrollToElement('#contact')
  }, 300)
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        @click.self="handleClose"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl modal-content"
        >
          <!-- Header with gradient -->
          <div
            class="relative overflow-hidden rounded-t-3xl"
            :class="[`bg-gradient-to-br ${config.gradient}`]"
          >
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <!-- Close button -->
            <button
              @click="handleClose"
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
            >
              <el-icon class="text-white text-xl"><Close /></el-icon>
            </button>

            <!-- Header content -->
            <div class="relative z-10 px-6 sm:px-10 py-10 sm:py-14">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <el-icon class="text-white text-3xl sm:text-4xl">
                    <component :is="config.icon" />
                  </el-icon>
                </div>
                <div>
                  <span
                    class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-2"
                  >
                    {{ t(`products.${productId}.name`) }}
                  </span>
                  <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {{ t(`products.${productId}.title`) }}
                  </h2>
                </div>
              </div>
              <p class="text-white/90 text-base sm:text-lg max-w-2xl">
                {{ t(`products.${productId}.description`) }}
              </p>
            </div>
          </div>

          <!-- Body content -->
          <div class="px-6 sm:px-10 py-8 sm:py-10">

            <!-- What is section -->
            <div class="mb-12">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                  :class="[`bg-gradient-to-br ${config.gradient}`]"
                >
                  <el-icon class="text-white"><InfoFilled /></el-icon>
                </span>
                {{ t(`products.${productId}.detail.whatIs.title`) }}
              </h3>
              <p class="text-gray-600 leading-relaxed text-base sm:text-lg ml-[52px]">
                {{ t(`products.${productId}.detail.whatIs.content`) }}
              </p>
            </div>

            <!-- Difference from Microloans Section -->
            <div class="mb-12">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                  :class="[`bg-gradient-to-br ${config.gradient}`]"
                >
                  <el-icon class="text-white"><Switch /></el-icon>
                </span>
                {{ t(`products.${productId}.detail.comparison.title`) }}
              </h3>

              <div class="grid md:grid-cols-2 gap-6">
                <!-- Traditional Microloans -->
                <div class="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                      <el-icon class="text-white"><CloseBold /></el-icon>
                    </div>
                    <h4 class="font-bold text-red-700 text-lg">{{ t(`products.${productId}.detail.comparison.traditional.title`) }}</h4>
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in traditionalItems"
                      :key="index"
                      class="flex items-start gap-2 text-red-700"
                    >
                      <el-icon class="mt-1 flex-shrink-0"><Close /></el-icon>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Islamic Finance (This Product) -->
                <div class="border-2 rounded-2xl p-6" :class="[config.bgLight, config.borderColor]">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="config.iconBg">
                      <el-icon class="text-white"><Select /></el-icon>
                    </div>
                    <h4 class="font-bold text-lg" :class="config.textColor">{{ t(`products.${productId}.detail.comparison.islamic.title`) }}</h4>
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in islamicItems"
                      :key="index"
                      class="flex items-start gap-2"
                      :class="config.textColor"
                    >
                      <el-icon class="mt-1 flex-shrink-0"><Check /></el-icon>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- How it works - Timeline Style -->
            <div class="mb-12">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <span
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                  :class="[`bg-gradient-to-br ${config.gradient}`]"
                >
                  <el-icon class="text-white"><List /></el-icon>
                </span>
                {{ t(`products.${productId}.detail.howItWorks.title`) }}
              </h3>

              <!-- Timeline -->
              <div class="relative">
                <!-- Vertical line -->
                <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block"></div>

                <div class="space-y-4">
                  <div
                    v-for="(step, index) in howItWorksSteps"
                    :key="index"
                    class="relative flex items-start gap-4 sm:gap-6"
                  >
                    <!-- Step number circle -->
                    <div
                      class="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
                      :class="[`bg-gradient-to-br ${config.gradient}`]"
                    >
                      {{ index + 1 }}
                    </div>

                    <!-- Step content -->
                    <div class="flex-1 pb-2">
                      <div
                        class="bg-white border-2 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        :class="config.borderColor"
                      >
                        <p class="text-gray-700 text-base">{{ step }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Benefits - Card Grid -->
            <div class="mb-12">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                  :class="[`bg-gradient-to-br ${config.gradient}`]"
                >
                  <el-icon class="text-white"><Medal /></el-icon>
                </span>
                {{ t(`products.${productId}.detail.benefits.title`) }}
              </h3>

              <div class="grid sm:grid-cols-2 gap-4">
                <div
                  v-for="(benefit, index) in benefitItems"
                  :key="index"
                  class="group relative overflow-hidden rounded-xl p-4 border-2 hover:shadow-lg transition-all duration-300"
                  :class="[config.bgLight, config.borderColor]"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                      :class="[`bg-gradient-to-br ${config.gradient}`]"
                    >
                      <el-icon class="text-white text-sm"><Check /></el-icon>
                    </div>
                    <p class="text-gray-700 font-medium">{{ benefit }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Who is it for -->
            <div class="mb-12">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                  :class="[`bg-gradient-to-br ${config.gradient}`]"
                >
                  <el-icon class="text-white"><User /></el-icon>
                </span>
                {{ t(`products.${productId}.detail.whoIsItFor.title`) }}
              </h3>
              <div
                class="p-6 rounded-2xl border-2"
                :class="[config.bgLight, config.borderColor]"
              >
                <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {{ t(`products.${productId}.detail.whoIsItFor.content`) }}
                </p>
              </div>
            </div>

            <!-- Islamic principle - Highlighted -->
            <div
              class="p-6 sm:p-8 rounded-2xl mb-10 relative overflow-hidden"
              :class="config.bgMedium"
            >
              <!-- Decorative -->
              <div class="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" :class="config.iconBg"></div>

              <div class="flex items-start gap-4 relative z-10">
                <div
                  class="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                  :class="[`bg-gradient-to-br ${config.gradient}`]"
                >
                  <el-icon class="text-white text-2xl"><Sunrise /></el-icon>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-3 text-xl">
                    {{ t(`products.${productId}.detail.islamicPrinciple.title`) }}
                  </h4>
                  <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {{ t(`products.${productId}.detail.islamicPrinciple.content`) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <el-button
                size="large"
                class="!rounded-xl !px-10 !py-6 !text-lg !font-semibold !shadow-lg"
                :class="[`!bg-gradient-to-r ${config.gradient} !border-0 !text-white hover:!opacity-90 hover:!shadow-xl`]"
                @click="handleApply"
              >
                <el-icon class="mr-2"><Edit /></el-icon>
                {{ t('form.title') }}
              </el-button>
              <el-button
                size="large"
                class="!rounded-xl !px-10 !py-6 !text-lg !font-semibold !bg-gray-100 !text-gray-700 !border-gray-200 hover:!bg-gray-200"
                @click="handleClose"
              >
                <el-icon class="mr-2"><Back /></el-icon>
                {{ t('common.back') || 'Orqaga' }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

/* Custom scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
