<template>
  <div id="component-sidebar" class="h-full">
    <component :is="beforeSidebarComponent" />

    <SearchBox class="w-full px-4 my-2" />

    <section class="border border-solid rounded-lg border-gray-300 p-2 m-4">
      <div v-if="profile.avatarUrl" class="mt-2 mb-1 centering-child">
        <img class="block rounded-full" :src="profile.avatarUrl" alt="avatar" />
      </div>

      <div v-if="profile.name" class="p-1 centering-child">
        <strong class="block">{{ profile.name }}</strong>
      </div>
      <div v-if="profile.subTitle" class="centering-child">
        <div class="text-sm">{{ profile.subTitle }}</div>
      </div>
      <div v-if="profile.descriptionHtml" class="my-4 centering-child">
        <div v-html="profile.descriptionHtml" />
      </div>

      <div class="centering-child">
        <EzLink
          v-for="item in linkIcons"
          :key="item.url"
          :to="item.url"
          :title="item.name || item.url"
          :noIcon="true"
          class="inline-block px-1 text-accent"
        >
          <faIcon :icon="item.icon" class="text-4xl" />
        </EzLink>
      </div>
    </section>

    <FrontmatterKeyList
      v-for="frontmatterKey in frontmatterKeys"
      :key="frontmatterKey.id"
      :frontmatterKey="frontmatterKey"
      :limit="3"
    />

    <div v-if="recentPosts.length > 0">
      <h3 class="m-4">Recent Posts</h3>

      <div>
        <RouterLink
          v-for="post in recentPosts"
          :key="post.key"
          :to="post.path"
          class="flex block border border-solid rounded-lg border-gray-300 p-2 my-4"
        >
          <template v-if="post.frontmatter.emoji">
            <Twemojicon
              :emoji="post.frontmatter.emoji"
              iconClass="h-16"
              class="w-1/4"
            />
            <div class="w-3/4 pl-2">
              {{ post.title }}
            </div>
          </template>
          <template v-else>{{ post.title }}</template>
        </RouterLink>
      </div>
    </div>

    <TOC class="sticky top-0 hidden xl:block" />

    <component :is="afterSidebarComponent" />
  </div>
</template>
<script>
import Vue from "vue";
import SearchBox from "@SearchBox";
import FrontmatterKeyList from "@theme/components/FrontmatterKeyList";
import EzLink from "@theme/components/EzLink";
import TOC from "@theme/components/TOC";
import Twemojicon from "@theme/components/Twemojicon";
export default {
  components: {
    SearchBox,
    FrontmatterKeyList,
    EzLink,
    TOC,
    Twemojicon,
  },
  created() {
    this.beforeSidebarComponent = Vue.component(
      this.$themeConfig.components.beforeSidebar
    );
    this.afterSidebarComponent = Vue.component(
      this.$themeConfig.components.afterSidebar
    );
  },
  data() {
    return {
      beforeSidebarComponent: null,
      afterSidebarComponent: null,
    };
  },
  computed: {
    profile() {
      return this.$themeConfig.profile || {};
    },
    linkIcons() {
      return this.$themeConfig.linkIcons || [];
    },
    recentPosts() {
      return this.$themeConfig.recentPosts["post"];
    },
    frontmatterKeys() {
      return this.$themeConfig.frontmatterKeys;
    },
  },
};
</script>
