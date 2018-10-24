<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentUpward } from "../../utils/assist.js";

const prefixCls = "iku-col";

export default {
  name: "Col",
  props: {
    offset: [Number, String],
    order: [Number, String],
    pull: [Number, String],
    push: [Number, String],
    span: [Number, String],
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object],
    className: String
  },
  data() {
    return {
      gutter: 0
    };
  },
  computed: {
    classes() {
      let classList = [
        `${prefixCls}`,
        {
          [`${prefixCls}-offset-${this.offset}`]: this.offset,
          [`${prefixCls}-order-${this.order}`]: this.order,
          [`${prefixCls}-pull-${this.pull}`]: this.pull,
          [`${prefixCls}-push-${this.push}`]: this.push,
          [`${prefixCls}-span-${this.span}`]: this.span,
          [`${this.className}`]: !!this.className
        }
      ];
      ["xs", "sm", "md", "lg", "xl", "xxl"].forEach(size => {
        if (typeof this[size] === "number") {
          classList.push(`${prefixCls}-span-${size}-${this.size}`);
        } else if (typeof this[size] === "object") {
          let props = this[size];
          Object.keys(props).forEach(prop => {
            classList.push(
              prop !== "span"
                ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                : `${prefixCls}-span-${size}-${props[prop]}`
            );
          });
        }
      });
      return classList;
    },
    styles() {
      let style = {};
      if (this.gutter !== 0) {
        style = {
          paddingLeft: `${this.gutter / 2}px`,
          paddingRight: `${this.gutter / 2}px`
        };
      }
      return style;
    }
  },
  methods: {
    updateGutter() {
      const Row = findComponentUpward(this, "Row");
      if (Row) {
        Row.updateGutter(Row.gutter);
      }
    }
  },
  mounted() {
    this.updateGutter();
  },
  beforeDestroy() {
    this.updateGutter();
  }
};
</script>
