<script setup>
const props = defineProps(["product"]);
import { EyeIcon, HeartIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <div class="">
    <div class="relative w-full h-full overflow-hidden">
      <img :src="`/images/product/product${product}.jpg`" alt="" class="" />
      <div
        class="flex items-center justify-center absolute top-0 w-full h-full opacity-0 hover:opacity-100 bg-black/30"
      >
        <div class="flex">
          <button class="product-btn">
            <RouterLink :to="`/shop/products/slug-${product}`">
              <EyeIcon class="w-5 h-5 mx-auto" />
            </RouterLink>
          </button>
          <button class="product-btn">
            <HeartIcon class="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-1">
      <h3
        class="text-start text-gray-700 font-medium uppercase text-base hover:text-gray-900 truncate"
      >
        <RouterLink to="#"> Product {{ product }} </RouterLink>
      </h3>
      <h3 class="text-start text-primary font-medium mb-1">$200</h3>
      <button class="btn-primary-outline">Add To Cart</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-btn {
  @apply text-xl bg-primary text-white block m-1 w-8 h-8 rounded-full font-bold hover:bg-dark;
}
</style>
