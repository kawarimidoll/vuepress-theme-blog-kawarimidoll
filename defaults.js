const themeConfig = {
  recentPostsLength: 10,
  summary: 200,
  dateFormat: "YYYY-MM-DD",
};

const searchOptions = {
  searchMaxSuggestions: 10,
  test: null,
  searchHotkeys: ["s", "/"],
};

const blogOptions = {
  directories: [
    {
      id: "post",
      dirname: "_posts",
      path: "/",
      title: "",
      frontmatter: {
        home: true,
      },
    },
  ],
  frontmatters: [
    {
      id: "category",
      keys: ["categories"],
      path: "/categories/",
    },
    {
      id: "tag",
      keys: ["tags"],
      path: "/tags/",
    },
  ],
  globalPagination: {
    sorter: (prev, next) => (prev.regularPath < next.regularPath ? 1 : -1),
  },
};

const seoOptions = {};

const tailwindOptions = {
  theme: { container: { center: true, padding: "2rem" } },
};

const components = {
  afterFooter: "DefaultAfterFooter",
};

module.exports = {
  themeConfig,
  searchOptions,
  blogOptions,
  seoOptions,
  tailwindOptions,
  components,
};
