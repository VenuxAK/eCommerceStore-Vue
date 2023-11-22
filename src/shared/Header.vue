<script setup>
import Navbar from "./Navbar.vue";
import Banner from "../views/home/Banner.vue";
</script>

<template>
  <header class="">
    <Navbar />
    <Banner v-if="$route.name == 'home'" />
  </header>
</template>

<style lang="scss" scoped>
header {
  .phone-link {
    @apply text-gray-700 hover:text-blue-600;
  }
}
</style>
