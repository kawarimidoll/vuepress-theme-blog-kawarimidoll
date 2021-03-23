<template>
  <BaseLayout>
    <template #content>
      <div>
        <h1 class="mb-8">{{ $frontmatter.title }}</h1>

        <FrontmatterKeyList :frontmatterKey="frontmatterKey" :noHeader="true" />
      </div>
    </template>
  </BaseLayout>
</template>
<script>
import FrontmatterKeyList from "@theme/components/FrontmatterKeyList";
export default {
  components: {
    FrontmatterKeyList,
  },
  computed: {
    frontmatterKey() {
      return this.$themeConfig.frontmatterKeys.find(
        ({ id }) => id === this.$frontmatter.title.toLowerCase()
      );
    },
  },
};
</script>
