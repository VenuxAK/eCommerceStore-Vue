<script setup>
import Layout from "../layouts/Layout.vue";
import Product from "../components/products/Product.vue";
import SimplePagination from "../components/paginations/SimplePagination.vue";
import Shop from "./shop/Shop.vue";
import { useStore } from "../stores/eCommerce/products/useStore";
import { onMounted, ref, useSlots } from "vue";

// const props = defineProps(["products"]);
// console.log(props.products);
// const { getProducts } = useStore();
// let products = ref([]);

// onMounted(async () => {
//   const response = await getProducts();
//   products.value = response.products;
// });
</script>

<template>
  <Layout>
    <Shop v-slot="slotProps">
      <section>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          <div
            v-if="slotProps.products"
            v-for="product in slotProps.products"
            :key="product.id"
          >
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

<style lang="scss" scoped>
.variant {
  font-variant: small-caps;
}
</style>
