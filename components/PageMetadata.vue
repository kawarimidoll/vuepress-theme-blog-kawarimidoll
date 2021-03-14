<template>
  <div class="md:flex">
    <div>
      <span v-if="published" class="mx-4">
        <faIcon icon="clock" />
        <time :datetime="published">{{ formatDate(published) }}</time>
      </span>
      <span v-if="modified" class="mx-4">
        <faIcon icon="sync-alt" />
        <time :datetime="modified">{{ formatDate(modified) }}</time>
      </span>
    </div>
    <div>
      <span v-if="tags.length > 0" class="mx-4">
        <faIcon icon="tag" />
        <span v-for="tag in tags" :key="tag.key" class="mx-1">
          <RouterLink :to="tag.path">{{ tag.key }}</RouterLink>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
const dayjs = require("dayjs");
export default {
  props: { frontmatter: { type: Object, required: true } },
  computed: {
    tags() {
      return this.frontmatter.tags.map((key) => this.$tag._metaMap[key]);
    },
    published() {
      const publishedTime = this.frontmatter.meta.find(
        (meta) => meta.property === "article:published_time"
      );
      return publishedTime ? publishedTime.content : null;
    },
    modified() {
      const modifiedTime = this.frontmatter.meta.find(
        (meta) => meta.property === "article:modified_time"
      );
      return modifiedTime ? modifiedTime.content : null;
    },
  },
  methods: {
    formatDate(time) {
      return dayjs(time).format(this.$themeConfig.dateFormat);
    },
  },
};
</script>
