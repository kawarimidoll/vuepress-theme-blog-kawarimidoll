<template>
  <BaseLayout>
    <template #content>
      <PageList v-if="$pagination" :pagination="$pagination" />
      <Page v-else :page="$page" />
    </template>
  </BaseLayout>
</template>

<script>
import Page from "@theme/components/Page";
import PageList from "@theme/components/PageList";
export default {
  components: {
    Page,
    PageList,
  },
};
</script>
