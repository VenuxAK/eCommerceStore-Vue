<script setup>
import Product from "../../components/Product.vue";
</script>

<template>
  <section class="my-12 py-8 border-t border-gray-300">
    <div>
      <h1 class="title mb-4">Related Products</h1>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="product in 4" :key="product">
        <Product :product="product" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
