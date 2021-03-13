<template>
  <div>
    <div v-for="page in pages" :key="page.key">
      <article>
        <header>
          <h2>
            <RouterLink :to="page.path">{{ page.title }}</RouterLink>
          </h2>
        </header>

        <section>
          <div v-html="page.summary" />
        </section>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: { type: Object, required: true },
  },
  computed: {
    pages() {
      return this.pagination.pages;
    },
  },
};
</script>
