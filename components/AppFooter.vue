<script setup>
import { computed } from "vue";
import logoWhite from "~/assets/logos/logo-white.png";

const { t } = useI18n();
const { scrollToElement } = useScrollTo();

const currentYear = new Date().getFullYear();

const quickLinks = computed(() => [
  { label: t("nav.home"), href: "#home" },
  { label: t("nav.about"), href: "#about" },
  { label: t("nav.products"), href: "#products" },
  { label: t("nav.roadmap"), href: "#roadmap" },
  { label: t("nav.contact"), href: "#contact" },
]);

const products = computed(() => [
  { label: t("products.murabaha.name"), href: "#products" },
  { label: t("products.ijara.name"), href: "#products" },
  { label: t("products.musharaka.name"), href: "#products" },
  { label: t("products.mudaraba.name"), href: "#products" },
]);

const scrollToSection = (href) => {
  scrollToElement(href);
};
</script>

<template>
  <footer class="bg-gray-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <a
            href="#home"
            class="flex items-center mb-6"
            @click.prevent="scrollToSection('#home')"
          >
            <img
              :src="logoWhite"
              alt="Enterprise Finance"
              class="h-12 w-auto"
            />
          </a>

          <p class="text-gray-400 mb-6 leading-relaxed">
            {{ t("footer.description") }}
          </p>

          <!-- Social Links -->
          <div class="flex space-x-3">
            <!-- <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a> -->
            <a
              href="https://instagram.com/enterprisefinancemmt"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <!-- <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a> -->
            <a
              href="https://t.me/enterprisefinance"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-bold mb-6">{{ t("footer.quickLinks") }}</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.href">
              <a
                :href="link.href"
                @click.prevent="scrollToSection(link.href)"
                class="text-gray-400 hover:text-primary-400 transition-colors flex items-center space-x-2"
              >
                <el-icon class="text-xs"><ArrowRight /></el-icon>
                <span>{{ link.label }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h4 class="text-lg font-bold mb-6">{{ t("products.title") }}</h4>
          <ul class="space-y-3">
            <li v-for="product in products" :key="product.label">
              <a
                :href="product.href"
                @click.prevent="scrollToSection(product.href)"
                class="text-gray-400 hover:text-primary-400 transition-colors flex items-center space-x-2"
              >
                <el-icon class="text-xs"><ArrowRight /></el-icon>
                <span>{{ product.label }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-bold mb-6">{{ t("footer.contact") }}</h4>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3">
              <el-icon class="text-primary-400 mt-1"><Location /></el-icon>
              <span class="text-gray-400">{{ t("footer.address") }}</span>
            </li>
            <li>
              <a
                href="tel:+998552555115"
                class="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <el-icon class="text-primary-400"><Phone /></el-icon>
                <span>+998 55 255 51 15</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:enterprisefinance@yandex.com"
                class="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <el-icon class="text-primary-400"><Message /></el-icon>
                <span>enterprisefinance@yandex.com</span>
              </a>
            </li>
            <li class="flex items-start space-x-3">
              <el-icon class="text-primary-400 mt-1"><Clock /></el-icon>
              <span class="text-gray-400">{{ t("footer.workingHours") }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-gray-800">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p class="text-gray-500 text-sm text-center md:text-left">
            © {{ currentYear }} Enterprise Finance MMT MCHJ.
            {{ t("footer.copyright").split("©")[1] }}
          </p>
          <p
            class="text-gray-500 text-sm text-center md:text-right flex items-center space-x-2"
          >
            <el-icon class="text-primary-400"><Shield /></el-icon>
            <span class="w-max">{{ t("footer.license") }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
