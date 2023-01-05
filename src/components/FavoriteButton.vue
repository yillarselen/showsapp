<script setup>
import { computed } from "vue";
import { useFavoriteStore } from "@/stores/favorites";

const { toggleFavorite, checkFavorite } = useFavoriteStore();

const props = defineProps({
  show: Object,
});

const isFavorite = computed(() => checkFavorite(props.show));
</script>
<template>
  <button
    class="w-10 h-10 rounded-full bg-white hover:bg-pink-100 hover:transition-all transform transition duration-500 hover:scale-110"
    @click.stop.prevent="toggleFavorite(show)"
  >
    <font-awesome-icon
      data-testid="favorite-icon"
      :class="[isFavorite ? 'text-red-500' : 'text-gray-500']"
      :icon="[isFavorite ? 'fa-solid' : 'fa-regular', 'fa-heart']"
      size="xl"
    />
  </button>
</template>
