<script setup>
import Header from "@/components/Header.vue";
</script>
<template>
  <Header />

  <main class="mt-2 p-2 md:p-0">
    <router-view />
  </main>
</template>
