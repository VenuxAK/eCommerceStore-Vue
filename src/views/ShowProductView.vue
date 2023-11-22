<script setup>
import { onMounted, ref } from "vue";
import Layout from "../layouts/Layout.vue";
import RelatedProducts from "./shop/RelatedProducts.vue";
import Spinner from "../components/spinners/Spinner.vue";
import NotFoundProduct from "../components/errors/NotFoundProduct.vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/vue/20/solid";
import { useStore } from "../stores/eCommerce/products/useStore";
import { useRouter } from "vue-router";

const props = defineProps(["slug"]);
const router = useRouter();
const { getProduct, getProducts } = useStore();
let product = ref(null);
let related_products = ref([]);
let currentSlide = ref(0);
let load = ref(false);
let notFound = ref(false);

const slideTo = (val) => {
  currentSlide.value = val;
};

const fetchRelatedProducts = async () => {
  const response = await getProducts(
    `related=${product.value.product_type_id}`
  );
  related_products.value = response.products;
  // console.log("Related products", response);
};

const fetchProduct = async () => {
  load.value = true;
  const response = await getProduct(props.slug);
  if (response.status_code === 404) {
    notFound.value = true;
    load.value = false;
    return;
  }
  notFound.value = false;
  load.value = false;
  product.value = response.product;
  console.log(product.value);
  if (product.value) {
    await fetchRelatedProducts();
  }
  // console.log(response);
};

onMounted(async () => {
  await fetchProduct();
});
</script>

<template>
  <Layout>
    <section v-if="product">
      <div class="w-full flex flex-col md:flex-row md:space-x-8">
        <div class="md:w-[45%]">
          <Carousel
            id="gallery"
            :items-to-show="1"
            :wrap-around="false"
            v-model="currentSlide"
          >
            <Slide v-for="image in product.images" :key="image">
              <div class="carousel__item mb-4 overflow-hidden">
                <div>
                  <img :src="image" class="object-cover" alt="" />
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
            <Slide v-for="(image, index) in product.images" :key="image">
              <div class="carousel__item p-1" @click="slideTo(index + 1 - 1)">
                <div>
                  <img :src="image" class="cursor-pointer" alt="" />
                </div>
              </div>
            </Slide>
          </Carousel>
        </div>
        <div class="md:w-[55%]">
          <div>
            <h3 class="title mb-4">{{ product.name }}</h3>
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
                  <span class="pl-2 font-light">{{ product.product_type }}</span>
                </h3>
              </div>
              <div>
                <h3 class="text-secondary font-medium text-lg">
                  Price:
                  <span class="pl-2 text-primary font-bold"
                    >${{ product.price }}</span
                  >
                </h3>
              </div>
              <div>
                <p class="text-secondary/80">
                  {{ product.description }}
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
                    <option
                      v-for="count in product.stock_quantity"
                      :key="count"
                      :value="count"
                    >
                      {{ count }}
                    </option>
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
              <div>
                <button
                  class="text-white bg-danger hover:bg-white hover:text-danger border border-transparent hover:border-danger focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center mr-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts :products="related_products" />
    </section>
    <section v-else>
      <div v-if="load" class="h-[50vh] flex justify-center items-center">
        <Spinner />
      </div>
      <NotFoundProduct v-if="notFound" />
    </section>
  </Layout>
</template>

<style lang="scss" scoped></style>
