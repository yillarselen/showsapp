import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";

import "./assets/tailwind.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faXmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./assets/tailwind.css";

/* add icons to the library */
library.add(
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faXmark,
  faImdb,
  faHeart,
  farHeart
);

const pinia = createPinia();

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .mount("#app");
