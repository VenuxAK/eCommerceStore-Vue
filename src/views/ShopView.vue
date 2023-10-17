<script setup>
import Layout from "../layouts/Layout.vue";
import Product from "../components/products/Product.vue";
import SimplePagination from "../components/paginations/SimplePagination.vue";
import Shop from "./shop/Shop.vue";
</script>

<template>
  <Layout>
    <Shop>
      <section>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          <div v-for="product in 12" :key="product">
            <Product :product="product" />
          </div>
        </div>
        <div class="w-full mx-auto">
          <SimplePagination />
        </div>
      </section>
    </Shop>
  </Layout>
</template>

<style lang="scss" scoped></style>
