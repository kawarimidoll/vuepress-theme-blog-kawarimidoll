<template>
  <div class="md:flex">
    <div>
      <span v-if="published" class="inline-block mx-4">
        <faIcon icon="clock" />
        <time :datetime="published">{{ formatDate(published) }}</time>
      </span>
      <span v-if="modified" class="inline-block mx-4">
        <faIcon icon="sync-alt" />
        <time :datetime="modified">{{ formatDate(modified) }}</time>
      </span>
    </div>
    <div>
      <span v-if="tags.length > 0" class="inline-block mx-4">
        <faIcon icon="tag" />
        <span v-for="tag in tags" :key="tag.key" class="mx-1">
          <RouterLink :to="tag.path">{{ tag.key }}</RouterLink>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
// In honest, I want to use optional chaining...
const dayjs = require("dayjs");
export default {
  props: { frontmatter: { type: Object, required: true } },
  computed: {
    tags() {
      return (this.frontmatter.tags || []).map(
        (key) => this.$tag._metaMap[key]
      );
    },
    published() {
      return (
        (this.frontmatter.meta || []).find(
          (meta) => meta.property === "article:published_time"
        ) || {}
      ).content;
    },
    modified() {
      return (
        (this.frontmatter.meta || []).find(
          (meta) => meta.property === "article:modified_time"
        ) || {}
      ).content;
    },
  },
  methods: {
    formatDate(time) {
      return dayjs(time).format(this.$themeConfig.dateFormat);
    },
  },
};
</script>
