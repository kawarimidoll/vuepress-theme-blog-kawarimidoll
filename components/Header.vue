<!-- [初めてでもわかるTailwindcss入門(2)ナビゲーションバー | アールエフェクト](https://reffect.co.jp/html/tailwind-for-beginners-navigation-menu) -->
<template>
  <div id="header" class="bg-base centering-child text-white">
    <header class="container xl:flex justify-between items-center h-32 xl:h-24">
      <div class="centering-child mt-6 xl:mt-0">
        <RouterLink to="/" class="block no-underline text-4xl font-semibold">
          <component :is="titleTag">
            {{ $siteTitle }}
          </component>
        </RouterLink>
      </div>
      <div v-if="navLinks.length > 0" class="centering-child mt-2 h-8">
        <div class="flex">
          <RouterLink
            v-for="item in navLinks"
            :key="item.path"
            :to="item.path"
            :title="item.label"
            :aria-label="item.label"
            class="block mx-4"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    titleTag() {
      return this.$route.path === "/" ? "h1" : "span";
    },
    navLinks() {
      return this.$themeConfig.navLinks || [];
    },
  },
};
</script>
