<script setup>
const { locale, t } = useI18n()

// SEO Meta - reactive based on locale
useSeoMeta({
  title: () => t('seo.title'),
  ogTitle: () => t('seo.title'),
  description: () => t('seo.description'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogLocale: () => locale.value === 'uz' ? 'uz_UZ' : locale.value === 'ru' ? 'ru_RU' : 'en_US',
  ogSiteName: 'Enterprise Finance',
  twitterCard: 'summary_large_image',
})

// Update html lang attribute reactively
useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
})

// Restore saved locale on client-side
onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['uz', 'ru', 'en'].includes(savedLocale)) {
    locale.value = savedLocale
  }
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
