<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useShowStore } from "@/stores/show";
import Spinner from "./Spinner.vue";
import Cast from "./Cast.vue";
import FavoriteButton from "./FavoriteButton.vue";

const { fetchShow } = useShowStore();
const { show, loading } = storeToRefs(useShowStore());

const route = useRoute();
const router = useRouter();

const onBack = () => {
  if (!window.history.state.back || window.history.state.back === "/show") {
    router.push("/");
  } else {
    router.back();
  }
};

onMounted(() => {
  if (!route.params.id) return;

  fetchShow(route.params.id);
});
</script>
<template>
  <Spinner data-testid="spinner" v-if="loading" />
  <div
    v-else
    class="container mx-auto flex-none md:flex md:mt-12 px-3 md:px-6 relative"
  >
    <button
      data-testid="back-button"
      @click.prevent="onBack()"
      class="absolute top-0 right-10 invisible md:visible"
    >
      <div>
        <font-awesome-icon icon="fa-solid fa-xmark" size="3x" />
      </div>
    </button>
    <figure>
      <img
        data-testid="show-image"
        class="object-contain md:min-w-[280px] md:max-w-[280px] lg:min-w-[400px] lg:max-w-[400px] align-top rounded-md"
        :src="show.image?.original"
        :alt="show.name"
      />
    </figure>
    <div class="md:ml-10 lg:ml-16 mt-5 md:mt-0">
      <h1 class="text-2xl md:text-4xl font-semibold">{{ show.name }}</h1>
      <span data-testid="show-rating" class="text-gray-500 text-sm">
        Rating: {{ show.rating?.average || "N/A" }} |
        {{ show.premiered || "unkown" }} |
        {{ show.genres?.join(", ") }}
      </span>
      <p data-testid="show-summary" class="mt-5" v-html="show.summary"></p>
      <div class="flex mt-10">
        <a
          data-testid="imdb-url"
          v-if="show.externals?.imdb"
          :href="`https://www.imdb.com/title/${show.externals.imdb}/`"
          target="_blank"
          class="rounded bg-[#f5c518] px-4 py-2 mr-4 text-black font-semibold transform transition duration-500 hover:bg-[#cda822]"
        >
          <font-awesome-icon icon="fa-brands fa-imdb" size="xl" /> IMDb
        </a>
        <FavoriteButton data-testid="favorite-button" :show="show" />
      </div>
      <div class="mt-10">
        <h4 class="mt-5 text-xl font-semibold mb-5">Featured Cast</h4>

        <div
          class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-20"
        >
          <div v-for="cast in show?._embedded?.cast" :key="cast.id">
            <Cast data-testid="cast" :data="cast" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
