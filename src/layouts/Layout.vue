<script setup>
import Header from "../shared/Header.vue";
import Footer from "../shared/Footer.vue";
</script>

<template>
  <Header />
  <main class="container my-12 animate__animated animate__fadeIn">
    <slot />
  </main>
  <Footer />
</template>

<style lang="scss" scoped></style>
