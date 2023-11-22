<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<script setup>
import { onMounted, ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/vue/20/solid";
import { useStore } from "../../stores/eCommerce/products/useStore";
import { useCategory } from "../../stores/eCommerce/categories/useCategory";
import { useRoute, useRouter } from "vue-router";

const { getProducts, raw } = useStore();
const { getCategories, getSubCategories, getCategoryProducts } = useCategory();
const route = useRoute();
const router = useRouter();
const subCategories = ref([]);
let products = ref([]);
let routeParamChange = ref(router.currentRoute.value.query);
const sortOptions = [
  { name: "Up to Date", href: "#", current: true },
  // { name: "Best Rating", href: "#", current: false },
  { name: "Price: Low to High", href: "?price=low", current: false },
  { name: "Price: High to Low", href: "?price=high", current: false },
];
const filters = ref([
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
]);

const mobileFiltersOpen = ref(false);

const fetchProducts = async (query = "") => {
  const response_products = await getProducts(query);
  products.value = response_products.products;
};
const fetchSubCategoryProducts = async (query) => {
  const response = await raw(`/api/v1/products/types/${query}`);
  products.value = response.type.products;
};
const fetchCategoryProducts = async (slug) => {
  const response = await getCategoryProducts(slug);
  // const data = response.category.types;
  const response_product_types = response.category.types.filter((product) => {
    return product.products.length > 0;
  });
  products.value = response_product_types.flatMap(
    (_category) => _category.products
  );
};

onMounted(async () => {
  await fetchProducts();
  if (route.query.sub_category) {
    await fetchSubCategoryProducts(route.query.sub_category);
  } else if (route.query.category) {
    await fetchCategoryProducts(route.query.category);
  }
  const response_categories = await getCategories();
  filters.value.unshift({
    id: "main_category",
    name: "Main Category",
    options: response_categories.categories.map((option) => {
      return {
        value: option.slug,
        label: option.name,
        checked: false,
      };
    }),
  });

  const response = await getSubCategories();
  subCategories.value = response.product_types.filter((sub) => {
    return sub.products.length > 0;
  });
});

watch(
  () => router.currentRoute.value.query,
  async (toQuery, fromQuery) => {
    // console.log("Route parameters changes:", toQuery, fromQuery);
    let query = toQuery;
    routeParamChange.value = query;

    if (query.sub_category) {
      await fetchSubCategoryProducts(query.sub_category);
    } else if (query.price) {
      if (query.price === "low") {
        await fetchProducts("?price=low");
      } else if (query.price === "high") {
        await fetchProducts("?price=high");
      }
    } else if (query.category) {
      console.log(query);
      // const response = await raw(`/api/v1/categories/${query.category}`);
      // console.log(response);
    } else {
      await fetchProducts();
    }
  }
);
</script>

<template>
  <div class="">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog
          as="div"
          class="relative z-40 lg:hidden"
          @close="mobileFiltersOpen = false"
        >
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4 border-t border-gray-200">
                  <div class="p-4">
                    <h3 class="text-gray-800 text-xl font-medium mb-2">
                      Categories
                    </h3>
                    <ul
                      v-if="subCategories.length > 0"
                      role="list"
                      class="px-2 py-3 font-medium text-gray-900"
                    >
                      <li
                        v-for="category in subCategories"
                        :key="category.name"
                      >
                        <RouterLink
                          @click="mobileFiltersOpen = false"
                          :to="`/shop?sub_category=${category.slug}`"
                          >{{ category.type }}</RouterLink
                        >
                      </li>
                    </ul>
                  </div>

                  <Disclosure
                    as="div"
                    v-for="section in filters"
                    :key="section.id"
                    class="border-t border-gray-200 px-4 py-6"
                    v-slot="{ open }"
                  >
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                      >
                        <span class="font-medium text-gray-900">{{
                          section.name
                        }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon
                            v-if="!open"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                          <MinusIcon
                            v-else
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-mobile-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            :checked="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 min-w-0 flex-1 text-gray-500"
                            >{{ option.label }}</label
                          >
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
      <!-- End mobile filter dialog -->

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4"
        >
          <RouterLink
            to="/shop"
            class="text-4xl font-bold tracking-tight text-gray-900"
            >Shop</RouterLink
          >

          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sort
                  <ChevronDownIcon
                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem
                      v-for="option in sortOptions"
                      :key="option.name"
                      v-slot="{ active }"
                    >
                      <RouterLink
                        :to="option.href"
                        :class="[
                          option.current
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm',
                        ]"
                        >{{ option.name }}</RouterLink
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button
              type="button"
              class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span class="sr-only">View grid</span>
              <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              @click="mobileFiltersOpen = true"
            >
              <span class="sr-only">Filters</span>
              <FunnelIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <h3 class="text-gray-800 text-xl font-medium mb-5">Categories</h3>
              <ul
                role="list"
                class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                v-if="subCategories.length > 0"
              >
                <li v-for="category in subCategories" :key="category.name">
                  <RouterLink :to="`/shop?sub_category=${category.slug}`">{{
                    category.type
                  }}</RouterLink>
                </li>
              </ul>

              <Disclosure
                as="div"
                v-for="section in filters"
                :key="section.id"
                class="border-b border-gray-200 py-6"
                v-slot="{ open }"
              >
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span class="font-medium text-gray-900">{{
                      section.name
                    }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon
                        v-if="!open"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                      <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div
                      v-for="(option, optionIdx) in section.options"
                      :key="option.value"
                      class="flex items-center"
                    >
                      <input
                        :id="`filter-${section.id}-${optionIdx}`"
                        :name="`${section.id}[]`"
                        :value="option.value"
                        type="checkbox"
                        :checked="option.checked"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        :for="`filter-${section.id}-${optionIdx}`"
                        class="ml-3 text-sm text-gray-600"
                        >{{ option.label }}</label
                      >
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            <!-- Product grid -->
            <div :key="routeParamChange" class="lg:col-span-3">
              <slot :products="products" />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
