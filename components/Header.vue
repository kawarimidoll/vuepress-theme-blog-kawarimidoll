<template>
  <div id="header" class="bg-gray-500 flex align-center justify-center">
    <header class="container flex justify-between items-center text-white">
      <RouterLink to="/" class="no-underline text-4xl font-semibold">
        <component :is="titleTag">
          {{ $siteTitle }}
        </component>
      </RouterLink>
      <div class="xl:hidden">
        <button @click="isOpen = !isOpen" class="focus:outline-none">
          <faIcon :icon="isOpen ? 'times' : 'bars'" class="fa-2x" />
        </button>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    titleTag() {
      return this.$route.path === "/" ? "h1" : "span";
    },
  },
};
</script>
