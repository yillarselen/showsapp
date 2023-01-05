<script setup>
import { defineProps } from "vue";
import FavoriteButton from "./FavoriteButton.vue";

const props = defineProps({
  data: Object,
  gridLayout: String,
});
</script>
<template>
  <router-link class="md:first-of-type:ml-10" :to="`/show/${data.id}`">
    <div class="cursor-pointer relative p-2" :class="gridLayout">
      <img
        data-testid="list-item-image"
        class="w-full h-auto block rounded-md"
        :src="data.image.medium"
        :alt="data.name"
      />
      <div
        class="transition ease-in delay-50 hover:delay-50 absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white"
      >
        <FavoriteButton class="right-4 absolute top-4" :show="data" />
        <div
          class="flex flex-col justify-center items-center h-full text-center"
        >
          <p class="whitespace-pre-wrap text-lg font-bold mb-6 px-3">
            {{ data.name }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>
