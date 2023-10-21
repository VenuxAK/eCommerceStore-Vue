<script setup></script>

<template>
  <nav class="flex justify-center items-center space-x-2 my-4">
    <RouterLink
      class="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
      to="#"
    >
      <span aria-hidden="true">«</span>
      <span class="sr-only">Previous</span>
    </RouterLink>
    <RouterLink
      class="w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
      to="#"
      aria-current="page"
      >1</RouterLink
    >
    <RouterLink
      class="w-10 h-10 text-gray-500 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
      to="#"
      >2</RouterLink
    >
    <RouterLink
      class="w-10 h-10 text-gray-500 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
      to="#"
      >3</RouterLink
    >
    <RouterLink
      class="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
      to="#"
    >
      <span class="sr-only">Next</span>
      <span aria-hidden="true">»</span>
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped></style>
