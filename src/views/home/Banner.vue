<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="bg-gray-100 w-screen h-auto flex items-center justify-center mb-8 relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
  >
    <div class="absolute inset-0 bg-white/75"></div>
    <!-- relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 -->
    <!--  mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:h-screen lg:items-center  -->
    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex h-[85vh] lg:items-center lg:px-8"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Welcome to eStore.
          <strong class="font-extrabold text-primary sm:block">
            Shop smarter, save more – your one-stop shopping destination.
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          Your doorway to an amazing shopping adventure. We're excited to have
          you browse through our online store, where you'll discover a wide
          variety of products in many different categories.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <RouterLink
            class="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/95 focus:outline-none focus:ring active:bg-primary sm:w-auto"
            to="/shop"
          >
            Shop Now
          </RouterLink>

          <RouterLink
            class="block w-full rounded px-12 py-3 text-sm bg-white hover:bg-gray-50 font-medium text-primary hover:text-primary/95 focus:outline-none focus:ring active:text-primary sm:w-auto"
            to="/about"
          >
            Learn More
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- <img src="/images/banner/banner-2.jpg" alt="" class="object-cover" /> -->
    <!-- <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-700">Shop</h1>
      <h5 class="text-gray-700 text-sm">
        Home
        <span class="font-bold capitalize">
          {{ $route.name == "home" ? "" : " / " + $route.name }}</span
        >
      </h5>
    </div> -->
    <!-- <div
      class="w-full flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4"
    >
      <div class="md:w-[50%]">
        <h1>
          
        </h1>
        <h3 class="text-gray-600 text-center px-4">
          
        </h3>
      </div>
      <div class="md:w-[50%] overflow-hidden">
        <img src="/images/banner/banner-1.jpg" alt="" />
      </div>
    </div> -->
  </section>
</template>

<style lang="scss" scoped></style>
