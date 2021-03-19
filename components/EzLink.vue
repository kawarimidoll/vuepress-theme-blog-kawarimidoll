<script>
export default {
  functional: true,
  props: {
    to: { type: String, required: true },
    target: { type: String, default: "" },
    rel: { type: String, default: "" },
    title: { type: String, default: "" },
    noIcon: { type: Boolean, default: false },
  },
  render(h, { props: { to, target, rel, title, noIcon }, children, data }) {
    const isExt = to.startsWith("http");
    target = target || (isExt && "_blank");
    title = title || to;
    rel = rel || (isExt && "noopener noreferrer");
    const isBlank = target === "_blank";
    const tagName = isExt || isBlank ? "a" : "RouterLink";
    const attrs = tagName === "a" ? { href: to, target, rel, title } : { to };
    if (isBlank && !noIcon) children.push(h("OutboundLink"));
    return h(tagName, Object.assign(data, { attrs }), children);
  },
};
</script>
