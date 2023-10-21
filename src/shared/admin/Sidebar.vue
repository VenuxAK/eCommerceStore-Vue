<script setup>
import { onMounted, ref } from "vue";

let is_expanded = ref(true);
let openProductsDropdown = ref(false);
let openOrdersDropdown = ref(false);
let openCustomersDropdown = ref(false);

const toggleSidebar = () => {
  is_expanded.value = !is_expanded.value;
  openProductsDropdown.value = false;
  openOrdersDropdown.value = false;
  openCustomersDropdown.value = false;
  localStorage.setItem("is_expanded", is_expanded.value);
};

const toggleDrowdown = (name) => {
  is_expanded.value = true;
  if (name === "products") {
    openProductsDropdown.value = !openProductsDropdown.value;
  } else if (name === "orders") {
    openOrdersDropdown.value = !openOrdersDropdown.value;
  } else if (name === "customers") {
    openCustomersDropdown.value = !openCustomersDropdown.value;
  }
};

onMounted(() => {
  if (screen.width > 768) {
    is_expanded.value = localStorage.getItem("is_expanded") == "true";
  } else {
    is_expanded.value = false;
  }
});
</script>

<template>
  <aside :class="is_expanded ? 'expand' : ''">
    <div class="relative w-full border-b dark:border-b-gray-800 h-16 mb-4">
      <div class="icon-wrapper">
        <div>
          <RouterLink to="/admin">
            <img src="/images/admin.png" class="w-8" alt="" />
          </RouterLink>
        </div>
        <div class="text-center ml-3">
          <h3 class="text-base font-bold text-gray-500">Admin</h3>
          <h5 class="text-xs font-medium text-gray-400">eStore.com</h5>
        </div>
      </div>
      <div class="toggler">
        <div>
          <button
            @click="toggleSidebar"
            class="text-xl text-gray-400 hover:text-gray-500 transition-all"
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="item">
        <RouterLink to="/admin">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-gauge"></i>
            </span>
            <span class="link-text"> Dashboard </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <button @click="toggleDrowdown('products')">
          <span class="dropdown-menu">
            <span class="link-icon">
              <i class="fa-solid fa-briefcase"></i>
            </span>
            <span class="link-text"> Products </span>
          </span>
          <span v-if="is_expanded" class="dropdown-icon">
            <i
              class="fa-solid fa-chevron-down"
              :class="openProductsDropdown ? 'open' : ''"
            >
            </i>
          </span>
        </button>
        <ul
          v-if="openProductsDropdown"
          class="dropdown-items"
          :class="openProductsDropdown ? 'open' : ''"
        >
          <li>
            <RouterLink to="/admin/products/create"> Add product </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/products"> Product list </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/products/categories">
              Categories
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="item">
        <RouterLink to="/admin/orders">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-cart-shopping"></i>
            </span>
            <span class="link-text"> Orders </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <button @click="toggleDrowdown('customers')">
          <span class="dropdown-menu">
            <span class="link-icon">
              <i class="fa-solid fa-user-group"></i>
            </span>
            <span class="link-text"> Customers </span>
          </span>
          <span v-if="is_expanded" class="dropdown-icon">
            <i
              class="fa-solid fa-chevron-down"
              :class="openCustomersDropdown ? 'open' : ''"
            >
            </i>
          </span>
        </button>
        <ul
          v-if="openCustomersDropdown"
          class="dropdown-items"
          :class="openCustomersDropdown ? 'open' : ''"
        >
          <li>
            <RouterLink to="/admin/customers/create"> Add customer </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/customers"> Customer list </RouterLink>
          </li>
        </ul>
      </div>
      <div class="item">
        <RouterLink to="/admin/statistic">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-chart-simple"></i>
            </span>
            <span class="link-text"> Statistic </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <RouterLink to="/admin/reviews">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-message"></i>
            </span>
            <span class="link-text"> Reviews </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <RouterLink to="/admin/transactions">
          <span>
            <span class="link-icon">
              <i class="fa-regular fa-credit-card"></i>
              <span class="mini-badge" />
            </span>
            <span class="link-text"> Transactions </span>
          </span>
          <span class="noti">
            <span class="badge">
              <span class="text-xs">10</span>
            </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <RouterLink to="/admin/sellers">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-globe"></i>
            </span>
            <span class="link-text"> Sellers </span>
          </span>
        </RouterLink>
      </div>
    </div>
    <div class="menu border-t dark:border-t-gray-800">
      <div class="item">
        <RouterLink to="/" target="_blank">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-home"></i>
            </span>
            <span class="link-text"> Home </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <RouterLink to="/admin/apperence">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-pen-fancy"></i>
            </span>
            <span class="link-text"> Apperence </span>
          </span>
        </RouterLink>
      </div>
      <div class="item">
        <RouterLink to="/admin/settings">
          <span>
            <span class="link-icon">
              <i class="fa-solid fa-gear"></i>
            </span>
            <span class="link-text"> Settings </span>
          </span>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  @apply w-[3.5rem] h-screen flex flex-col items-start
          sticky top-0 overflow-x-hidden overflow-y-auto
          border-r dark:border-r-gray-800  shadow bg-white dark:bg-slate-900 z-50 duration-200;
  .icon-wrapper {
    @apply hidden;
  }
  .toggler {
    @apply absolute top-4 right-5;
    button {
      i {
        @apply -rotate-180;
      }
    }
  }

  .menu {
    @apply p-1.5 flex flex-col w-full;
    .item {
      @apply text-gray-500 font-semibold text-base mb-2 w-full relative;
      a.router-link-exact-active {
        @apply bg-blue-50 dark:bg-gray-800 text-primary dark:text-gray-100;
      }
      a,
      button {
        @apply block md:hover:bg-gray-200 md:hover:text-gray-600 dark:hover:bg-gray-600 dark:md:hover:text-gray-100 px-3.5 py-2 rounded;
        span {
          @apply flex items-center;
          .link-icon {
            @apply mr-3;
          }
          .link-text {
            @apply opacity-0;
          }
        }
      }
      button {
        @apply flex justify-between items-center w-full;
        .dropdown-icon {
          i {
            @apply duration-200 ease-in-out;
            &.open {
              @apply duration-200 ease-in-out -rotate-180;
            }
          }
        }
      }

      .dropdown-items {
        @apply flex flex-col space-y-2 pl-7 mt-2 mb-3 duration-200 ease-in-out bg-white dark:bg-slate-900;
        &.open {
          @apply duration-200 ease-in-out;
        }
        li {
          // @apply;
        }
      }
      .mini-badge {
        @apply opacity-100 absolute top-2.5 left-7 w-2 h-2 bg-danger rounded-full duration-100;
      }
      .noti {
        @apply transition-all;
        .badge {
          @apply opacity-0 absolute top-2 right-0 inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 transition-all;
        }
      }
    }
  }

  &.expand {
    @apply w-[280px];

    .icon-wrapper {
      @apply flex items-center pt-3 pl-3;
    }

    .toggler {
      button {
        i {
          @apply rotate-0;
        }
      }
    }

    .menu {
      .item {
        a,
        button {
          .link-text {
            @apply opacity-100;
          }
        }
        .mini-badge {
          @apply opacity-0 transition-all;
        }
        .noti {
          @apply transition-all;
          .badge {
            @apply opacity-100 transition-all;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    @apply fixed;
  }
}
</style>
