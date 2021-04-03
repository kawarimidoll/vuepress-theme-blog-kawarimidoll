<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <component :is="afterHeaderComponent" />

    <main class="container flex-auto my-4">
      <div class="px-8 xl:px-0 xl:flex">
        <div id="content" class="xl:mx-8 xl:content-width">
          <slot name="content" />
        </div>
        <aside id="sidebar">
          <Sidebar />
        </aside>
      </div>
    </main>

    <Footer />

    <component :is="afterFooterComponent" />
  </div>
</template>

<script>
import Vue from "vue";
import Footer from "@theme/components/Footer";
import Header from "@theme/components/Header";
import Sidebar from "@theme/components/Sidebar";
export default {
  components: {
    Footer,
    Header,
    Sidebar,
  },
  created() {
    if (!this.$themeConfig.isProd) {
      console.log("theme layout here!");
      console.log(this);
    }
    this.afterFooterComponent = Vue.component(
      this.$themeConfig.components.afterFooter
    );
    this.afterHeaderComponent = Vue.component(
      this.$themeConfig.components.afterHeader
    );
  },
  data() {
    return {
      afterFooterComponent: null,
      afterHeaderComponent: null,
    };
  },
};
</script>
