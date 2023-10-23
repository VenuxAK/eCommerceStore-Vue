<script setup>
import { onMounted, ref } from "vue";

let theme = ref("");
const toggleTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.setItem("theme", "light");
    theme.value = "light";
    document.documentElement.classList.remove("dark");
  } else {
    localStorage.setItem("theme", "dark");
    theme.value = "dark";
    document.documentElement.classList.add("dark");
  }
};

onMounted(() => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    theme.value = "dark";
    document.documentElement.classList.add("dark");
  } else {
    theme.value = "light";
    document.documentElement.classList.remove("dark");
  }
});

const noti = ref(false);
let isNotiActive = ref(true);
let profile = ref(false);

const openNotiModal = () => {
  isNotiActive.value = false;
  noti.value = !noti.value;
  profile.value = false;
};

const openProfileModal = () => {
  profile.value = !profile.value;
  noti.value = false;
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    isNotiActive.value = false;
    noti.value = false;
    profile.value = false;
  }
});
</script>

<template>
  <header class="header">
    <nav class="w-full h-full flex justify-between items-center md:pr-5">
      <div>
        <button class="text-gray-500 dark:text-gray-400 text-base">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <div>
          <button
            @click="toggleTheme"
            class="text-gray-500 dark:text-gray-400 text-base focus:outline-none"
          >
            <i
              class="fa-solid"
              :class="theme === 'dark' ? 'fa-moon' : 'fa-sun'"
            ></i>
          </button>
        </div>
        <div class="relative">
          <button
            @click="openNotiModal"
            class="text-gray-500 dark:text-gray-400 text-base focus:outline-none"
          >
            <i
              class="fa-solid fa-bell"
              :class="isNotiActive ? 'fa-bounce' : ''"
            >
              <span v-if="isNotiActive" class="mini-badge" />
            </i>
          </button>
          <div
            class="absolute top-10 end-0 z-10 mt-2 w-56 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
            role="menu"
            v-show="noti"
          >
            <div class="p-2">
              <h4
                class="text-sm font-bold text-gray-500 border-b dark:border-gray-800 pb-2"
              >
                New Notifications
              </h4>
              <a href="#" class="modal-item" role="menuitem">
                View on Storefront
              </a>

              <a href="#" class="modal-item" role="menuitem">
                View Warehouse Info
              </a>

              <a href="#" class="modal-item" role="menuitem">
                Duplicate Product
              </a>

              <a href="#" class="modal-item" role="menuitem">
                Unpublish Product
              </a>
            </div>
          </div>
        </div>

        <div class="relative">
          <button @click="openProfileModal" class="focus:outline-none">
            <img
              src="/images/avatar/avatar.png"
              class="w-8 rounded-full"
              alt=""
            />
          </button>
          <div
            class="absolute top-12 end-0 z-10 mt-2 w-56 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
            role="menu"
            v-show="profile"
          >
            <div class="p-2">
              <h4 class="text-sm border-b dark:border-gray-800 pb-2">
                <span class="font-bold text-gray-600 dark:text-gray-400 block"
                  >Minn Ar Kar</span
                >
                <span class="font-medium text-gray-500"
                  >minnarkar@gmail.com</span
                >
              </h4>
              <RouterLink to="/admin" class="modal-item" role="menuitem">
                Dashboard
              </RouterLink>

              <RouterLink
                to="/admin/settings"
                class="modal-item"
                role="menuitem"
              >
                Settings
              </RouterLink>

              <RouterLink to="#" class="modal-item" role="menuitem">
                Earnings
              </RouterLink>

              <button
                to="/admin/logout"
                class="modal-item text-start"
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply pl-5 pr-2 w-full h-16 border-b dark:border-b-0 dark:shadow-lg shadow-sm bg-white dark:bg-slate-900 sticky top-0 z-40;
  .mini-badge {
    @apply absolute top-0 -right-[2px] w-[7px] h-[7px] rounded-full bg-danger;
  }
  .modal-item {
    @apply block w-full rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-400;
  }
}
</style>
