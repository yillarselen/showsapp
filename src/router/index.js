import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShowView from "../views/ShowView.vue";
import SearchResultView from "../views/SearchResultView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/show/:id",
    name: "show",
    component: ShowView,
  },
  {
    path: "/shows",
    name: "searchResult",
    component: SearchResultView,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: NotFoundView,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
