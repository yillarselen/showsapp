<script setup>
import debounce from "@/utils/debounce";
import { useShowsStore } from "@/stores/shows";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

let query = ref("");

// declare store variable
const { setQuery, searchShow } = useShowsStore();

const onInput = debounce(() => {
  setQuery(query.value);

  if (query.value.length === 0) {
    router.push({ path: "/" });
  }
  if (query.value.length > 2) {
    searchShow(query.value);
    router.push({ path: "/shows", query: { search: query.value } });
  }
}, 500);
</script>
<template>
  <div class="flex w-[12rem] md:w-[18rem] pl-9">
    <form class="w-full" @submit.prevent="onInput">
      <label class="relative block">
        <span class="sr-only">Search</span>
        <span
          class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300"
        >
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
        <input
          name="search"
          type="search"
          v-model="query"
          @input="onInput"
          class="rounded-full bg-gray-500 w-full px-4 py-1 md:py-2 pl-9 focus:outline-none"
          placeholder="Search"
        />
      </label>
    </form>
  </div>
</template>
