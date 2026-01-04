<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

const { t } = useI18n();

const stats = ref([
  { value: 0, target: 5, suffix: "+", label: "experience" },
  { value: 0, target: 1000, suffix: "+", label: "clients" },
  { value: 0, target: 100, suffix: "%", label: "trust" },
]);

const animateCounters = () => {
  stats.value.forEach((stat, index) => {
    const duration = 2000;
    const steps = 60;
    const increment = stat.target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        stat.value = stat.target;
        clearInterval(timer);
      } else {
        stat.value = Math.floor(current);
      }
    }, duration / steps);
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  const section = document.querySelector("#about");
  if (section) observer.observe(section);
});
</script>

<template>
  <section id="about" class="py-20 md:py-28 bg-white relative overflow-hidden">
    <!-- Decorative elements -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-72 h-72 bg-secondary-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"
    ></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Content -->
        <div>
          <div
            class="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-6"
          >
            <el-icon class="text-primary-500 mr-2"><InfoFilled /></el-icon>
            <span class="text-sm font-medium text-primary-700">{{
              t("about.title")
            }}</span>
          </div>

          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
          >
            {{ t("about.mission") }}
          </h2>

          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            {{ t("about.description") }}
          </p>

          <p class="text-gray-500 mb-8 leading-relaxed">
            {{ t("about.missionText") }}
          </p>

          <!-- Features list -->
          <div class="space-y-4">
            <div
              class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <div
                class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <el-icon class="text-primary-600 text-xl"><Shield /></el-icon>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">
                  Shariatga muvofiq
                </h4>
                <p class="text-sm text-gray-600">
                  Barcha operatsiyalar islomiy moliya tamoyillariga asoslangan
                </p>
              </div>
            </div>

            <div
              class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <div
                class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <el-icon class="text-green-600 text-xl"
                  ><CircleCheck
                /></el-icon>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">
                  Rasmiy litsenziya
                </h4>
                <p class="text-sm text-gray-600">
                  Markaziy bank tomonidan litsenziyalangan
                </p>
              </div>
            </div>

            <div
              class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <div
                class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <el-icon class="text-secondary-600 text-xl"
                  ><Promotion
                /></el-icon>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Tezkor xizmat</h4>
                <p class="text-sm text-gray-600">
                  24 soat ichida arizani ko'rib chiqish
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Stats -->
        <div class="relative">
          <!-- Main stats card -->
          <div
            class="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <h3 class="text-2xl font-bold mb-8 text-secondary-100">
              Bizning natijalarimiz
            </h3>

            <div class="grid grid-cols-2 gap-8">
              <div
                class="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
              >
                <div class="text-4xl md:text-5xl font-bold mb-2">
                  {{ stats[0].value }}{{ stats[0].suffix }}
                </div>
                <p class="text-primary-100 text-sm">
                  {{ t("about.experienceText") }}
                </p>
              </div>

              <div
                class="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
              >
                <div class="text-4xl md:text-5xl font-bold mb-2">
                  {{ stats[1].value }}{{ stats[1].suffix }}
                </div>
                <p class="text-primary-100 text-sm">
                  {{ t("about.clientsText") }}
                </p>
              </div>

              <div
                class="col-span-2 text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
              >
                <div class="text-5xl md:text-6xl font-bold mb-2">
                  {{ stats[2].value }}{{ stats[2].suffix }}
                </div>
                <p class="text-primary-100 text-sm">
                  {{ t("about.trustText") }}
                </p>
              </div>
            </div>

            <!-- Decorative -->
            <div
              class="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full"
            ></div>
            <div
              class="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full"
            ></div>
          </div>

          <!-- Floating badge - hidden on mobile to prevent overlap -->
          <div
            class="hidden md:block absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center"
              >
                <el-icon class="text-green-600 text-2xl"><Select /></el-icon>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">100%</p>
                <p class="text-sm text-gray-500">Mijozlar ishonchi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
