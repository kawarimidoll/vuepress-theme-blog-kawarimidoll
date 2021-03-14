<!-- https://github.com/vuepress/vuepress-community/issues/69 -->
<!-- https://github.com/vuepress/vuepress-community/blob/main/packages/vuepress-plugin-table-of-contents/src/components/TableOfContents.ts -->
<!-- https://github.com/vuejs/vuepress/blob/f23028ec77/packages/%40vuepress/plugin-active-header-links/clientRootMixin.js -->
<script>
import debounce from "lodash.debounce";

export default {
  name: "TableOfContents",

  props: {
    includeLevel: {
      type: Array,
      required: false,
      default: () => [2, 3],
    },
    sidebarLinkClass: {
      type: String,
      required: false,
      default: "sidebar-link",
    },
    headerAnchorClass: {
      type: String,
      required: false,
      default: "header-anchor",
    },
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },

  methods: {
    onScroll: debounce(function () {
      this.setActiveHash();
    }, 300),

    setActiveHash() {
      const sidebarLinks = [
        ...document.querySelectorAll(`.${this.sidebarLinkClass}`),
      ];
      const anchors = [
        ...document.querySelectorAll(`.${this.headerAnchorClass}`),
      ].filter((anchor) =>
        sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash)
      );

      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      const bottomY = window.innerHeight + scrollTop;

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        const nextAnchor = anchors[i + 1];

        const isActive =
          (i === 0 && scrollTop === 0) ||
          (scrollTop >= anchor.parentElement.offsetTop + 10 &&
            (!nextAnchor ||
              scrollTop < nextAnchor.parentElement.offsetTop - 10));

        const routeHash = decodeURIComponent(this.$route.hash);
        if (isActive && routeHash !== decodeURIComponent(anchor.hash)) {
          const activeAnchor = anchor;
          // check if anchor is at the bottom of the page to keep $route.hash consistent
          if (bottomY === scrollHeight) {
            for (let j = i + 1; j < anchors.length; j++) {
              if (routeHash === decodeURIComponent(anchors[j].hash)) {
                return;
              }
            }
          }
          this.$vuepress.$set("disableScrollBehavior", true);
          this.$router.replace(decodeURIComponent(activeAnchor.hash), () => {
            // execute after scrollBehavior handler.
            this.$nextTick(() => {
              this.$vuepress.$set("disableScrollBehavior", false);
            });
          });
          return;
        }
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  computed: {
    headers() {
      if (!this.$page || !this.$page.headers) {
        return null;
      }

      const minLevel = this.includeLevel[0];
      const maxLevel = this.includeLevel[1];

      const processHeaders = (headers, rootLevel = minLevel) => {
        const result = [];

        for (let i = 0; i !== headers.length; ) {
          const nextRootOffset = headers
            .slice(i + 1)
            .findIndex((h) => h.level === rootLevel);
          const nextRootIndex =
            nextRootOffset === -1 ? headers.length : nextRootOffset + i + 1;
          const thisHeader = headers[i];

          if (thisHeader.level >= rootLevel && thisHeader.level <= maxLevel) {
            const childHeaders = headers.slice(i + 1, nextRootIndex);
            const children =
              rootLevel < maxLevel && childHeaders.length > 0
                ? processHeaders(childHeaders, rootLevel + 1)
                : null;

            result.push({ ...thisHeader, children });
          }

          i = nextRootIndex;
        }

        return result;
      };

      return processHeaders(this.$page.headers);
    },
  },

  render(h) {
    if (!this.headers) {
      return null;
    }

    const renderHeaders = (items) => {
      return h(
        "ul",
        items.map((item) =>
          h("li", [
            h(
              "RouterLink",
              {
                class: this.sidebarLinkClass,
                props: { to: `#${item.slug}` },
              },
              item.title
            ),
            item.children ? renderHeaders(item.children) : null,
          ])
        )
      );
    };

    return h("div", { class: "table-of-contents" }, [
      renderHeaders(this.headers),
    ]);
  },
};
</script>
