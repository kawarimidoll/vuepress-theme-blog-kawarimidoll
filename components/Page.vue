<template>
  <article :key="page.key">
    <header>
      <component :is="beforePageComponent" />

      <Twemojicon
        v-if="page.frontmatter.emoji"
        :emoji="page.frontmatter.emoji"
        iconClass="h-32 mx-auto"
      />
      <div>
        <h1>{{ page.title }}</h1>

        <PageMetadata :frontmatter="page.frontmatter" />
      </div>
    </header>

    <section>
      <Content :page-key="page.key" />
    </section>

    <PageNav :frontmatter="page.frontmatter" />

    <component :is="afterPageComponent" />
  </article>
</template>

<script>
import Vue from "vue";
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
  created() {
    this.beforePageComponent = Vue.component(
      this.$themeConfig.components.beforePage
    );
    this.afterPageComponent = Vue.component(
      this.$themeConfig.components.afterPage
    );
  },
  data() {
    return {
      beforePageComponent: null,
      afterPageComponent: null,
    };
  },
};
</script>
