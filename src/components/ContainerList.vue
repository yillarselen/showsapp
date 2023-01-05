<script setup>
import ListItem from "./ListItem.vue";
import Spinner from "./Spinner.vue";

const props = defineProps({
  title: String,
  list: Array,
  loading: Boolean,
  searchTerm: String,
});
</script>
<template>
  <div class="container mx-auto p-5 place-content-center">
    <Spinner data-testid="spinner" v-if="loading" />
    <div v-else-if="list.length">
      <h1 class="text-2xl ml-2 mb-1 border-b pb-3 border-gray-600">
        {{ title }}
      </h1>
      <div class="grid space-x-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div v-for="show in list" :key="show.id">
          <ListItem data-testid="list-item" :data="show" />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center text-xl mt-20">
      <p v-if="searchTerm">
        Your search for "{{ searchTerm }}" did not return any results.
      </p>
      <p v-else-if="title === 'Favorites'">Your favorite list is empty :(</p>
    </div>
  </div>
</template>
