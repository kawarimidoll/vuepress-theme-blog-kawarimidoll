const removeMd = require("remove-markdown");
const defaults = require("./defaults");

module.exports = (option, ctx) => {
  const { siteConfig } = ctx;

  const themeConfig = Object.assign(
    defaults.themeConfig,
    ctx.themeConfig || {}
  );

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

  const extendPageData = (page) => {
    const { frontmatter } = page;

    if (themeConfig.summary > 0) {
      const content = page.excerpt || page._strippedContent;
      if (!content) {
        return;
      }

      const summary = removeMd(
        content
          .trim()
          .replace(/:::.*(\n|\r|$)/g, "") // remove custom container sign
          .replace(/\[\[toc\]\]/gi, "") // remove [[toc]]
          .replace(/(\|\s*:?-+:?\s*)+\|/g, "") // remove table border
      ).replace(/\s+/g, " ");

      if (page.excerpt) {
        page.summary = summary + " ...";
      } else {
        page.summary =
          summary.slice(0, themeConfig.summary) +
          (summary.length > themeConfig.summary ? " ..." : "");
      }

      frontmatter.description ||= frontmatter.summary || page.summary;
    }
  };

  const ready = () => {
    blogOptions.directories.forEach((directory) => {
      ctx.pages
        .filter((page) => page.relativePath.startsWith(directory.dirname))
        .sort((prev, next) => blogOptions.globalPagination.sorter(prev, next))
        .forEach((p, i, s) => {
          p.frontmatter.next = s[i - 1] && s[i - 1].regularPath;
          p.frontmatter.prev = s[i + 1] && s[i + 1].regularPath;
        });
    });
  };

  return {
    name: "vuepress-theme-blog-kawarimidoll",
    extendPageData,
    plugins: [
      ["@vuepress/blog", blogOptions],
      ["@vuepress/back-to-top"],
      "@vuepress/nprogress",
      "smooth-scroll",
      [
        "@vuepress/medium-zoom",
        { selector: "#content article section :not(a) > img" },
      ],
      ["@vuepress/search", searchOptions],
      [
        "social-share",
        {
          networks: ["twitter", "facebook", "line"],
          twitterUser: themeConfig.author,
          isPlain: true,
        },
      ],
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
    ready,
  };
};
