<script setup>
import FilterCategory from "./FilterCategory.vue";
</script>

<template>
  <aside class="md:basis-72 overflow-x-hidden">
    <div
      class="w-full flex md:flex-col justify-between border-l border-gray-200"
    >
      <FilterCategory />
      <div class="md:border-b border-gray-200">
        <div>
          <h1 class="sub-title pl-3">Price</h1>
        </div>
        <div class="mb-2 pl-3">
          <form>
            <div class="grid gap-3 mb-6 md:grid-cols-2">
              <div>
                <input
                  type="number"
                  id="min"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="min"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  id="max"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="max"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>
