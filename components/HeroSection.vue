<script setup>
const { t } = useI18n();
const { scrollToElement } = useScrollTo();

const scrollToContact = () => {
  scrollToElement("#contact");
};

const scrollToProducts = () => {
  scrollToElement("#products");
};
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center overflow-hidden"
  >
    <!-- Background -->
    <div class="absolute inset-0 gradient-bg"></div>

    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Floating shapes -->
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-float"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-3xl"
      ></div>

      <!-- Geometric patterns -->
      <div
        class="absolute top-32 right-20 w-4 h-4 bg-primary-400 rounded-full opacity-60"
      ></div>
      <div
        class="absolute top-48 right-32 w-2 h-2 bg-secondary-400 rounded-full opacity-80"
      ></div>
      <div
        class="absolute bottom-40 left-32 w-3 h-3 bg-primary-500 rounded-full opacity-50"
      ></div>

      <!-- Grid pattern -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="
          background-image: radial-gradient(
            circle,
            #0046d1 1px,
            transparent 1px
          );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 pt-24 pb-12 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Text Content -->
        <div class="text-center lg:text-left animate-fade-in">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100 mb-6"
          >
            <span
              class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"
            ></span>
            <span class="text-sm font-medium text-gray-700">{{
              t("hero.badge")
            }}</span>
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
          >
            {{ t("hero.title") }}
          </h1>

          <h2
            class="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-500 mb-6"
          >
            {{ t("hero.subtitle") }}
          </h2>

          <p class="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
            {{ t("hero.description") }}
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <el-button
              type="danger"
              size="large"
              class="!rounded-xl !px-8 !py-6 !text-base !font-semibold !bg-secondary-500 !border-secondary-500 hover:!bg-secondary-600 hover:!border-secondary-600 shadow-button hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              @click="scrollToContact"
            >
              <el-icon class="mr-2"><Document /></el-icon>
              {{ t("hero.cta") }}
            </el-button>

            <el-button
              size="large"
              class="!rounded-xl !px-8 !py-6 !text-base !font-semibold !border-2 !border-primary-300 !text-primary-600 hover:!bg-primary-50 transition-all duration-300"
              @click="scrollToProducts"
            >
              {{ t("hero.learnMore") }}
              <el-icon class="ml-2"><ArrowRight /></el-icon>
            </el-button>
          </div>

          <!-- Trust indicators -->
          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 pt-8 border-t border-gray-200/50"
          >
            <div class="flex items-center space-x-2">
              <el-icon class="text-primary-500 text-xl"><Shield /></el-icon>
              <span class="text-sm text-gray-600">{{
                t("hero.shariahCompliant")
              }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-primary-500 text-xl"
                ><OfficeBuilding
              /></el-icon>
              <span class="text-sm text-gray-600">{{
                t("hero.officialLicense")
              }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-primary-500 text-xl"><User /></el-icon>
              <span class="text-sm text-gray-600">{{
                t("about.clients")
              }}</span>
            </div>
          </div>
        </div>

        <!-- Hero Image/Illustration -->
        <div class="relative hidden lg:block animate-slide-up">
          <div class="relative">
            <!-- Main card -->
            <div
              class="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <div class="flex items-center justify-between mb-6">
                <div>
                  <p class="text-sm text-gray-500 mb-1">
                    {{ t("hero.card.financing") }}
                  </p>
                  <p class="text-2xl font-bold text-gray-900">
                    500,000,000 UZS
                  </p>
                </div>
                <div
                  class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center"
                >
                  <el-icon class="text-white text-2xl"><Money /></el-icon>
                </div>
              </div>

              <div class="space-y-4">
                <div
                  class="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <span class="text-gray-600">{{ t("hero.card.type") }}</span>
                  <span class="font-semibold text-primary-600">Murabaha</span>
                </div>
                <div
                  class="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <span class="text-gray-600">{{ t("hero.card.term") }}</span>
                  <span class="font-semibold text-gray-900">{{
                    t("hero.card.months")
                  }}</span>
                </div>
                <div class="flex items-center justify-between py-3">
                  <span class="text-gray-600">{{ t("hero.card.markup") }}</span>
                  <span class="font-semibold text-green-600">{{
                    t("hero.annualRate")
                  }}</span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-3">
                  <div class="flex -space-x-2">
                    <div
                      class="w-8 h-8 rounded-full bg-primary-100 border-2 border-white"
                    ></div>
                    <div
                      class="w-8 h-8 rounded-full bg-secondary-100 border-2 border-white"
                    ></div>
                    <div
                      class="w-8 h-8 rounded-full bg-green-100 border-2 border-white"
                    ></div>
                  </div>
                  <p class="text-sm text-gray-500">
                    {{ t("hero.card.successfulProjects") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Floating cards -->
            <div
              class="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 transform -rotate-6 animate-float"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"
                >
                  <el-icon class="text-green-600"><Check /></el-icon>
                </div>
                <div>
                  <p class="text-xs text-gray-500">
                    {{ t("hero.card.status") }}
                  </p>
                  <p class="text-sm font-semibold text-green-600">
                    {{ t("hero.card.approved") }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 transform rotate-3 animate-float"
              style="animation-delay: 1s"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center"
                >
                  <el-icon class="text-primary-600"><Timer /></el-icon>
                </div>
                <div>
                  <p class="text-xs text-gray-500">
                    {{ t("hero.card.applicationReview") }}
                  </p>
                  <p class="text-sm font-semibold text-primary-600">
                    {{ t("hero.responseTime") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator - hidden on mobile -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
      <a
        href="#about"
        @click.prevent="scrollToProducts"
        class="flex flex-col items-center text-gray-400 hover:text-primary-500 transition-colors"
      >
        <span class="text-xs mb-2">Pastga</span>
        <el-icon><ArrowDown /></el-icon>
      </a>
    </div>
  </section>
</template>
