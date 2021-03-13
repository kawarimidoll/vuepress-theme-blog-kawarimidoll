<template>
  <article :key="page.key">
    <header>
      <h1>{{ page.title }}</h1>
    </header>

    <section>
      <Content :page-key="page.key" />
    </section>
  </article>
</template>

<script>
export default {
  props: { page: { type: Object, required: true } },
};
</script>
