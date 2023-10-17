<script setup>
import Features from "../components/Features.vue";
import Layout from "../layouts/Layout.vue";
import RecommandedProducts from "./home/RecommandedProducts.vue";
import TopNewArrival from "./home/TopNewArrival.vue";
</script>

<template>
  <Layout>
    <div>
      <Features />
    </div>
    <section class="container">
      <h1 class="title">Shop By Category</h1>
      <div class="grid grid-cols-3 gap-1 my-5">
        <div v-for="i in 6" :key="i">
          <div class="relative object-cover overflow-hidden cursor-pointer">
            <RouterLink to="#">
              <img
                :src="`/images/category/category-${i}.jpg`"
                alt=""
                class=""
              />
              <h1 class="category-name">Name</h1>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <TopNewArrival />
    <!-- <section class="container mb-8">
      <div class="border shadow-lg">
        <img
          src="/images/banner/ecommerce-banner-4.jpg"
          alt=""
          class="w-full h-full object-fill"
        />
      </div>
    </section> -->
    <RecommandedProducts />
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
