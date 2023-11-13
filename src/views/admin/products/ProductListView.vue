<script setup>
import AdminLayout from "../../../layouts/AdminLayout.vue";
import Product from "../../../components/admin/products/Product.vue";
import Pagination from "../../../components/paginations/Pagination.vue";
import { RouterLink } from "vue-router";
import { useStore } from "../../../stores/eCommerce/products/useStore";
import { onMounted, ref } from "vue";

const { getProducts } = useStore();
let products = ref([]);

onMounted(async () => {
  const response = await getProducts();
  products.value = response.products;
  // console.log(products.value);
});
</script>

<template>
  <AdminLayout>
    <section class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="adm-title">Product List</h1>
        <div>
          <RouterLink to="/admin/products/create" class="btn-create">
            <i class="fa-solid fa-plus"></i>
            <span>Create</span>
          </RouterLink>
        </div>
      </div>
      <div class="products-grid-container">
        <div class="p-3 md:p-6 border-b border-gray-300 dark:border-gray-600">
          <form
            class="flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0"
          >
            <div class="">
              <input
                class="w-full border text-sm font-semibold text-gray-800 placeholder:text-gray-400 dark:text-white bg-transparent border-gray-300 dark:border-gray-600 rounded shadow focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none focus:ring-0"
                type="text"
                placeholder="Search..."
              />
            </div>
            <div
              class="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-3 md:space-y-0"
            >
              <div class="">
                <label for="underline_select" class="sr-only">Category</label>
                <select
                  id="underline_select"
                  class="block py-2.5 px-2 w-full text-sm text-gray-500 rounded bg-transparent border-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Category</option>
                  <option value="men">Men' Fashion</option>
                  <option value="women">Women's Fashion</option>
                  <option value="electronic-accessories">
                    Electronic Accessories
                  </option>
                  <option value="home-accessories">Home Accessories</option>
                  <option value="baby-and-toy">Baby and Toy</option>
                </select>
              </div>
              <div class="">
                <button
                  type="button"
                  class="w-full px-3 py-2 text-gray-500 dark:text-gray-400 rounded inline-flex items-center justify-between md:justify-start space-x-2 border border-gray-300 dark:border-gray-600"
                >
                  <span>Latest added</span>
                  <i class="fa-solid fa-sliders"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="p-3 md:p-6">
          <div
            v-if="products.length > 0"
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3"
          >
            <Product v-for="product in products" :product="product" />
          </div>
          <div v-else class="text-center py-20">
            <h2>No Products!</h2>
          </div>
          <div v-if="products.length > 0" class="mt-5">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<style lang="scss" scoped>
.products-grid-container {
  @apply w-full h-full bg-white dark:bg-slate-900 rounded;
}
.btn-create {
  @apply bg-primary text-white px-3 py-1 rounded inline-flex items-center space-x-2 hover:bg-primary/90 dark:hover:bg-primary/80 transition-all;
}
</style>
