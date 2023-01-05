<script setup>
import ContainerList from "@/components/ContainerList.vue";
import { storeToRefs } from "pinia";

import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useShowsStore } from "@/stores/shows";

// declare store variable
const store = useShowsStore();
const { loading, searchResult } = storeToRefs(store);
const { searchShow } = store;

const route = useRoute();

onMounted(() => {
  if (!store.searchQuery.length && route.query.search) {
    searchShow(route.query.search);
  }
});
</script>
<template>
  <ContainerList
    :title="`Search results for: '${route.query.search}'`"
    :list="searchResult"
    :loading="loading"
    :searchTerm="route.query.search"
  />
</template>
