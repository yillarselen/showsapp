<script setup>
import SearchBar from "@/components/SearchBar.vue";
</script>
<template>
  <header
    class="flex items-center justify-between px-4 py-5 md:px-12 md:py-7 w-full"
  >
    <router-link to="/">
      <h1 class="text-red-600 text-3xl md:text-4xl cursor-pointer font-black">
        SHOWS
      </h1>
    </router-link>

    <div class="flex items-center">
      <SearchBar data-testid="search-bar" />
      <router-link
        to="/favorites"
        class="w-10 h-10 ml-4 text-3xl md:text-4xl hover:transition-all transform transition duration-500 hover:scale-110"
      >
        <font-awesome-icon icon="fa-regular fa-heart" />
      </router-link>
    </div>
  </header>
</template>
