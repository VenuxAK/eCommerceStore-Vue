<script setup>
import Product from "../../components/products/Product.vue";
</script>

<template>
  <section class="container px-2 my-12">
    <h1 class="title">Recommanded For You</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 my-5">
      <div v-for="product in 8" :key="product">
        <Product :product="product" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
