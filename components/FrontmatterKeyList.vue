<template>
  <div class="frontmatterkey-list">
    <header class="flex items-baseline" v-if="!noHeader">
      <h3 class="m-4">{{ capitalize(frontmatterKey.id) }}</h3>
      <RouterLink :to="frontmatterKey.path" class="block text-accent">
        show all ({{ frontmatterKey.list.length }})
      </RouterLink>
    </header>
    <RouterLink
      v-for="item in frontmatterKey.list.slice(0, limit)"
      :key="item[0]"
      :to="frontmatterKey.path + item[0]"
      :title="item[0]"
      class="inline-block border border-solid rounded-lg border-gray-300 px-2 py-1 m-1"
    >
      {{ item[0] }} ({{ item[1] }})
    </RouterLink>
  </div>
</template>

<script>
const utils = require("../utils");
export default {
  props: {
    frontmatterKey: { type: Object, required: true },
    limit: { type: Number, default: 999 },
    noHeader: { type: Boolean, default: false },
  },
  methods: {
    capitalize(text) {
      return utils.capitalize(text);
    },
  },
};
</script>
