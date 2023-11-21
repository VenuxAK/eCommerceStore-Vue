<script setup>
import Features from "../components/Features.vue";
import Layout from "../layouts/Layout.vue";
import RecommandedProducts from "./home/RecommandedProducts.vue";
import TopNewArrival from "./home/TopNewArrival.vue";
import { useStore } from "../stores/eCommerce/products/useStore";
import { useCategory } from "../stores/eCommerce/categories/useCategory";

import { onMounted, ref } from "vue";
const { getCategories } = useCategory();
const { getProducts } = useStore();

let categories = ref([]);
let recommanded_products = ref([]);
let top_new_arrival_products = ref([]);

onMounted(async () => {
  const response_recommanded_products = await getProducts("latest=10");
  recommanded_products.value = response_recommanded_products.products;

  const response_latest_products = await getProducts("recommanded=10");
  top_new_arrival_products.value = response_latest_products.products;
  // console.log(response_latest_products);

  const response_categories = await getCategories();
  categories.value = response_categories.categories;
});
</script>

<template>
  <Layout>
    <div>
      <Features />
    </div>
    <section class="container">
      <h1 class="title">Shop By Category</h1>
      <div class="grid grid-cols-3 gap-1 my-5">
        <div v-for="category in categories" :key="category">
          <div class="relative object-cover overflow-hidden cursor-pointer">
            <RouterLink :to="`/shop?category=${category.slug}`">
              <img
                :src="category.thumbnail"
                alt=""
                class="w-full h-full aspect-square object-cover"
              />
              <h1 class="category-name">{{ category.name }}</h1>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <TopNewArrival :products="top_new_arrival_products" />

    <RecommandedProducts :products="recommanded_products" />

    <section class="my-12">
      <div>
        <RouterLink
          to="/shop"
          class="text-center block text-2xl text-primary font-medium underline"
          >Go to shop</RouterLink
        >
      </div>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
.category-name {
  @apply text-gray-100 font-bold text-sm md:text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10
            w-full h-full bg-black/50 hover:bg-black/75 flex items-center justify-center transition-all;
}
</style>
