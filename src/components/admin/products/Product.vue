<script setup>
const props = defineProps(["product"]);
</script>

<template>
  <div
    class="w-full mb-2 border border-gray-200 shadow dark:border-gray-700 rounded overflow-hidden"
  >
    <div>
      <RouterLink :to="`/admin/products/${product}/view`">
        <img :src="`/images/product/product${product}.jpg`" alt="" />
      </RouterLink>
    </div>
    <div class="px-2 py-3">
      <div class="text-sm">
        <h5 class="text-gray-800 dark:text-gray-300 truncate">Product Name</h5>
        <h5 class="text-gray-800 dark:text-gray-300 font-bold">$50</h5>
      </div>
      <div class="flex space-y-1 space-x-2 items-center justify-between">
        <div class="w-full">
          <!-- :to="`/admin/products/${product}/edit`" -->
          <RouterLink
            :to="{ name: 'edit-product', params: { slug: product } }"
            class="w-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 bg-transparent inline-flex items-center justify-center space-x-1 border border-gray-200 dark:border-gray-700 p-2 rounded transition-all"
          >
            <i class="fa-solid fa-pen"></i>
            <span class="hidden lg:block">Edit</span>
          </RouterLink>
        </div>
        <div class="w-full">
          <button
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
