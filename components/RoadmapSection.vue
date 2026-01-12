<script setup>
import { ref } from 'vue'

const { t } = useI18n()

const steps = ref([
  { id: 'application', icon: 'EditPen', color: 'primary' },
  { id: 'creditHistory', icon: 'Document', color: 'blue' },
  { id: 'shariah', icon: 'Stamp', color: 'green' },
  { id: 'contract', icon: 'Tickets', color: 'purple' },
  { id: 'purchase', icon: 'ShoppingCart', color: 'orange' },
  { id: 'delivery', icon: 'Van', color: 'teal' },
  { id: 'payment', icon: 'Money', color: 'indigo' },
  { id: 'completion', icon: 'CircleCheck', color: 'success' },
])

const activeStep = ref(0)

const getStepColor = (color, type) => {
  const colors = {
    primary: { bg: 'bg-primary-100', text: 'text-primary-600', border: 'border-primary-500' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-500' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500' },
    success: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
  }
  return colors[color]?.[type] || colors.primary[type]
}
</script>

<template>
  <section id="roadmap" class="py-20 md:py-28 gradient-bg relative overflow-hidden">
    <!-- Decorative -->
    <div class="absolute top-10 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-10 w-64 h-64 bg-secondary-200/20 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6">
          <el-icon class="text-primary-500 mr-2"><Guide /></el-icon>
          <span class="text-sm font-medium text-gray-700">{{ t('roadmap.title') }}</span>
        </div>

        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {{ t('roadmap.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t('roadmap.subtitle') }}
        </p>
      </div>

      <!-- Desktop Steps (horizontal) -->
      <div class="hidden lg:block">
        <div class="relative">
          <!-- Progress line -->
          <div class="absolute top-16 left-0 right-0 h-1 bg-gray-200 rounded-full">
            <div
              class="h-full bg-gradient-to-r from-primary-500 to-green-500 rounded-full transition-all duration-500"
              :style="{ width: `${((activeStep + 1) / steps.length) * 100}%` }"
            ></div>
          </div>

          <!-- Steps -->
          <div class="grid grid-cols-8 gap-4">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="relative text-center cursor-pointer group"
              @mouseenter="activeStep = index"
            >
              <!-- Step circle -->
              <div
                class="relative z-10 w-32 h-32 mx-auto mb-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300"
                :class="[
                  index <= activeStep
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-white/70 hover:bg-white hover:shadow-md'
                ]"
              >
                <!-- Step number -->
                <div
                  class="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  :class="[
                    index <= activeStep
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                      : 'bg-gray-300'
                  ]"
                >
                  {{ index + 1 }}
                </div>

                <!-- Icon -->
                <div
                  class="w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-colors"
                  :class="[
                    index <= activeStep
                      ? getStepColor(step.color, 'bg')
                      : 'bg-gray-100'
                  ]"
                >
                  <el-icon
                    class="text-2xl transition-colors"
                    :class="[
                      index <= activeStep
                        ? getStepColor(step.color, 'text')
                        : 'text-gray-400'
                    ]"
                  >
                    <component :is="step.icon" />
                  </el-icon>
                </div>

                <!-- Title -->
                <p
                  class="text-xs font-semibold transition-colors px-2"
                  :class="[
                    index <= activeStep ? 'text-gray-900' : 'text-gray-500'
                  ]"
                >
                  {{ t(`roadmap.steps.${step.id}.title`) }}
                </p>
              </div>

              <!-- Tooltip -->
              <div
                class="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-white rounded-xl shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
              >
                <p class="text-xs text-gray-600">
                  {{ t(`roadmap.steps.${step.id}.description`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Steps (vertical) -->
      <div class="lg:hidden">
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
            <div
              class="w-full bg-gradient-to-b from-primary-500 to-green-500 transition-all duration-500"
              :style="{ height: `${((activeStep + 1) / steps.length) * 100}%` }"
            ></div>
          </div>

          <!-- Steps -->
          <div class="space-y-6">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="relative flex items-start pl-16 cursor-pointer"
              @click="activeStep = index"
            >
              <!-- Step circle -->
              <div
                class="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10"
                :class="[
                  index <= activeStep
                    ? `${getStepColor(step.color, 'bg')} shadow-lg`
                    : 'bg-white border-2 border-gray-200'
                ]"
              >
                <el-icon
                  :class="[
                    index <= activeStep
                      ? getStepColor(step.color, 'text')
                      : 'text-gray-400'
                  ]"
                >
                  <component :is="step.icon" />
                </el-icon>
              </div>

              <!-- Content -->
              <div
                class="bg-white rounded-2xl p-5 flex-1 transition-all duration-300"
                :class="[
                  index <= activeStep
                    ? 'shadow-lg border-l-4 ' + getStepColor(step.color, 'border')
                    : 'shadow-sm'
                ]"
              >
                <div class="flex items-center space-x-3 mb-2">
                  <span
                    class="text-xs font-bold px-2 py-1 rounded-full"
                    :class="[
                      index <= activeStep
                        ? `${getStepColor(step.color, 'bg')} ${getStepColor(step.color, 'text')}`
                        : 'bg-gray-100 text-gray-500'
                    ]"
                  >
                    {{ index + 1 }}-qadam
                  </span>
                </div>
                <h4
                  class="font-bold mb-1 transition-colors"
                  :class="[
                    index <= activeStep ? 'text-gray-900' : 'text-gray-500'
                  ]"
                >
                  {{ t(`roadmap.steps.${step.id}.title`) }}
                </h4>
                <p
                  class="text-sm transition-colors"
                  :class="[
                    index <= activeStep ? 'text-gray-600' : 'text-gray-400'
                  ]"
                >
                  {{ t(`roadmap.steps.${step.id}.description`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress indicator -->
      <div class="mt-12 text-center">
        <div class="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
          <el-icon class="text-primary-500"><Timer /></el-icon>
          <span class="text-sm text-gray-600">O'rtacha jarayon vaqti:</span>
          <span class="font-bold text-primary-600">3-5 ish kuni</span>
        </div>
      </div>
    </div>
  </section>
</template>
