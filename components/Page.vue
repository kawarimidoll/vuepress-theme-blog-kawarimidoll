<template>
  <article :key="page.key">
    <header>
      <Twemojicon
        v-if="page.frontmatter.emoji"
        :emoji="page.frontmatter.emoji"
        iconClass="h-32 mx-auto"
      />
      <div>
        <h1>{{ page.title }}</h1>

        <PageMetadata :frontmatter="page.frontmatter" />
      </div>

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
import Twemojicon from "@theme/components/Twemojicon";
export default {
  components: {
    PageMetadata,
    PageNav,
    Twemojicon,
  },
  props: { page: { type: Object, required: true } },
};
</script>
