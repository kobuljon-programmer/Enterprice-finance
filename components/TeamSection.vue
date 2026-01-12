<script setup>
import { ref } from "vue";

const { t } = useI18n();

const teamMembers = ref([
  {
    id: "mansur",
    icon: "UserFilled",
    color: "primary",
  },
  {
    id: "abduxalil",
    icon: "UserFilled",
    color: "secondary",
  },
  {
    id: "qudratbek",
    icon: "UserFilled",
    color: "green",
  },
  {
    id: "azamxon",
    icon: "UserFilled",
    color: "purple",
  },
]);

const expandedMember = ref(null);

const toggleExpand = (id) => {
  expandedMember.value = expandedMember.value === id ? null : id;
};
</script>

<template>
  <section id="team" class="py-20 md:py-28 bg-white relative overflow-hidden">
    <!-- Decorative elements -->
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-secondary-50 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-72 h-72 bg-primary-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"
    ></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 bg-secondary-50 rounded-full mb-6"
        >
          <el-icon class="text-secondary-500 mr-2"><User /></el-icon>
          <span class="text-sm font-medium text-secondary-700">{{
            t("team.title")
          }}</span>
        </div>

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          {{ t("team.title") }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t("team.subtitle") }}
        </p>
      </div>

      <!-- Team Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-gray-100"
        >
          <!-- Photo placeholder -->
          <div
            class="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
          >
            <div
              class="absolute inset-0 flex items-center justify-center"
              :class="{
                'bg-gradient-to-br from-primary-100 to-primary-200':
                  member.color === 'primary',
                'bg-gradient-to-br from-secondary-100 to-secondary-200':
                  member.color === 'secondary',
                'bg-gradient-to-br from-green-100 to-green-200':
                  member.color === 'green',
                'bg-gradient-to-br from-purple-100 to-purple-200':
                  member.color === 'purple',
              }"
            >
              <div
                class="w-24 h-24 rounded-full flex items-center justify-center"
                :class="{
                  'bg-primary-500': member.color === 'primary',
                  'bg-secondary-500': member.color === 'secondary',
                  'bg-green-500': member.color === 'green',
                  'bg-purple-500': member.color === 'purple',
                }"
              >
                <el-icon class="text-white text-4xl"><UserFilled /></el-icon>
              </div>
            </div>

            <!-- Decorative accent -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1"
              :class="{
                'bg-primary-500': member.color === 'primary',
                'bg-secondary-500': member.color === 'secondary',
                'bg-green-500': member.color === 'green',
                'bg-purple-500': member.color === 'purple',
              }"
            ></div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Name -->
            <h3
              class="text-xl font-bold mb-1"
              :class="{
                'text-primary-600': member.color === 'primary',
                'text-secondary-600': member.color === 'secondary',
                'text-green-600': member.color === 'green',
                'text-purple-600': member.color === 'purple',
              }"
            >
              {{ t(`team.members.${member.id}.name`) }}
            </h3>

            <!-- Position -->
            <p class="text-gray-500 font-medium mb-4">
              {{ t(`team.members.${member.id}.position`) }}
            </p>

            <!-- Bio (truncated) -->
            <p
              class="text-gray-600 text-sm leading-relaxed transition-all duration-300"
              :class="expandedMember === member.id ? '' : 'line-clamp-3'"
            >
              {{ t(`team.members.${member.id}.bio`) }}
            </p>

            <!-- Read more button -->
            <button
              @click="toggleExpand(member.id)"
              class="mt-4 text-sm font-semibold flex items-center transition-colors"
              :class="{
                'text-primary-500 hover:text-primary-700':
                  member.color === 'primary',
                'text-secondary-500 hover:text-secondary-700':
                  member.color === 'secondary',
                'text-green-500 hover:text-green-700': member.color === 'green',
                'text-purple-500 hover:text-purple-700':
                  member.color === 'purple',
              }"
            >
              {{ expandedMember === member.id ? "Yopish" : "Batafsil" }}
              <el-icon
                class="ml-1 transition-transform"
                :class="{ 'rotate-180': expandedMember === member.id }"
              >
                <ArrowDown />
              </el-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom decoration -->
      <div class="mt-16 text-center">
        <div
          class="inline-flex items-center space-x-4 bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50 rounded-full px-8 py-4"
        >
          <div class="flex -space-x-3">
            <div
              class="w-10 h-10 rounded-full bg-primary-500 border-2 border-white flex items-center justify-center"
            >
              <el-icon class="text-white text-sm"><UserFilled /></el-icon>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-secondary-500 border-2 border-white flex items-center justify-center"
            >
              <el-icon class="text-white text-sm"><UserFilled /></el-icon>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-green-500 border-2 border-white flex items-center justify-center"
            >
              <el-icon class="text-white text-sm"><UserFilled /></el-icon>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center"
            >
              <el-icon class="text-white text-sm"><UserFilled /></el-icon>
            </div>
          </div>
          <div class="text-left">
            <p class="text-sm font-semibold text-gray-900">
              Professional jamoa
            </p>
            <p class="text-xs text-gray-500">25+ yillik umumiy tajriba</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
