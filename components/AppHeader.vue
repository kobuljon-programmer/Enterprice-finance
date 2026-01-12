<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import logoBlue from "~/assets/logos/logo-blue.png";

const { t, locale, setLocale } = useI18n();
const { scrollToElement } = useScrollTo();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const languages = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) || languages[0];
});

const changeLanguage = async (code) => {
  await setLocale(code);
  if (import.meta.client) {
    localStorage.setItem("locale", code);
  }
};

const navItems = computed(() => [
  { id: "home", label: t("nav.home"), href: "#home" },
  { id: "about", label: t("nav.about"), href: "#about" },
  { id: "products", label: t("nav.products"), href: "#products" },
  { id: "roadmap", label: t("nav.roadmap"), href: "#roadmap" },
  { id: "faq", label: t("nav.faq"), href: "#faq" },
  { id: "contact", label: t("nav.contact"), href: "#contact" },
]);

const scrollToSection = (href) => {
  scrollToElement(href);
  isMenuOpen.value = false;
};

// Handle scroll for sticky header effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-nav py-3'
        : 'bg-transparent py-5',
    ]"
  >
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a
          href="#home"
          class="flex items-center group"
          @click.prevent="scrollToSection('#home')"
        >
          <img
            :src="logoBlue"
            alt="Enterprise Finance"
            class="h-10 md:h-12 w-auto"
          />
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-primary-500 hover:bg-primary-50 transition-all duration-200"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Right Section: Language + CTA -->
        <div class="flex items-center space-x-3 md:space-x-4">
          <!-- Language Switcher -->
          <el-dropdown trigger="click" @command="changeLanguage">
            <button
              class="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <span class="text-lg">{{ currentLanguage.flag }}</span>
              <span
                class="hidden md:inline text-sm font-medium text-gray-700"
                >{{ currentLanguage.code.toUpperCase() }}</span
              >
              <el-icon class="text-gray-500"><ArrowDown /></el-icon>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="lang in languages"
                  :key="lang.code"
                  :command="lang.code"
                  :class="{ 'bg-primary-50': lang.code === locale }"
                >
                  <span class="mr-2">{{ lang.flag }}</span>
                  {{ lang.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- CTA Button (Desktop) -->
          <el-button
            type="primary"
            class="hidden md:flex !rounded-xl !px-6 !font-semibold"
            @click="scrollToSection('#contact')"
          >
            {{ t("nav.apply") }}
          </el-button>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            @click="isMenuOpen = !isMenuOpen"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle menu"
          >
            <div class="w-6 h-5 relative flex flex-col justify-between">
              <span
                class="w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
              />
              <span
                class="w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                :class="{ 'opacity-0': isMenuOpen }"
              />
              <span
                class="w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
              />
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav
          v-if="isMenuOpen"
          class="lg:hidden mt-4 py-4 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="block px-6 py-3 text-gray-700 font-medium hover:text-primary-500 hover:bg-primary-50 transition-all duration-200"
          >
            {{ item.label }}
          </a>
          <div class="px-4 pt-3">
            <el-button
              type="primary"
              class="w-full !rounded-xl !font-semibold"
              @click="scrollToSection('#contact')"
            >
              {{ t("nav.apply") }}
            </el-button>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
