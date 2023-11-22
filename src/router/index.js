import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import ShoppingBagView from "../views/ShoppingBagView.vue";
import ShowProductView from "../views/ShowProductView.vue";
import DashboardView from "../views/admin/DashboardView.vue";
import ProductList from "../views/admin/products/ProductListView.vue";
import { default as AdminShowProductView } from "../views/admin/products/ShowProductView.vue";
import CreateProduct from "../views/admin/products/CreateProductView.vue";
import EditProduct from "../views/admin/products/EditProductView.vue";
import CategoriesView from "../views/admin/categories/CategoriesView.vue";
import NotFound from "../views/error/NotFound.vue";
import pinia from "../libs/pinia";
import { useAuth } from "../stores/auth/useAuth";

const store = useAuth(pinia);
const { onAuthState } = store;
let user = null;
onAuthState().then((_user) => {
  user = _user;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: RegisterView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/signin",
      name: "signin",
      component: LoginView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/shop/products/:slug",
      name: "show-product",
      component: ShowProductView,
      props: true,
    },
    {
      path: "/shopping-bag",
      name: "shopping-bag",
      component: ShoppingBagView,
    },

    // Admin
    {
      path: "/admin",
      name: "admin",
      meta: {
        admin: true,
      },
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },
        // Products
        {
          path: "products",
          name: "product-list",
          children: [
            {
              path: "",
              name: "products",
              component: ProductList,
            },
            {
              path: ":slug/view",
              name: "view-product",
              component: AdminShowProductView,
              props: true,
            },
            {
              path: "create",
              name: "create-product",
              component: CreateProduct,
            },
            {
              path: ":slug/edit",
              name: "edit-product",
              component: EditProduct,
              props: true,
            },
            {
              path: "categories",
              name: "categories",
              component: CategoriesView,
            },
          ],
        },

        {
          path: "orders",
          name: "orders",
          component: DashboardView,
        },
        {
          path: "customers",
          name: "customers",
          component: DashboardView,
        },
        {
          path: "customers/create",
          name: "create-customer",
          component: DashboardView,
        },
        {
          path: "statistic",
          name: "statistic",
          component: DashboardView,
        },
        {
          path: "reviews",
          name: "reviews",
          component: DashboardView,
        },
        {
          path: "transactions",
          name: "transactions",
          component: DashboardView,
        },
        {
          path: "sellers",
          name: "sellers",
          component: DashboardView,
        },
        {
          path: "apperence",
          name: "apperence",
          component: DashboardView,
        },
        {
          path: "settings",
          name: "settings",
          component: DashboardView,
        },
      ],
    },

    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: () => import("../views/PrivacyAndPolicy.vue"),
    },
    {
      path: "/:patchMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.guest) {
    if (!user) {
      next();
    } else if (to.path !== "/") {
      // Check if the target route is different from the current route
      next("/");
    } else {
      // Avoid redirection to the same route to prevent infinite loop
      next();
    }
  } else if (to.meta.admin) {
    if (user && user.role === "admin") {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
