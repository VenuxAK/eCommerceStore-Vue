import "./libs/axios";
import "./assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FsLightbox from "fslightbox-vue/v3";
import "vue3-carousel/dist/carousel.css";
import "animate.css";
import "flowbite";
// import "@splidejs/vue-splide/css";
// import VueSplide from "@splidejs/vue-splide";
// app.use(VueSplide);

import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./libs/pinia";
import router from "./router";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.component("FsLightbox", FsLightbox);

app.mount("#app");



// import { useAuth } from "./stores/auth/useAuth";
// const store = useAuth();
// store.onAuthState().then(() => {
//   app.mount("#app");
// });

// import auth from "./stores/auth/auth";
// const { onAuthState } = auth();
// onAuthState().then((_user) => {
//   // console.log(_user);
//   app.mount("#app");
// });
