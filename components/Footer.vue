<template>
  <div id="footer" class="bg-gray-500 centering-child h-32 xl:h-24">
    <footer class="container xl:flex justify-between items-center text-white">
      <div class="centering-child xl:block">
        <EzLink
          v-for="item in linkIcons"
          :key="item.url"
          :to="item.url"
          :title="item.name || item.url"
          :noIcon="true"
          class="inline-block mx-2"
        >
          <faIcon :icon="item.icon" class="text-xl" />
        </EzLink>
      </div>
      <div class="centering-child xl:block">
        <EzLink
          v-for="item in navLinks"
          :key="item.path"
          :to="item.path"
          :title="item.label"
          class="inline-block mx-2"
        >
          {{ item.label }}
        </EzLink>
      </div>
      <div class="centering-child xl:block xl:ml-auto">
        <EzLink
          to="https://github.com/kawarimidoll/vuepress-theme-blog-kawarimidoll"
          title="vuepress-theme-blog-kawarimidoll"
          :noIcon="true"
          class="inline-block mx-2"
        >
          <faIcon icon="tshirt" />
          vuepress-theme-blog-kawarimidoll
        </EzLink>
      </div>
      <div class="centering-child xl:block">
        <span v-if="profile.name" class="inline-block ml-4">
          <faIcon icon="copyright" />
          {{ profile.name }}
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
import EzLink from "@theme/components/EzLink";
export default {
  components: {
    EzLink,
  },
  computed: {
    profile() {
      return this.$themeConfig.profile || {};
    },
    linkIcons() {
      return this.$themeConfig.linkIcons || [];
    },
    navLinks() {
      return this.$themeConfig.navLinks || [];
    },
  },
};
</script>
