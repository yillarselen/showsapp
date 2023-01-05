<script setup>
import { storeToRefs } from "pinia";
import ListItem from "./ListItem.vue";
import { onMounted } from "vue";
import Spinner from "./Spinner.vue";

//import shows store
import { useShowsStore } from "@/stores/shows";

const { fetchShows } = useShowsStore();

const { showsByGenres, loading } = storeToRefs(useShowsStore());

const slide = (direction, id) => {
  const slider = document.getElementById("slider-" + id);
  if (direction === "left") {
    slider.scrollLeft = slider.scrollLeft - 750;
  } else {
    slider.scrollLeft = slider.scrollLeft + 750;
  }
};

onMounted(() => {
  fetchShows();
});
</script>
<template>
  <Spinner data-testid="spinner" v-if="loading" />
  <div class="mb-10" v-for="(showsByGenre, key) in showsByGenres" :key="key">
    <template v-if="!loading && showsByGenre.length > 15">
      <h2
        class="text-slate-100 font-bold md:text-2xl text-lg pl-3 py-1 md:pl-12 md:py-3"
      >
        {{ key }}
      </h2>

      <div class="relative flex items-center group">
        <button
          @click="slide('left', key)"
          class="left-0 p-1 md:p-3 h-full transition ease-in delay-50 hover:delay-50 hover:bg-gray-900/50 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        >
          <font-awesome-icon
            icon="fa-solid fa-chevron-left"
            class="text-2xl md:text-5xl"
          />
        </button>
        <div
          :id="`slider-${key}`"
          class="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative slider"
        >
          <template v-for="show in showsByGenre" :key="show.id">
            <ListItem
              data-testid="list-item"
              :data="show"
              gridLayout="w-[160px] sm:w-[240px] inline-block"
            />
          </template>
        </div>
        <button
          @click="slide('right', key)"
          class="right-0 p-1 md:p-3 h-full transition ease-in delay-50 hover:delay-50 hover:bg-gray-900/50 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        >
          <font-awesome-icon
            icon="fa-solid fa-chevron-right"
            class="text-2xl md:text-5xl"
          />
        </button>
      </div>
    </template>
  </div>
</template>
