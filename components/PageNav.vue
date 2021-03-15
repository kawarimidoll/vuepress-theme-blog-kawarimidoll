<template>
  <div v-if="prev || next">
    <hr />

    <div class="flex justify-between">
      <div v-if="prev" :class="navClass">
        <div><faIcon icon="chevron-left"></faIcon> Prev</div>
        <RouterLink class="block" :to="prev.path">
          {{ prev.title || prev.path }}
        </RouterLink>
      </div>

      <div v-if="next" :class="navClass" class="text-right ml-auto">
        <div>Next <faIcon icon="chevron-right"></faIcon></div>
        <RouterLink class="block" :to="next.path">
          {{ next.title || next.path }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    frontmatter: { type: Object, required: true },
  },
  data() {
    return {
      navClass: "my-4 px-4 w-1/2",
    };
  },
  computed: {
    prev() {
      return this.$site.pages.find(
        (page) => page.regularPath === this.frontmatter.prev
      );
    },

    next() {
      return this.$site.pages.find(
        (page) => page.regularPath === this.frontmatter.next
      );
    },
  },
};
</script>
