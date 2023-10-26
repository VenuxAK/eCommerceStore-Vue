import { createRouter, createWebHistory } from "vue-router";
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
    {
      path: "/shopping-bag",
      name: "shopping-bag",
      component: ShoppingBagView,
    },
    {
      path: "/admin",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/admin/products",
      name: "products",
      component: ProductList,
    },
    {
      path: "/admin/products/:slug/view",
      name: "view-product",
      component: AdminShowProductView,
    },
    {
      path: "/admin/products/create",
      name: "create-product",
      component: CreateProduct,
    },
    {
      path: "/admin/products/:slug/edit",
      name: "edit-product",
      component: EditProduct,
    },
    {
      path: "/admin/products/categories",
      name: "categories",
      component: CategoriesView,
    },
    {
      path: "/admin/orders",
      name: "orders",
      component: DashboardView,
    },
    {
      path: "/admin/customers",
      name: "customers",
      component: DashboardView,
    },
    {
      path: "/admin/customers/create",
      name: "create-customer",
      component: DashboardView,
    },
    {
      path: "/admin/statistic",
      name: "statistic",
      component: DashboardView,
    },
    {
      path: "/admin/reviews",
      name: "reviews",
      component: DashboardView,
    },
    {
      path: "/admin/transactions",
      name: "transactions",
      component: DashboardView,
    },
    {
      path: "/admin/sellers",
      name: "sellers",
      component: DashboardView,
    },
    {
      path: "/admin/apperence",
      name: "apperence",
      component: DashboardView,
    },
    {
      path: "/admin/settings",
      name: "settings",
      component: DashboardView,
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
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
