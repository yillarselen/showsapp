import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    favorites: useStorage("favorites", []),
  }),
  getters: {
    getAllFavorites() {
      return this.favorites;
    },
  },
  actions: {
    toggleFavorite(show) {
      // Check if item is already selected
      const itemIsSelected = this.favorites.some(
        (element) => element.id === show.id
      );

      if (itemIsSelected) {
        const index = this.favorites.findIndex(
          (element) => element.id === show.id
        );

        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(show);
      }
    },
    checkFavorite(show) {
      return this.favorites.some((item) => item.id === show.id);
    },
  },
});
