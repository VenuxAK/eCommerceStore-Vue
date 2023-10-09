<script setup>
import Layout from "../layouts/Layout.vue";
import Product from "../components/Product.vue";
import Aside from "./shop/Aside.vue";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/vue/20/solid";
</script>

<template>
  <Layout>
    <section class="md:flex md:space-x-4">
      <Aside />

      <main class="w-full mx-2 md:mx-0">
        <div class="flex justify-between my-3">
          <div>
            <select
              id="default"
              class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-danger focus:border-danger block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-danger dark:focus:danger"
            >
              <option selected>Default Sorting</option>
              <option value="US">Price Low to High</option>
              <option value="CA">Price High to Low</option>
              <option value="FR">Latest Product</option>
            </select>
          </div>
          <div>
            <ul class="grid w-full gap-6 grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="hosting-small"
                  name="hosting"
                  value="hosting-small"
                  class="hidden peer"
                  checked
                  required
                />
                <label
                  for="hosting-small"
                  class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-primary dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <Squares2X2Icon class="w-4 h-4" />
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="hosting-big"
                  name="hosting"
                  value="hosting-big"
                  class="hidden peer"
                />
                <label
                  for="hosting-big"
                  class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-primary dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <ListBulletIcon class="w-4 h-4" />
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          <div v-for="product in 12" :key="product">
            <Product :product="product" />
          </div>
        </div>
      </main>
    </section>
  </Layout>
</template>

<style lang="scss" scoped></style>
