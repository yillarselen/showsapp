<script setup>
const props = defineProps({
  data: Object,
});
</script>
<template>
  <a data-testid="cast-person" :href="data.person.url" target="_blank">
    <figure>
      <img
        data-testid="cast-person-img"
        class="object-scale-down w-auto h-auto rounded-md"
        :src="`${
          data.person.image?.medium ||
          'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
        }`"
        :alt="data.person.name"
      />
      <figcaption
        data-testid="cast-person-name"
        class="mt-1 text-gray-400 text-xs"
      >
        {{ data.person.name || "" }} ({{ data.character.name || "" }})
      </figcaption>
    </figure>
  </a>
</template>
