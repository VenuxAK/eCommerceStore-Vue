<script setup>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Product from "../../components/products/Product.vue";
const settings = {
  itemsToShow: 1,
  snapAlign: "center",
  wrapAround: true,
    autoplay: 3000,
};

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};
</script>

<template>
  <section class="container my-12">
    <h1 class="title">Top New Arrival</h1>
    <div class="my-5">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="product in 10" :key="product">
          <Product :product="product" class="carousel__item mx-3" />
        </Slide>

        <!-- <template #addons>
          <Navigation />
        </template> -->
      </Carousel>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.product-btn {
  @apply text-xl bg-danger text-white block m-1 w-8 h-8 rounded-full font-bold hover:bg-dark;
}
</style>
