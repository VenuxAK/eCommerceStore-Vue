<script setup>
import Layout from "../layouts/Layout.vue";
import { XMarkIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <Layout>
    <section class="container">
      <div class="mb-5">
        <h1 class="title">Shopping Carts</h1>
      </div>
      <div class="flex flex-col md:flex-row md:space-x-12">
        <div class="w-full md:w-[60%] flex flex-col">
          <div
            v-for="i in 5"
            :key="i"
            class="flex justify-between items-start border-t border-gray-200 py-3"
          >
            <div class="flex space-x-6">
              <div>
                <img
                  src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg"
                  alt=""
                  class="w-[192px] h-[192px] object-cover"
                />
              </div>
              <div
                class="flex flex-col md:flex-row md:justify-between md:space-x-12"
              >
                <div>
                  <h3 class="text-gray-600 font-medium text-base">Basic Tee</h3>
                  <h3 class="text-gray-400 text-sm">Small | Large</h3>
                  <h3 class="text-gray-600 font-bold text-base">$40.00</h3>
                </div>
                <div>
                  <label
                    for="default"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Quantity</label
                  >
                  <select
                    id="default"
                    class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button class="text-secondary hover:text-secondary/60 font-medium">
                <XMarkIcon class="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[40%] mt-8">
          <div>
            <h1 class="sub-title">Order Summery</h1>
          </div>
          <div class="flex flex-col mt-5">
            <div class="flex justify-between border-t py-4">
              <h5 class="text-base text-gray-600 font-medium">Subtotal</h5>
              <h5 class="text-base font-medium">$300</h5>
            </div>
            <div class="flex justify-between border-t py-4">
              <h5 class="text-base text-gray-600 font-medium">
                Shipping estimate
              </h5>
              <h5 class="text-base font-medium">$10</h5>
            </div>
            <div class="flex justify-between border-t py-4">
              <h5 class="text-base text-gray-600 font-medium">Order Total</h5>
              <h5 class="text-base font-medium">$310</h5>
            </div>
            <div class="mt-3">
              <RouterLink to="#" class="checkout-btn"> Checkout </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
.checkout-btn {
  @apply w-full block bg-primary hover:bg-primary/90 text-white text-center 
          py-2 px-2 rounded font-medium;
}
</style>
