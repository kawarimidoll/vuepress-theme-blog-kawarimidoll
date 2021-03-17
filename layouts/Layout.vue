<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="container flex-auto my-4">
      <div class="xl:flex">
        <div id="content" class="mx-auto xl:mx-0 xl:px-8">
          <PageList v-if="$pagination" :pagination="$pagination" />
          <Page v-else :page="$page" />
        </div>
        <aside id="sidebar" class="mx-auto xl:mr-0 ml-auto">
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
