<template>
  <i :class="['likeicon', `icon-${name}`]">
    <slot></slot>
  </i>
</template>
<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 14
    },
    fontUnit: {
      type: String,
      validator(val) {
        return [
          "px",
          "rem",
          "em",
          "%",
          "pt",
          "pc",
          "in",
          "cm",
          "mm",
          "ex",
          "vw",
          "vh"
        ].includes(val);
      },
      default: "px"
    },
    color: String
  }
};
</script>
