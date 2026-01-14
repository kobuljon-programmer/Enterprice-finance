<script setup>
import { ref } from "vue";
import mansurImg from "~/assets/ef-team/mansurbek.jpeg";
import abduxalilImg from "~/assets/ef-team/abduxalil-usmanov.jpeg";
import qudratbekImg from "~/assets/ef-team/qudratbek.png";
import azamxonImg from "~/assets/ef-team/azamxon-f.jpeg";

const { t } = useI18n();

const teamMembers = ref([
  {
    id: "mansur",
    image: mansurImg,
    color: "primary",
  },
  {
    id: "abduxalil",
    image: abduxalilImg,
    color: "secondary",
  },
  {
    id: "qudratbek",
    image: qudratbekImg,
    color: "green",
  },
  {
    id: "azamxon",
    image: azamxonImg,
    color: "purple",
  },
]);

const selectedMember = ref(null);
const modalVisible = ref(false);

const openModal = (member) => {
  selectedMember.value = member;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  selectedMember.value = null;
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
          <!-- Team member photo -->
          <div class="relative h-56 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
            <img
              :src="member.image"
              :alt="t(`team.members.${member.id}.name`)"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            <!-- Subtle overlay for visual consistency -->
            <div
              class="absolute inset-0 pointer-events-none"
              :class="{
                'bg-gradient-to-b from-primary-500/5 via-transparent to-primary-500/10': member.color === 'primary',
                'bg-gradient-to-b from-secondary-500/5 via-transparent to-secondary-500/10': member.color === 'secondary',
                'bg-gradient-to-b from-green-500/5 via-transparent to-green-500/10': member.color === 'green',
                'bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/10': member.color === 'purple',
              }"
            ></div>

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
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {{ t(`team.members.${member.id}.bio`) }}
            </p>

            <!-- View details button -->
            <button
              @click="openModal(member)"
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
              {{ t("team.viewDetails") }}
              <el-icon class="ml-1">
                <ArrowRight />
              </el-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Team Member Modal -->
      <el-dialog
        v-model="modalVisible"
        :show-close="true"
        width="90%"
        class="team-modal"
        :class="{ 'max-w-2xl': true }"
        @close="closeModal"
      >
        <template v-if="selectedMember">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Member Image -->
            <div class="md:w-1/3 flex-shrink-0">
              <div class="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  :src="selectedMember.image"
                  :alt="t(`team.members.${selectedMember.id}.name`)"
                  class="w-full h-full object-cover object-top"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 h-1"
                  :class="{
                    'bg-primary-500': selectedMember.color === 'primary',
                    'bg-secondary-500': selectedMember.color === 'secondary',
                    'bg-green-500': selectedMember.color === 'green',
                    'bg-purple-500': selectedMember.color === 'purple',
                  }"
                ></div>
              </div>
            </div>

            <!-- Member Details -->
            <div class="md:w-2/3">
              <h3
                class="text-2xl md:text-3xl font-bold mb-2"
                :class="{
                  'text-primary-600': selectedMember.color === 'primary',
                  'text-secondary-600': selectedMember.color === 'secondary',
                  'text-green-600': selectedMember.color === 'green',
                  'text-purple-600': selectedMember.color === 'purple',
                }"
              >
                {{ t(`team.members.${selectedMember.id}.name`) }}
              </h3>

              <p class="text-gray-500 font-semibold text-lg mb-6">
                {{ t(`team.members.${selectedMember.id}.position`) }}
              </p>

              <div class="prose prose-gray max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  {{ t(`team.members.${selectedMember.id}.bio`) }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-dialog>

      <!-- Bottom decoration -->
      <div class="mt-16 text-center">
        <div
          class="inline-flex items-center space-x-4 bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50 rounded-full px-8 py-4"
        >
          <div class="flex -space-x-3">
            <img
              v-for="member in teamMembers"
              :key="'avatar-' + member.id"
              :src="member.image"
              :alt="t(`team.members.${member.id}.name`)"
              class="w-10 h-10 rounded-full border-2 border-white object-cover object-top"
            />
          </div>
          <div class="text-left">
            <p class="text-sm font-semibold text-gray-900">
              {{ t('team.professionalTeam') }}
            </p>
            <p class="text-xs text-gray-500">{{ t('team.totalExperience') }}</p>
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

<style>
.team-modal .el-dialog {
  max-width: 700px;
  border-radius: 1rem;
}

.team-modal .el-dialog__header {
  padding: 1rem 1.5rem 0;
}

.team-modal .el-dialog__body {
  padding: 1.5rem;
}

.team-modal .el-dialog__headerbtn {
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
}
</style>
