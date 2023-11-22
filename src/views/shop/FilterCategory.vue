<script setup>
import { ref } from "vue";
import DropdownMenu from "../../components/dropdowns/DropdownMenu.vue";

let categories = ref([
  {
    id: 1,
    name: "Front-end",
  },
  {
    id: 2,
    name: "Back-end",
  },
  {
    id: 3,
    name: "Fullstack",
  },
  {
    id: 4,
    name: "Graphic Design",
  },
]);

let product_types = ref([
  {
    id: 1,
    name: "Vue JS",
  },
  {
    id: 2,
    name: "React JS",
  },
  {
    id: 3,
    name: "Svelte JS",
  },
  {
    id: 4,
    name: "Angular JS",
  },
  {
    id: 5,
    name: "Laravel",
  },
  {
    id: 6,
    name: "Node.js",
  },
  {
    id: 7,
    name: "Bun",
  },
  {
    id: 8,
    name: "Deno",
  },
]);
let openMenu = ref(false);
</script>

<template>
  <div class="w-full">
    <div>
      <h1 class="sub-title pl-3">Category</h1>
    </div>
    <ul class="md:w-48 text-sm font-medium pl-3">
      <li class="w-full" v-for="category in categories" :key="category.id">
        <DropdownMenu :title="category.name" height="h-auto">
          <ul class="w-full text-sm font-medium text-gray-900 pl-1.5">
            <li class="w-full" v-for="p_type in product_types" :key="p_type">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    :id="'vue-checkbox' + p_type.id"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    :for="'vue-checkbox' + p_type.id"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                    >{{ p_type.name }}</label
                  >
                </div>
                <div>
                  <h4>(14)</h4>
                </div>
              </div>
            </li>
          </ul>
        </DropdownMenu>
        <!-- <SubCategory :category="category" /> -->
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
