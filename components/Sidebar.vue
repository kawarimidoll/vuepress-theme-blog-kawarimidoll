<template>
  <div id="component-sidebar" class="h-full">
    <SearchBox />

    <section v-if="profile.avatarUrl || profile.name">
      <h3 class="mt-0 mb-5">Profile</h3>
      <div class="flex">
        <img
          v-if="profile.avatarUrl"
          class="block rounded-full"
          :src="profile.avatarUrl"
          alt="avatar"
        />

        <div v-if="profile.name">
          <p class="my-0">
            <strong class="name">{{ profile.name }}</strong>
          </p>
          <p class="my-0 text-sm">
            {{ profile.subTitle }}
          </p>
        </div>
      </div>

      <p v-html="profile.descriptionHtml" class="my-4" />

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

      <div>
        <div v-for="frontmatterKey in frontmatterKeys" :key="frontmatterKey.id">
          <div class="flex items-baseline">
            <h3 class="m-4">{{ capitalize(frontmatterKey.id) }}</h3>
            <RouterLink :to="frontmatterKey.path" class="block text-accent">
              show all ({{ frontmatterKey.list.length }})
            </RouterLink>
          </div>
          <EzLink
            v-for="item in frontmatterKey.list.slice(0, 3)"
            :key="item[0]"
            :to="frontmatterKey.path + item[0]"
            :title="item[0]"
            class="inline-block border border-solid rounded-lg border-gray-300 px-2 py-1 m-1"
          >
            {{ item[0] }} ({{ item[1] }})
          </EzLink>
        </div>
      </div>

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
    </section>

    <TOC class="sticky top-0 hidden lg:block" />
  </div>
</template>
<script>
import SearchBox from "@SearchBox";
import EzLink from "@theme/components/EzLink";
import TOC from "@theme/components/TOC";
import Twemojicon from "@theme/components/Twemojicon";
export default {
  components: {
    SearchBox,
    EzLink,
    TOC,
    Twemojicon,
  },
  computed: {
    profile() {
      return this.$themeConfig.profile || {};
    },
    linkIcons() {
      return this.$themeConfig.linkIcons || [];
    },
    recentPosts() {
      const { blogOptions } = this.$themeConfig;
      try {
        const { dirname } = blogOptions.directories[0];

        // why globalPagination is null...?
        // const sorter = blogOptions.globalPagination.sorter(prev, next);

        const sorter = (prev, next) =>
          prev.regularPath < next.regularPath ? 1 : -1;

        return (
          this.$site.pages
            .filter(
              ({ relativePath }) =>
                relativePath && relativePath.startsWith(dirname)
            )
            .sort((prev, next) => sorter(prev, next))
            .slice(0, this.$themeConfig.recentPosts) || []
        );
      } catch (e) {
        console.warn("recentposts error");
        console.lowarn(e);
        return [];
      }
    },
    frontmatterKeys() {
      return this.$themeConfig.frontmatterKeys;
    },
  },
  methods: {
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
};
</script>
