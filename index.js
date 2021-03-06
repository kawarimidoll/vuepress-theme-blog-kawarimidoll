const removeMd = require("remove-markdown");
const defaults = require("./defaults");
const { capitalize } = require("./utils");

module.exports = (option, ctx) => {
  const { siteConfig, isProd } = ctx;

  const themeConfig = Object.assign(
    defaults.themeConfig,
    ctx.themeConfig || {}
  );

  const blogOptions = Object.assign(
    defaults.blogOptions,
    themeConfig.blogOptions || {}
  );
  themeConfig.blogOptions = blogOptions;
  if (blogOptions.feed) {
    themeConfig.linkIcons = [
      ...(themeConfig.linkIcons || []),
      { icon: "rss", name: "rss", url: "/rss.xml" },
    ];
  }

  const mediumZoomOptions = Object.assign(
    defaults.mediumZoomOptions,
    themeConfig.mediumZoomOptions || {}
  );
  themeConfig.mediumZoomOptions = mediumZoomOptions;

  const searchOptions = Object.assign(
    defaults.searchOptions,
    themeConfig.searchOptions || {}
  );
  themeConfig.searchOptions = searchOptions;

  const socialShareOptions = Object.assign(
    defaults.socialShareOptions,
    themeConfig.socialShareOptions || {}
  );
  themeConfig.socialShareOptions = socialShareOptions;

  const seoOptions = Object.assign(
    defaults.seoOptions,
    themeConfig.seoOptions || {}
  );
  themeConfig.seoOptions = seoOptions;

  const tailwindOptions = Object.assign(
    defaults.tailwindOptions,
    themeConfig.tailwindOptions || {}
  );
  themeConfig.tailwindOptions = tailwindOptions;

  const components = Object.assign(
    defaults.components,
    themeConfig.components || {}
  );
  themeConfig.components = components;

  const navLinks = themeConfig.navLinks || {};
  blogOptions.frontmatters.forEach(({ id, path }) => {
    if (!navLinks.find((navLink) => navLink.path === path)) {
      navLinks.push({ label: id, path });
    }
  });

  themeConfig.navLinks = navLinks.map(({ label, path }) => ({
    label: capitalize(label),
    path,
  }));

  themeConfig.isProd = isProd;
  siteConfig.themeConfig = themeConfig;

  const extendPageData = (page) => {
    const { frontmatter } = page;

    frontmatter.date = page.date;

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

  const extendMarkdown = (md) => {
    md.use(require("markdown-it-attrs"));
    md.use(require("markdown-it-deflist"));
    md.use(require("markdown-it-fontawesome"));
    md.use(require("markdown-it-footnote"));
    md.use(require("markdown-it-imsize"));
    md.use(require("markdown-it-mark"));
    md.use(require("markdown-it-sub"));
    md.use(require("markdown-it-sup"));
    md.use(require("markdown-it-video"));

    const twemoji = require("twemoji");
    md.renderer.rules.emoji = (token, idx) =>
      twemoji.parse(token[idx].content, { folder: "svg", ext: ".svg" });

    md.renderer.rules.footnote_ref = (tokens, idx, options, env) => {
      // it only works inline-style
      const { id, subId } = tokens[idx].meta;
      const { docId, footnotes } = env;
      const num = Number(id + 1).toString();
      const idPrefix = typeof docId === "string" ? `-${docId}-` : "";
      const refNum = `${num}${subId > 0 ? `:${subId}` : ""}`;
      const fnId = `fn${idPrefix}${num}`;
      const refId = `fnref${idPrefix}${refNum}`;
      const title = footnotes.list[id].content || "";
      return `<sup class="footnote-ref"><a href="#${fnId}" id="${refId}" title="${title}">[${refNum}]</a></sup>`;
    };
  };

  const ready = () => {
    const { pages } = ctx;

    themeConfig.recentPosts = {};

    // add prev/next links
    blogOptions.directories.forEach((directory) => {
      themeConfig.recentPosts[directory.id] = [];
      pages
        .filter((page) => page.relativePath.startsWith(directory.dirname))
        .sort((prev, next) => blogOptions.globalPagination.sorter(prev, next))
        .forEach((p, i, s) => {
          p.frontmatter.next = s[i - 1] && s[i - 1].regularPath;
          p.frontmatter.prev = s[i + 1] && s[i + 1].regularPath;
          if (i < themeConfig.recentPostsLength) {
            // page should be serialized to avoid circular reference
            themeConfig.recentPosts[directory.id].push({
              title: p.title,
              key: p.key,
              path: p.path,
              frontmatter: { emoji: p.frontmatter.emoji },
            });
          }
        });
    });

    // setup frontmatterKeys
    themeConfig.frontmatterKeys = blogOptions.frontmatters.map((target) => {
      const obj = {};
      pages.forEach((page) =>
        (page.frontmatter[target.keys] || []).forEach(
          (key) => (obj[key] = (obj[key] || 0) + 1)
        )
      );
      target.list = Object.entries(obj).sort((a, b) => b[1] - a[1]);
      return target;
    });
  };

  const detailsContainer = {
    type: "details",
    before: (info) =>
      `<details class="custom-block details">${
        info ? `<summary>${info}</summary>` : ""
      }\n`,
    after: () => "</details>\n",
  };

  return {
    name: "vuepress-theme-blog-kawarimidoll",
    extendPageData,
    extendMarkdown,
    plugins: [
      ["@vuepress/blog", blogOptions],
      ["@vuepress/back-to-top"],
      ["@vuepress/nprogress"],
      ["smooth-scroll"],
      ["@vuepress/medium-zoom", mediumZoomOptions],
      ["@vuepress/search", searchOptions],
      ["social-share", socialShareOptions],
      ["seo", seoOptions],
      ["container", { type: "tip" }],
      ["container", { type: "warning" }],
      ["container", { type: "danger" }],
      ["container", detailsContainer],
      ["@kawarimidoll/tailwind", tailwindOptions],
    ],
    ready,
  };
};
