<template>
  <div>
    <component :is="beforePageListComponent" />

    <div v-for="page in pages" :key="page.key">
      <article class="my-6">
        <header class="flex">
          <Twemojicon
            v-if="page.frontmatter.emoji"
            :emoji="page.frontmatter.emoji"
            iconClass="h-16"
            class="w-24"
          />
          <div>
            <h2>
              <RouterLink :to="page.path" class="font-semibold">
                {{ page.title }}
              </RouterLink>
            </h2>

            <PageMetadata :frontmatter="page.frontmatter" />
          </div>
        </header>

        <section class="my-2">
          <div v-html="page.summary" />
        </section>
      </article>
    </div>

    <component :is="beforePaginationComponent" />
    <!-- pagination will be here -->

    <component :is="afterPageListComponent" />
  </div>
</template>

<script>
import Vue from "vue";
import PageMetadata from "@theme/components/PageMetadata";
import Twemojicon from "@theme/components/Twemojicon";
export default {
  components: {
    PageMetadata,
    Twemojicon,
  },
  props: {
    pagination: { type: Object, required: true },
  },
  created() {
    this.beforePaginationComponent = Vue.component(
      this.$themeConfig.components.beforePagination
    );
    this.beforePageListComponent = Vue.component(
      this.$themeConfig.components.beforePageList
    );
    this.afterPageListComponent = Vue.component(
      this.$themeConfig.components.afterPageList
    );
  },
  data() {
    return {
      beforePaginationComponent: null,
      beforePageListComponent: null,
      afterPageListComponent: null,
    };
  },
  computed: {
    pages() {
      return this.pagination.pages;
    },
  },
};
</script>
