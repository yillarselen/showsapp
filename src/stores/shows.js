import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    showsByGenres: {},
    searchResult: [],
    searchQuery: "",
    loading: false,
  }),
  getters: {
    getShows(state) {
      return state.showsByGenres;
    },
    getSearchResult(state) {
      return state.searchResult;
    },
    getSearchQuery(state) {
      return state.searchQuery;
    },
    getLoadingState(state) {
      return state.loading;
    },
  },
  actions: {
    async fetchShows() {
      const router = useRouter();
      try {
        this.searchResult = [];
        this.loading = true;
        const data = await axios.get("https://api.tvmaze.com/shows?page=1");

        const showsByGenres = {};

        for (const item of data.data) {
          if (item.image && item.image.medium && item.image.original) {
            for (const genre of item.genres) {
              if (genre in showsByGenres === false) {
                showsByGenres[genre] = [];
              }
              showsByGenres[genre].push(item);
            }
          }
        }
        this.showsByGenres = showsByGenres;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        router.push("/error");
      }
    },

    setQuery(query) {
      this.searchQuery = query;
    },

    setLoading(state) {
      this.loading = state;
    },

    async searchShow(query) {
      const router = useRouter();
      try {
        this.searchResult = [];
        this.loading = true;

        const data = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );

        this.searchResult = data.data
          .filter(
            (item) =>
              item.show.image &&
              item.show.image.medium &&
              item.show.image.original
          )
          .map((item) => item.show);

        this.loading = false;
      } catch (error) {
        this.loading = false;
        router.push("/error");
      }
    },
  },
});
