<script setup>
import { RouterLink } from "vue-router";
import ShoppingCart from "../components/ShoppingCart.vue";
import SearchBox from "../components/SearchBox.vue";
import MobileNavbar from "../components/MobileNavbar.vue";
import { ref } from "vue";

import {
  UserIcon,
  Bars3BottomRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/vue/24/outline";

let open = ref(false);
let openMobileNavbar = ref(false);
const isOpenSearchBox = ref(false);
</script>

<template>
  <nav class="container flex justify-between items-center bg-inherit py-4 px-2">
    <div class="flex items-center space-x-6 md:space-x-14">
      <div class="brand">
        <!-- <RouterLink to="/">e<span>Store</span>.</RouterLink> -->
        <a href="/">e<span>Store</span>.</a>
      </div>
      <ul class="hidden md:flex md:space-x-4">
        <li>
          <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: $route.name == 'home' }"
            >Home</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/shop"
            class="nav-link"
            :class="{ active: $route.name == 'shop' }"
            >Shop</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="#"
            class="nav-link"
            :class="{ active: $route.name == 'pages' }"
            >Pages</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="#"
            class="nav-link"
            :class="{ active: $route.name == 'blog' }"
            >Blog</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="#"
            class="nav-link"
            :class="{ active: $route.name == 'contact' }"
            >Contact</RouterLink
          >
        </li>
      </ul>
    </div>
    <ul class="flex space-x-4">
      <li class="nav-icon">
        <button @click="isOpenSearchBox = true">
          <MagnifyingGlassIcon class="h-5 w-5" />
        </button>
      </li>
      <li class="nav-icon">
        <RouterLink to="/">
          <UserIcon class="h-5 w-5" />
        </RouterLink>
      </li>
      <li class="nav-icon">
        <button>
          <HeartIcon class="h-5 w-5" />
        </button>
      </li>
      <li class="nav-icon">
        <button @click="open = true">
          <ShoppingBagIcon class="h-5 w-5" />
        </button>
        <div
          class="cursor-pointer absolute inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-3 dark:border-gray-900"
        >
          20
        </div>
      </li>
      <li class="nav-icon md:hidden">
        <button @click="openMobileNavbar = true">
          <Bars3BottomRightIcon class="h-5 w-5" />
        </button>
      </li>
    </ul>
  </nav>
  <MobileNavbar
    :is-open="openMobileNavbar"
    @closeModal="openMobileNavbar = false"
  />
  <ShoppingCart :open="open" @close="open = false" />
  <SearchBox
    :is-open="isOpenSearchBox"
    @closeModal="isOpenSearchBox = false"
    @openModal="isOpenSearchBox = true"
  />
</template>

<style lang="scss" scoped>
.brand {
  a {
    @apply font-semibold text-2xl;
    span {
      @apply font-bold text-primary;
    }
  }
}
.nav-link {
  @apply relative min-w-0 flex-1 py-4 text-gray-700 text-sm font-medium text-center overflow-hidden focus:z-10 dark:bg-gray-800 dark:text-gray-300 hover:text-gray-900 transition-all;
  &.active {
    @apply text-gray-900 border-b-2 border-b-primary;
  }
}
.nav-icon {
  @apply relative text-lg text-gray-700 hover:text-gray-900 hover:scale-125 transition-all;
}
</style>
