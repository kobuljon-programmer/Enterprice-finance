<script setup>
import { ref } from 'vue'

const { t } = useI18n()

const tableData = ref([
  {
    parameter: 'amount',
    value: 'amountValue',
    icon: 'Money',
    color: 'primary',
  },
  {
    parameter: 'markup',
    value: 'markupValue',
    icon: 'TrendCharts',
    color: 'green',
  },
  {
    parameter: 'term',
    value: 'termValue',
    icon: 'Timer',
    color: 'purple',
  },
  {
    parameter: 'collateral',
    value: 'collateralValue',
    icon: 'Lock',
    color: 'secondary',
  },
])

const collateralOptions = ref([
  { type: 'property', icon: 'OfficeBuilding' },
  { type: 'vehicles', icon: 'Van' },
])
</script>

<template>
  <section class="py-20 md:py-28 bg-white relative overflow-hidden">
    <!-- Decorative -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-primary-50 to-transparent rounded-full blur-3xl opacity-60"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-6">
          <el-icon class="text-primary-500 mr-2"><Document /></el-icon>
          <span class="text-sm font-medium text-primary-700">{{ t('matrix.title') }}</span>
        </div>

        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {{ t('matrix.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t('matrix.subtitle') }}
        </p>
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block max-w-4xl mx-auto">
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <!-- Table Header -->
          <div class="grid grid-cols-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
            <div class="px-8 py-5 font-semibold text-lg">Parametr</div>
            <div class="px-8 py-5 font-semibold text-lg">Qiymat</div>
          </div>

          <!-- Table Body -->
          <div
            v-for="(row, index) in tableData"
            :key="row.parameter"
            class="grid grid-cols-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <div class="px-8 py-6 flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                :class="{
                  'bg-primary-100': row.color === 'primary',
                  'bg-green-100': row.color === 'green',
                  'bg-purple-100': row.color === 'purple',
                  'bg-secondary-100': row.color === 'secondary',
                }"
              >
                <el-icon
                  class="text-xl"
                  :class="{
                    'text-primary-600': row.color === 'primary',
                    'text-green-600': row.color === 'green',
                    'text-purple-600': row.color === 'purple',
                    'text-secondary-600': row.color === 'secondary',
                  }"
                >
                  <component :is="row.icon" />
                </el-icon>
              </div>
              <span class="font-semibold text-gray-900">{{ t(`matrix.${row.parameter}`) }}</span>
            </div>
            <div class="px-8 py-6 flex items-center">
              <span class="text-lg text-gray-700 font-medium">{{ t(`matrix.${row.value}`) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Cards -->
      <div class="md:hidden space-y-4">
        <div
          v-for="row in tableData"
          :key="row.parameter"
          class="bg-white rounded-2xl shadow-card p-5"
        >
          <div class="flex items-center space-x-4 mb-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="{
                'bg-primary-100': row.color === 'primary',
                'bg-green-100': row.color === 'green',
                'bg-purple-100': row.color === 'purple',
                'bg-secondary-100': row.color === 'secondary',
              }"
            >
              <el-icon
                :class="{
                  'text-primary-600': row.color === 'primary',
                  'text-green-600': row.color === 'green',
                  'text-purple-600': row.color === 'purple',
                  'text-secondary-600': row.color === 'secondary',
                }"
              >
                <component :is="row.icon" />
              </el-icon>
            </div>
            <span class="font-semibold text-gray-700">{{ t(`matrix.${row.parameter}`) }}</span>
          </div>
          <p class="text-lg font-bold text-gray-900 pl-14">{{ t(`matrix.${row.value}`) }}</p>
        </div>
      </div>

      <!-- Collateral Options -->
      <div class="mt-12 max-w-4xl mx-auto">
        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">{{ t('matrix.collateralTypes') }}</h3>
        <div class="grid grid-cols-2 gap-4 md:gap-6">
          <div
            v-for="option in collateralOptions"
            :key="option.type"
            class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center group"
          >
            <div class="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
              <el-icon class="text-2xl text-primary-600 group-hover:text-white transition-colors">
                <component :is="option.icon" />
              </el-icon>
            </div>
            <p class="font-semibold text-gray-900">{{ t(`matrix.${option.type}`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
