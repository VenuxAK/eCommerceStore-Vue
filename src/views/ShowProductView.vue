<script setup>
import { ref } from "vue";
import Layout from "../layouts/Layout.vue";
import RelatedProducts from "./shop/RelatedProducts.vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/vue/20/solid";

let currentSlide = ref(0);

const slideTo = (val) => {
  currentSlide.value = val;
};
</script>

<template>
  <Layout>
    <section class="px-2 md:px-0">
      <div class="w-full flex flex-col md:flex-row md:space-x-8">
        <div class="md:w-[45%]">
          <Carousel
            id="gallery"
            :items-to-show="1"
            :wrap-around="false"
            v-model="currentSlide"
          >
            <Slide v-for="src in 4" :key="src">
              <div class="carousel__item mb-4 overflow-hidden">
                <div>
                  <img
                    :src="`/images/product/product${src}.jpg`"
                    class="object-cover"
                    alt=""
                  />
                </div>
              </div>
            </Slide>
          </Carousel>

          <Carousel
            id="thumbnails"
            :items-to-show="4"
            :wrap-around="false"
            v-model="currentSlide"
            ref="carousel"
          >
            <Slide v-for="src in 4" :key="src">
              <div class="carousel__item p-1" @click="slideTo(src - 1)">
                <div>
                  <img
                    :src="`/images/product/product${src}.jpg`"
                    class="cursor-pointer"
                    alt=""
                  />
                </div>
              </div>
            </Slide>
          </Carousel>
        </div>
        <div class="md:w-[55%]">
          <div>
            <h3 class="title mb-4">Product Name</h3>
            <div class="flex flex-col space-y-3">
              <div>
                <h3 class="text-secondary font-medium text-lg">
                  Availability:
                  <span class="text-success pl-2 font-bold">In Stock</span>
                </h3>
              </div>
              <div>
                <h3 class="text-secondary font-medium text-lg">
                  Brand:
                  <span class="pl-2 font-light">Apex</span>
                </h3>
              </div>
              <div>
                <h3 class="text-secondary font-medium text-lg">
                  Category:
                  <span class="pl-2 font-light">Sofa</span>
                </h3>
              </div>
              <div>
                <h3 class="text-secondary font-medium text-lg">
                  Price:
                  <span class="pl-2 text-primary font-bold">$300</span>
                </h3>
              </div>
              <div>
                <p class="text-secondary/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                  ipsum voluptatibus atque, eum esse nemo! Odio vero porro alias
                  corrupti! Porro maiores beatae, ea hic iste nisi dolor
                  reiciendis odio!
                </p>
              </div>
              <div>
                <div class="w-[70px]">
                  <label
                    for="default"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Quantity</label
                  >
                  <select
                    id="default"
                    class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-5">
                <div>
                  <button
                    type="button"
                    class="text-white bg-primary hover:bg-white hover:text-primary border border-transparent hover:border-primary focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center mr-2"
                  >
                    <ShoppingBagIcon class="w-5 h-5 mr-2" />
                    ADD TO BAG
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    class="text-base text-secondary hover:text-primary border border-gray-300 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center"
                  >
                    <HeartIcon class="w-5 h-5 mr-2" />
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <RelatedProducts />
  </Layout>
</template>

<style lang="scss" scoped></style>
