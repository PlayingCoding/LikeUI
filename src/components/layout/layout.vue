<template>
  <div :class="wrapClasses" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = "iku-layout";

export default {
  name: "Layout",
  data() {
    return {
      hasSider: false
    };
  },
  props: {
    className: String,
    styles: Object
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-has-sider`]: this.hasSider,
          [`${this.className}`]: !!this.className
        }
      ];
    }
  },
  methods: {
    findSider() {
      return this.$children.some(child => {
        return child.$options.name === "Sider";
      });
    }
  },
  mounted() {
    this.hasSider = this.findSider();
  }
};
</script>
