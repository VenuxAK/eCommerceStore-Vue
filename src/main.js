import "./assets/css/main.css";
import FsLightbox from "fslightbox-vue/v3";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "vue3-carousel/dist/carousel.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { RouterLink } from "vue-router";

const app = createApp(App);

app.use(router);
app.component("FsLightbox", FsLightbox);
app.component("Link", RouterLink);

app.mount("#app");
