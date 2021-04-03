const themeConfig = {
  recentPostsLength: 10,
  summary: 200,
  dateFormat: "YYYY-MM-DD",
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

const mediumZoomOptions = {
  selector: "#content article section :not(a) > img",
};

const searchOptions = {
  searchMaxSuggestions: 10,
  test: null,
  searchHotkeys: ["s", "/"],
};

const socialShareOptions = {
  networks: ["twitter", "facebook", "line"],
  twitterUser: themeConfig.author,
  isPlain: true,
};

const seoOptions = {};

const tailwindOptions = {
  theme: {
    container: { center: true },
  },
};

const components = {
  afterFooter: "DefaultAfterFooter",
  afterHeader: "DefaultAfterHeader",
  afterPage: "DefaultAfterPage",
  afterPageList: "DefaultAfterPageList",
  afterSidebar: "DefaultAfterSidebar",
  beforePage: "DefaultBeforePage",
  beforePageList: "DefaultBeforePageList",
  beforePagination: "DefaultBeforePagination",
  beforeSidebar: "DefaultBeforeSidebar",
};

module.exports = {
  themeConfig,
  searchOptions,
  blogOptions,
  seoOptions,
  socialShareOptions,
  mediumZoomOptions,
  tailwindOptions,
  components,
};
