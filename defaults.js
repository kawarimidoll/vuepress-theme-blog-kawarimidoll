const themeConfig = {
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
      id: "tag",
      keys: ["tags"],
      path: "/tags/",
    },
    {
      id: "category",
      keys: ["categories"],
      path: "/categories/",
    },
  ],
  globalPagination: {
    sorter: (prev, next) => (prev.regularPath < next.regularPath ? 1 : -1),
  },
};

const seoOptions = {};

const tailwindOptions = {};

module.exports = {
  themeConfig,
  searchOptions,
  blogOptions,
  seoOptions,
  tailwindOptions,
};
