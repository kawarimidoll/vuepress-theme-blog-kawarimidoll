<template>
  <div v-html="icon" />
</template>

<script>
import twemoji from "twemoji";
export default {
  props: {
    emoji: { type: String, require: true },
    iconClass: { type: String, default: "" },
  },
  computed: {
    icon() {
      return twemoji.parse(this.emoji, {
        className: `twemojicon ${this.iconClass}`,
        folder: "svg",
        ext: ".svg",
      });
    },
  },
};
</script>
