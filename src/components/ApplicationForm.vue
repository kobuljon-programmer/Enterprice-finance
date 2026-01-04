<script setup>
import { useI18n } from "vue-i18n";
import { ref, reactive, computed } from "vue";

const { t } = useI18n();

const currentStep = ref(0);
const isSubmitting = ref(false);
const isSuccess = ref(false);

const formData = reactive({
  fullName: "",
  phone: "",
  amount: null,
  product: "",
});

const products = computed(() => [
  {
    value: "murabaha",
    label: t("products.murabaha.name") + " - " + t("products.murabaha.title"),
  },
  {
    value: "ijara",
    label: t("products.ijara.name") + " - " + t("products.ijara.title"),
  },
  {
    value: "musharaka",
    label: t("products.musharaka.name") + " - " + t("products.musharaka.title"),
  },
  {
    value: "mudaraba",
    label: t("products.mudaraba.name") + " - " + t("products.mudaraba.title"),
  },
]);

const steps = computed(() => [
  { title: t("form.steps.personal"), icon: "User" },
  { title: t("form.steps.contact"), icon: "Phone" },
  { title: t("form.steps.details"), icon: "Document" },
]);

const formRules = {
  fullName: [
    { required: true, message: t("form.required"), trigger: "blur" },
    { min: 3, message: "Kamida 3 ta belgi", trigger: "blur" },
  ],
  phone: [
    { required: true, message: t("form.required"), trigger: "blur" },
    {
      pattern: /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      message: t("form.invalidPhone"),
      trigger: "blur",
    },
  ],
  amount: [
    { required: true, message: t("form.required"), trigger: "change" },
    {
      validator: (rule, value, callback) => {
        if (value < 300000000 || value > 1000000000) {
          callback(new Error(t("form.invalidAmount")));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  product: [{ required: true, message: t("form.required"), trigger: "change" }],
};

const formRef = ref(null);
const step1Ref = ref(null);
const step2Ref = ref(null);
const step3Ref = ref(null);

const validateStep = async (step) => {
  let isValid = false;

  try {
    if (step === 0) {
      await step1Ref.value?.validate();
      isValid = true;
    } else if (step === 1) {
      await step2Ref.value?.validate();
      isValid = true;
    } else if (step === 2) {
      await step3Ref.value?.validate();
      isValid = true;
    }
  } catch (error) {
    isValid = false;
  }

  return isValid;
};

const nextStep = async () => {
  const isValid = await validateStep(currentStep.value);
  if (isValid && currentStep.value < 2) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const formatPhone = (value) => {
  let cleaned = value.replace(/\D/g, "");
  if (!cleaned.startsWith("998")) {
    cleaned = "998" + cleaned;
  }
  cleaned = cleaned.slice(0, 12);

  let formatted = "+998";
  if (cleaned.length > 3) {
    formatted += " " + cleaned.slice(3, 5);
  }
  if (cleaned.length > 5) {
    formatted += " " + cleaned.slice(5, 8);
  }
  if (cleaned.length > 8) {
    formatted += " " + cleaned.slice(8, 10);
  }
  if (cleaned.length > 10) {
    formatted += " " + cleaned.slice(10, 12);
  }

  return formatted;
};

const handlePhoneInput = (event) => {
  formData.phone = formatPhone(event.target.value);
};

const formatAmount = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("uz-UZ").format(value);
};

const submitForm = async () => {
  const isValid = await validateStep(2);
  if (!isValid) return;

  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  isSubmitting.value = false;
  isSuccess.value = true;

  // Reset form after 3 seconds
  setTimeout(() => {
    isSuccess.value = false;
    currentStep.value = 0;
    Object.assign(formData, {
      fullName: "",
      phone: "",
      amount: null,
      product: "",
    });
  }, 5000);
};
</script>

<template>
  <section
    id="contact"
    class="py-20 md:py-28 bg-white relative overflow-hidden"
  >
    <!-- Decorative -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-72 h-72 bg-secondary-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"
    ></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Info -->
        <div>
          <div
            class="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-6"
          >
            <el-icon class="text-primary-500 mr-2"><EditPen /></el-icon>
            <span class="text-sm font-medium text-primary-700">{{
              t("form.title")
            }}</span>
          </div>

          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            {{ t("form.title") }}
          </h2>

          <p class="text-lg text-gray-600 mb-8">
            {{ t("form.subtitle") }}
          </p>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div
                class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <el-icon class="text-green-600 text-xl"><Check /></el-icon>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">
                  Tezkor ko'rib chiqish
                </h4>
                <p class="text-sm text-gray-600">24 soat ichida javob olasiz</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div
                class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <el-icon class="text-primary-600 text-xl"><Phone /></el-icon>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Bepul maslahat</h4>
                <p class="text-sm text-gray-600">
                  Mutaxassislarimiz yordam beradi
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div
                class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <el-icon class="text-secondary-600 text-xl"><Lock /></el-icon>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Xavfsiz ma'lumotlar</h4>
                <p class="text-sm text-gray-600">
                  Sizning ma'lumotlaringiz himoyalangan
                </p>
              </div>
            </div>
          </div>

          <!-- Contact info -->
          <div
            class="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white"
          >
            <h4 class="font-bold mb-4 text-secondary-100">Bog'lanish uchun</h4>
            <div class="space-y-3">
              <a
                href="tel:+998712000000"
                class="flex items-center space-x-3 hover:text-primary-100 transition-colors"
              >
                <el-icon><Phone /></el-icon>
                <span>+998 71 200 00 00</span>
              </a>
              <a
                href="mailto:info@enterprise.uz"
                class="flex items-center space-x-3 hover:text-primary-100 transition-colors"
              >
                <el-icon><Message /></el-icon>
                <span>info@enterprise.uz</span>
              </a>
              <div class="flex items-center space-x-3">
                <el-icon><Location /></el-icon>
                <span>Toshkent sh., Amir Temur ko'chasi</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div
          class="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100"
        >
          <!-- Success State -->
          <Transition
            enter-active-class="transition-all duration-500"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="isSuccess" class="text-center py-12">
              <div
                class="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
              >
                <el-icon class="text-4xl text-green-600"
                  ><CircleCheckFilled
                /></el-icon>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                {{ t("form.success") }}
              </h3>
              <p class="text-gray-600">{{ t("form.successMessage") }}</p>
            </div>
          </Transition>

          <!-- Form Steps -->
          <div v-if="!isSuccess">
            <!-- Steps indicator -->
            <div class="flex items-center justify-between mb-8">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="flex items-center"
                :class="{ 'flex-1': index < steps.length - 1 }"
              >
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                  :class="[
                    index <= currentStep
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-400',
                  ]"
                >
                  <el-icon v-if="index < currentStep"><Check /></el-icon>
                  <span v-else class="text-sm font-semibold">{{
                    index + 1
                  }}</span>
                </div>
                <div
                  v-if="index < steps.length - 1"
                  class="flex-1 h-1 mx-2 rounded-full transition-all duration-300"
                  :class="[
                    index < currentStep ? 'bg-primary-500' : 'bg-gray-200',
                  ]"
                ></div>
              </div>
            </div>

            <!-- Step 1: Personal Info -->
            <Transition
              enter-active-class="transition-all duration-300"
              leave-active-class="transition-all duration-200"
              enter-from-class="opacity-0 translate-x-4"
              leave-to-class="opacity-0 -translate-x-4"
            >
              <div v-if="currentStep === 0">
                <h3 class="text-xl font-bold text-gray-900 mb-6">
                  {{ steps[0].title }}
                </h3>
                <el-form
                  ref="step1Ref"
                  :model="formData"
                  :rules="formRules"
                  label-position="top"
                >
                  <el-form-item :label="t('form.fullName')" prop="fullName">
                    <el-input
                      v-model="formData.fullName"
                      :placeholder="t('form.fullNamePlaceholder')"
                      size="large"
                      class="!rounded-xl"
                    >
                      <template #prefix>
                        <el-icon class="text-gray-400"><User /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
            </Transition>

            <!-- Step 2: Contact -->
            <Transition
              enter-active-class="transition-all duration-300"
              leave-active-class="transition-all duration-200"
              enter-from-class="opacity-0 translate-x-4"
              leave-to-class="opacity-0 -translate-x-4"
            >
              <div v-if="currentStep === 1">
                <h3 class="text-xl font-bold text-gray-900 mb-6">
                  {{ steps[1].title }}
                </h3>
                <el-form
                  ref="step2Ref"
                  :model="formData"
                  :rules="formRules"
                  label-position="top"
                >
                  <el-form-item :label="t('form.phone')" prop="phone">
                    <el-input
                      v-model="formData.phone"
                      :placeholder="t('form.phonePlaceholder')"
                      size="large"
                      @input="handlePhoneInput"
                    >
                      <template #prefix>
                        <el-icon class="text-gray-400"><Phone /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
            </Transition>

            <!-- Step 3: Details -->
            <Transition
              enter-active-class="transition-all duration-300"
              leave-active-class="transition-all duration-200"
              enter-from-class="opacity-0 translate-x-4"
              leave-to-class="opacity-0 -translate-x-4"
            >
              <div v-if="currentStep === 2">
                <h3 class="text-xl font-bold text-gray-900 mb-6">
                  {{ steps[2].title }}
                </h3>
                <el-form
                  ref="step3Ref"
                  :model="formData"
                  :rules="formRules"
                  label-position="top"
                >
                  <el-form-item :label="t('form.amount')" prop="amount">
                    <el-input-number
                      v-model="formData.amount"
                      :placeholder="t('form.amountPlaceholder')"
                      :min="300000000"
                      :max="1000000000"
                      :step="50000000"
                      :formatter="formatAmount"
                      size="large"
                      class="!w-full"
                      controls-position="right"
                    />
                  </el-form-item>

                  <el-form-item :label="t('form.product')" prop="product">
                    <el-select
                      v-model="formData.product"
                      :placeholder="t('form.productPlaceholder')"
                      size="large"
                      class="!w-full"
                    >
                      <el-option
                        v-for="option in products"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </Transition>

            <!-- Navigation buttons -->
            <div
              class="flex items-center justify-between mt-8 pt-6 border-t border-gray-100"
            >
              <el-button
                v-if="currentStep > 0"
                size="large"
                class="!rounded-xl"
                @click="prevStep"
              >
                <el-icon class="mr-2"><ArrowLeft /></el-icon>
                {{ t("form.prev") }}
              </el-button>
              <div v-else></div>

              <el-button
                v-if="currentStep < 2"
                type="primary"
                size="large"
                class="!rounded-xl !px-8"
                @click="nextStep"
              >
                {{ t("form.next") }}
                <el-icon class="ml-2"><ArrowRight /></el-icon>
              </el-button>

              <el-button
                v-else
                type="danger"
                size="large"
                class="!rounded-xl !px-8 !bg-secondary-500 !border-secondary-500 hover:!bg-secondary-600 hover:!border-secondary-600"
                :loading="isSubmitting"
                @click="submitForm"
              >
                <el-icon v-if="!isSubmitting" class="mr-2"><Check /></el-icon>
                {{ isSubmitting ? t("form.submitting") : t("form.submit") }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
