<template>
  <div class="bg-gray-500">
    <header
      class="container mx-auto flex justify-between items-center text-white"
    >
      <RouterLink to="/" class="no-underline text-4xl font-semibold">
        {{ $siteTitle }}
      </RouterLink>
      <div class="md:hidden">
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
};
</script>
