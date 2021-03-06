const { capitalize } = require("../utils");

export default {
  computed: {
    $title() {
      const site = this.$site;
      const page = this.$page;
      const siteTitle = this.$siteTitle;

      if (page.frontmatter.home) {
        return `${siteTitle} | ${site.description}`;
      }

      if (!page.frontmatter.title) {
        return page.title;
      }

      const { directories, frontmatters } = site.themeConfig.blogOptions;
      if (!directories || !frontmatters) {
        return page.title;
      }

      const directoryTitles = directories.map(
        (directory) => directory.title || capitalize(directory.id)
      );

      const frontmatterTitles = frontmatters.map(
        (frontmatter) => frontmatter.title || capitalize(frontmatter.id)
      );

      // frontmatters pagination sub pages
      for (const title of frontmatterTitles) {
        const match = page.frontmatter.title.match(
          new RegExp(String.raw`^Page (\d+) - ([^|]+) \| ?${title}$`)
        );
        if (match && match[1] && match[2]) {
          return `${title} "${match[2]}" | Page ${match[1]} | ${siteTitle}`;
        }
      }

      // frontmatters pagination entry page
      for (const title of frontmatterTitles) {
        const match = page.frontmatter.title.match(
          new RegExp(String.raw`^([^|]+) ?${title}$`)
        );
        if (match && match[1]) {
          return `${title} "${match[1]}" | ${siteTitle}`;
        }
      }

      // directories pagination sub pages
      for (const title of directoryTitles) {
        const match = page.frontmatter.title.match(
          new RegExp(String.raw`^Page (\d+) \| ?${title}$`)
        );
        if (match && match[1]) {
          const page = match[1];
          return title
            ? `${title} | Page ${page} | ${siteTitle}`
            : `Page ${page} | ${siteTitle}`;
        }
      }

      // directories pagination entry page
      for (const title of directoryTitles) {
        const match = page.frontmatter.title.match(
          new RegExp(String.raw`^${title}$`)
        );
        if (match) {
          return `${title} | ${siteTitle}`;
        }
      }

      // fallback
      return `${page.frontmatter.title} | ${siteTitle}`;
    },
  },
};
