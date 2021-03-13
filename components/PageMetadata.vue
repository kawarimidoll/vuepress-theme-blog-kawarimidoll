<template>
  <div class="metadata">
    <div v-if="frontmatter.date">
      <faIcon icon="clock" />
      <time :datetime="frontmatter.date"></time>
    </div>
    <div v-if="frontmatter.update">
      <faIcon icon="sync-alt" />
      <time :datetime="frontmatter.update"></time>
    </div>
    <div v-for="tag in this.tags" :key="tag.key">
      <RouterLink :to="tag.path">
        {{ tag.key }}
      </RouterLink>
    </div>
  </div>
</template>
<script>
export default {
  props: { frontmatter: { type: Object, required: true } },
  computed: {
    tags() {
      return this.frontmatter.tags.map((key) => this.$tag._metaMap[key]);
    },
  },
};
</script>
