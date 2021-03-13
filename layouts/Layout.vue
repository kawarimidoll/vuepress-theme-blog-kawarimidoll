<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-auto">
      <div class="flex">
        <div id="content">
          <PageList v-if="$pagination" :pagination="$pagination" />
          <Page v-else :page="$page" />
        </div>
        <aside id="sidebar" class="ml-auto">
          <Sidebar />
        </aside>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Footer from "@theme/components/Footer";
import Header from "@theme/components/Header";
import Page from "@theme/components/Page";
import PageList from "@theme/components/PageList";
import Sidebar from "@theme/components/Sidebar";
export default {
  components: {
    Footer,
    Header,
    Page,
    PageList,
    Sidebar,
  },
  created() {
    console.log("theme layout here!");
    console.log(this);
  },
};
</script>
