import "./services/axios";
import "./assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FsLightbox from "fslightbox-vue/v3";
import "vue3-carousel/dist/carousel.css";
import "animate.css";
import "flowbite";
// import "@splidejs/vue-splide/css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { RouterLink } from "vue-router";
import { createPinia } from "pinia";
// import VueSplide from "@splidejs/vue-splide";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
// app.use(VueSplide);
app.component("FsLightbox", FsLightbox);
app.component("Link", RouterLink);

app.mount("#app");
