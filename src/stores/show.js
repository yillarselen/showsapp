import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

export const useShowStore = defineStore("show", {
  state: () => ({
    show: {},
    loading: false,
  }),
  getters: {
    getShow(state) {
      return state.show;
    },
  },
  actions: {
    async fetchShow(id) {
      const router = useRouter();
      try {
        this.loading = true;
        const data = await axios.get(
          `https://api.tvmaze.com/shows/${id}?embed=cast`
        );
        this.show = data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        router.push("/error");
      }
    },
  },
});
