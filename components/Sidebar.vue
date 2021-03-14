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
    </section>

    <TOC class="sticky top-0 hidden md:block" />
  </div>
</template>
<script>
import SearchBox from "@SearchBox";
export default {
  components: {
    SearchBox,
  },
  computed: {
    profile() {
      return this.$themeConfig.profile || {};
    },
  },
};
</script>
