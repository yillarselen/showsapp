<script setup>
import { storeToRefs } from "pinia";
import ContainerList from "@/components/ContainerList.vue";
import { useFavoriteStore } from "@/stores/favorites";

const { favorites } = storeToRefs(useFavoriteStore());
</script>
<template>
  <ContainerList title="Favorites" :list="favorites" />
</template>
