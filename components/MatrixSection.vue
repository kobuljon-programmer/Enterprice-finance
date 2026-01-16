<script setup>
import { ref } from "vue";

const { t } = useI18n();

const entityTypes = ref([
  {
    type: "physical",
    icon: "User",
    color: "primary",
    amountKey: "amountPhysical",
  },
  {
    type: "legal",
    icon: "OfficeBuilding",
    color: "secondary",
    amountKey: "amountLegal",
  },
]);

const commonParams = ref([
  {
    parameter: "markup",
    value: "markupValue",
    icon: "TrendCharts",
    color: "green",
  },
  {
    parameter: "term",
    value: "termValue",
    icon: "Timer",
    color: "purple",
  },
  {
    parameter: "collateral",
    value: "collateralValue",
    icon: "Lock",
    color: "gray",
  },
]);

const collateralOptions = ref([
  { type: "property", icon: "OfficeBuilding" },
  { type: "vehicles", icon: "Van" },
]);
</script>

<template>
  <section class="py-20 md:py-28 bg-white relative overflow-hidden">
    <!-- Decorative -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-primary-50 to-transparent rounded-full blur-3xl opacity-60"
    ></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-6"
        >
          <el-icon class="text-primary-500 mr-2"><Document /></el-icon>
          <span class="text-sm font-medium text-primary-700">{{
            t("matrix.title")
          }}</span>
        </div>

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          {{ t("matrix.title") }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t("matrix.subtitle") }}
        </p>
      </div>

      <!-- Entity Types Cards -->
      <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
        <div
          v-for="entity in entityTypes"
          :key="entity.type"
          class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
        >
          <!-- Card Header -->
          <div
            class="px-6 py-5 text-white"
            :class="{
              'bg-gradient-to-r from-primary-500 to-primary-700':
                entity.color === 'primary',
              'bg-gradient-to-r from-secondary-500 to-secondary-700':
                entity.color === 'secondary',
            }"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <el-icon class="text-2xl text-white">
                  <component :is="entity.icon" />
                </el-icon>
              </div>
              <h3 class="text-xl font-bold text-white">
                {{ t(`matrix.entityTypes.${entity.type}`) }}
              </h3>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-6">
            <!-- Amount Limit -->
            <div
              class="flex items-center justify-between py-4 border-b border-gray-100"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center"
                >
                  <el-icon class="text-primary-600"><Money /></el-icon>
                </div>
                <span class="font-medium text-gray-700">{{
                  t("matrix.amount")
                }}</span>
              </div>
              <span
                class="text-lg font-bold"
                :class="
                  entity.color === 'primary'
                    ? 'text-primary-600'
                    : 'text-secondary-600'
                "
              >
                {{ t(`matrix.${entity.amountKey}`) }}
              </span>
            </div>

            <!-- Term -->
            <div
              class="flex items-center justify-between py-4 border-b border-gray-100"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <el-icon class="text-purple-600"><Timer /></el-icon>
                </div>
                <span class="font-medium text-gray-700">{{
                  t("matrix.term")
                }}</span>
              </div>
              <span class="text-lg font-bold text-purple-600">{{
                t("matrix.termValue")
              }}</span>
            </div>

            <!-- Markup -->
            <div class="flex items-center justify-between py-4">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <el-icon class="text-green-600"><TrendCharts /></el-icon>
                </div>
                <span class="font-medium text-gray-700">{{
                  t("matrix.markup")
                }}</span>
              </div>
              <span class="text-lg font-bold text-green-600">{{
                t("matrix.markupValue")
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Collateral Options -->
      <div class="mt-12 max-w-4xl mx-auto">
        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">
          {{ t("matrix.collateralTypes") }}
        </h3>
        <div class="grid grid-cols-2 gap-4 md:gap-6">
          <div
            v-for="option in collateralOptions"
            :key="option.type"
            class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center group"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-500 transition-colors"
            >
              <el-icon
                class="text-2xl text-primary-600 group-hover:text-white transition-colors"
              >
                <component :is="option.icon" />
              </el-icon>
            </div>
            <p class="font-semibold text-gray-900">
              {{ t(`matrix.${option.type}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
