<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TeamSection from './components/TeamSection.vue'
import ProductsSection from './components/ProductsSection.vue'
import MatrixSection from './components/MatrixSection.vue'
import RoadmapSection from './components/RoadmapSection.vue'
import ApplicationForm from './components/ApplicationForm.vue'
import AppFooter from './components/AppFooter.vue'

const { locale } = useI18n()

onMounted(() => {
  // Restore saved locale
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['uz', 'ru', 'en'].includes(savedLocale)) {
    locale.value = savedLocale
  }

  // Update document title based on locale
  document.title = locale.value === 'uz'
    ? 'Enterprise Finance - Islomiy Moliyaviy Yechimlar'
    : locale.value === 'ru'
      ? 'Enterprise Finance - Исламские Финансовые Решения'
      : 'Enterprise Finance - Islamic Financial Solutions'
})
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ProductsSection />
      <MatrixSection />
      <RoadmapSection />
      <ApplicationForm />
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Smooth scroll for the entire page */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #0046D1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #003eb8;
}
</style>
