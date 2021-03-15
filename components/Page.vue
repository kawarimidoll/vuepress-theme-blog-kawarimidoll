<template>
  <article :key="page.key">
    <header>
      <h1>{{ page.title }}</h1>

      <PageMetadata :frontmatter="page.frontmatter" />

      <!-- <div v-if="page.frontmatter.image">                                      -->
      <!--   <img :src="page.frontmatter.image" :alt="page.title" loading="lazy" /> -->
      <!-- </div>                                                                   -->
    </header>

    <section>
      <Content :page-key="page.key" />
    </section>

    <PageNav :frontmatter="page.frontmatter" />
  </article>
</template>

<script>
import PageMetadata from "@theme/components/PageMetadata";
import PageNav from "@theme/components/PageNav";
export default {
  components: {
    PageMetadata,
    PageNav,
  },
  props: { page: { type: Object, required: true } },
};
</script>
