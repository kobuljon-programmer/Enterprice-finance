<script setup>
const { t } = useI18n()
const { scrollToElement } = useScrollTo()

// Fixed FAQ indices (8 items)
const faqIndices = [0, 1, 2, 3, 4, 5, 6, 7]

const activeNames = ref([0]) // First item open by default

const scrollToContact = () => {
  scrollToElement('#contact')
}
</script>

<template>
  <section id="faq" class="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-primary-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-14">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-4">
          {{ t('faq.badge') }}
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {{ t('faq.title') }}
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          {{ t('faq.subtitle') }}
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-3xl mx-auto">
        <el-collapse v-model="activeNames" accordion class="faq-collapse">
          <el-collapse-item
            v-for="index in faqIndices"
            :key="index"
            :name="index"
            class="faq-item"
          >
            <template #title>
              <div class="flex items-center gap-4 py-2">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                  <el-icon class="text-white text-lg"><QuestionFilled /></el-icon>
                </div>
                <span class="text-base sm:text-lg font-semibold text-gray-800 text-left">
                  {{ t(`faq.items[${index}].question`) }}
                </span>
              </div>
            </template>
            <div class="pl-14 pr-4 pb-4">
              <p class="text-gray-600 leading-relaxed text-base">
                {{ t(`faq.items[${index}].answer`) }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">{{ t('faq.moreQuestions') }}</p>
        <el-button
          type="primary"
          size="large"
          class="!rounded-xl !px-8 !py-6 !text-base !font-semibold"
          @click="scrollToContact"
        >
          <el-icon class="mr-2"><ChatDotRound /></el-icon>
          {{ t('faq.contactUs') }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-collapse {
  border: none;
  --el-collapse-border-color: transparent;
}

.faq-collapse :deep(.el-collapse-item) {
  margin-bottom: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
}

.faq-collapse :deep(.el-collapse-item:hover) {
  border-color: #10b981;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);
}

.faq-collapse :deep(.el-collapse-item.is-active) {
  border-color: #10b981;
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.15);
}

.faq-collapse :deep(.el-collapse-item__header) {
  border: none;
  padding: 16px 20px;
  height: auto;
  line-height: 1.5;
  background: transparent;
}

.faq-collapse :deep(.el-collapse-item__wrap) {
  border: none;
  background: transparent;
}

.faq-collapse :deep(.el-collapse-item__content) {
  padding: 0;
}

.faq-collapse :deep(.el-collapse-item__arrow) {
  color: #10b981;
  font-size: 16px;
  font-weight: bold;
}
</style>
