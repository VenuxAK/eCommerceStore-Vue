<script setup></script>

<template>
  <section
    class="bg-gray-200 w-screen h-[30vh] flex items-center justify-center mb-10"
  >
    <!-- <img src="/images/banner/banner-2.jpg" alt="" class="object-cover" /> -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-700">Shop</h1>
      <h5 class="text-gray-700 text-sm">
        Home
        <span class="font-bold capitalize">
          {{ $route.name == "home" ? "" : " / " + $route.name }}</span
        >
      </h5>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
