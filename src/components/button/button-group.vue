<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
import { oneOf } from "../../utils/assist";

const prefixCls = "iku-btn-group";

export default {
  name: "ButtonGroup",
  props: {
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"]);
      },
      default() {
        return !this.$IKU || this.$IKU.size === "" ? "default" : this.$IKU.size;
      }
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle", "circle-outline"]);
      }
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-vertical`]: this.vertical
        }
      ];
    }
  }
};
</script>
