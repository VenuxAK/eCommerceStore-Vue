<script setup>
import { makeStore } from "../../../stores/eCommerce/products/makeStore.js";
const props = defineProps(["product"]);

const { deleteProduct } = makeStore();

const onDelete = async (slug) => {
  if (confirm("Are you sure want to delete?")) {
    const response = await deleteProduct(slug);
  }
};
</script>

<template>
  <div
    class="w-full h-[290px] mb-2 border border-gray-200 shadow dark:border-gray-700 rounded overflow-hidden"
  >
    <div class="h-[60%] overflow-hidden">
      <RouterLink
        :to="`/admin/products/${product.slug}/view`"
        class="w-full h-full block"
      >
        <img
          :src="product.images[0]"
          alt=""
          class="object-cover w-full h-full transition-all hover:scale-105"
        />
      </RouterLink>
    </div>
    <div class="h-[40%] px-2 py-3">
      <div class="text-sm">
        <h5 class="text-gray-800 dark:text-gray-300 truncate">
          {{ product.name }}
        </h5>
        <h5 class="text-gray-800 dark:text-gray-300 font-bold">
          ${{ product.price }}
        </h5>
      </div>
      <div class="flex space-y-1 space-x-2 items-center justify-between">
        <div class="w-full">
          <!-- :to="`/admin/products/${product}/edit`" -->
          <RouterLink
            :to="{ name: 'edit-product', params: { slug: product.slug } }"
            class="w-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 bg-transparent inline-flex items-center justify-center space-x-1 border border-gray-200 dark:border-gray-700 p-2 rounded transition-all"
          >
            <i class="fa-solid fa-pen"></i>
            <span class="hidden lg:block">Edit</span>
          </RouterLink>
        </div>
        <div class="w-full">
          <button
            @click="onDelete(product.slug)"
            class="w-full text-red-500 hover:text-red-600 bg-transparent inline-flex items-center justify-center border space-x-1 border-gray-200 dark:border-gray-700 p-2 rounded transition-all"
          >
            <i class="fa-solid fa-trash-can"></i>
            <span class="hidden lg:block">Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
