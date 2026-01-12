<script setup>
import { ref } from 'vue'

const { t } = useI18n()
const { scrollToElement } = useScrollTo()

const products = ref([
  {
    id: 'murabaha',
    icon: 'ShoppingCart',
    color: 'primary',
    gradient: 'from-primary-500 to-primary-700',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  {
    id: 'ijara',
    icon: 'Key',
    color: 'green',
    gradient: 'from-green-500 to-green-700',
    bgLight: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    id: 'musharaka',
    icon: 'Connection',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: 'mudaraba',
    icon: 'TrendCharts',
    color: 'secondary',
    gradient: 'from-secondary-500 to-secondary-600',
    bgLight: 'bg-secondary-50',
    textColor: 'text-secondary-600',
  },
])

const activeProduct = ref(null)
const selectedProductId = ref(null)
const showProductDetail = ref(false)

const scrollToContact = () => {
  scrollToElement('#contact')
}

const openProductDetail = (productId) => {
  selectedProductId.value = productId
  showProductDetail.value = true
  document.body.style.overflow = 'hidden'
}

const closeProductDetail = () => {
  showProductDetail.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <section id="products" class="py-20 md:py-28 gradient-bg relative overflow-hidden">
    <!-- Decorative -->
    <div class="absolute top-20 left-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6">
          <el-icon class="text-primary-500 mr-2"><Grid /></el-icon>
          <span class="text-sm font-medium text-gray-700">{{ t('products.title') }}</span>
        </div>

        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {{ t('products.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t('products.subtitle') }}
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative bg-white rounded-2xl shadow-card hover:shadow-card-hover p-6 lg:p-8 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
          @mouseenter="activeProduct = product.id"
          @mouseleave="activeProduct = null"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
            :class="[`bg-gradient-to-br ${product.gradient}`]"
          >
            <el-icon class="text-white text-2xl">
              <component :is="product.icon" />
            </el-icon>
          </div>

          <!-- Badge -->
          <div
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4"
            :class="[product.bgLight, product.textColor]"
          >
            {{ t(`products.${product.id}.name`) }}
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-secondary-600 mb-3 group-hover:text-secondary-500 transition-colors">
            {{ t(`products.${product.id}.title`) }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 text-sm leading-relaxed mb-6">
            {{ t(`products.${product.id}.description`) }}
          </p>

          <!-- CTA -->
          <button
            class="flex items-center text-sm font-semibold transition-all duration-300 group-hover:translate-x-1"
            :class="product.textColor"
            @click.stop="openProductDetail(product.id)"
          >
            {{ t('common.learnMore') }}
            <el-icon class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><ArrowRight /></el-icon>
          </button>

          <!-- Hover decoration -->
          <div
            class="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300"
            :class="[
              activeProduct === product.id
                ? `bg-gradient-to-r ${product.gradient} opacity-100`
                : 'opacity-0'
            ]"
          ></div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <p class="text-gray-600 mb-6">Qaysi mahsulot sizga mos keladi? Biz bilan maslahatlashing!</p>
        <el-button
          type="danger"
          size="large"
          class="!rounded-xl !px-8 !py-6 !text-base !font-semibold !bg-secondary-500 !border-secondary-500 hover:!bg-secondary-600 hover:!border-secondary-600"
          @click="scrollToContact"
        >
          <el-icon class="mr-2"><ChatLineRound /></el-icon>
          {{ t('common.contactUs') }}
        </el-button>
      </div>
    </div>

    <!-- Product Detail Modal -->
    <ProductDetail
      v-if="selectedProductId"
      :product-id="selectedProductId"
      :visible="showProductDetail"
      @close="closeProductDetail"
    />
  </section>
</template>
