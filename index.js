const defaults = require("./defaults");

module.exports = (option, ctx) => {
  const { themeConfig, siteConfig } = ctx;

  const blogOptions = Object.assign(
    defaults.blogOptions,
    themeConfig.blogOptions || {}
  );

  themeConfig.directories ||= blogOptions.directories;
  themeConfig.frontmatters ||= blogOptions.frontmatters;

  const searchOptions = Object.assign(
    defaults.searchOptions,
    themeConfig.searchOptions || {}
  );

  const seoOptions = Object.assign(
    defaults.seoOptions,
    themeConfig.seoOptions || {}
  );

  const tailwindOptions = Object.assign(
    defaults.tailwindOptions,
    themeConfig.tailwindOptions || {}
  );

  siteConfig.themeConfig = themeConfig;

  return {
    name: "vuepress-theme-blog-kawarimidoll",
    plugins: [
      ["@vuepress/blog", blogOptions],
      "@vuepress/nprogress",
      "table-of-contents",
      "smooth-scroll",
      [
        "@vuepress/medium-zoom",
        {
          selector: "#content article section :not(a) > img",
        },
      ],
      ["@vuepress/search", searchOptions],
      ["seo", seoOptions],
      ["container", { type: "tip" }],
      ["container", { type: "warning" }],
      ["container", { type: "danger" }],
      [
        "container",
        {
          type: "details",
          before: (info) =>
            `<details class="custom-block details">${
              info ? `<summary>${info}</summary>` : ""
            }\n`,
          after: () => "</details>\n",
        },
      ],
      ["@kawarimidoll/tailwind", tailwindOptions],
    ],
  };
};
