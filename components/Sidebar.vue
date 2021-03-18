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

      <p v-html="profile.descriptionHtml" class="mt-4 mb-0" />

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
import TOC from "@theme/components/TOC";
import Twemojicon from "@theme/components/Twemojicon";
export default {
  components: {
    SearchBox,
    TOC,
    Twemojicon,
  },
  computed: {
    profile() {
      return this.$themeConfig.profile || {};
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
        console.log("recentposts error");
        console.log(e);
        return [];
      }
    },
  },
};
</script>
