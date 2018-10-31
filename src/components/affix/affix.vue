<template>
  <div>
    <div ref="point" :class="classes" :style="styles">
      <slot></slot>
    </div>
    <!-- 保留原始位置 -->
    <div v-show="shouldShowSubstitute" :style="substituteStyle"></div>
  </div>
</template>

<script>
import { on, off } from "../../utils/dom.js";
import { getScroll, getOffset } from "../../utils/calc.js";
const prefixCls = "iku-affix";
export default {
  name: "Affix",
  data() {
    return {
      shouldFixed: false,
      shouldShowSubstitute: false,
      styles: {},
      substituteStyle: {},
      container: ""
    };
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number
    },
    target: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  computed: {
    classes() {
      return [
        {
          [`${prefixCls}`]: this.shouldFixed
        }
      ];
    },
    offsetType() {
      let type = "top";
      if (this.offsetBottom >= 0) {
        type = "bottom";
      }
      return type;
    }
  },
  mounted() {
    this.container = this.target() ? this.target() : window;
    on(this.container, "scroll", this.handleScroll);
    on(this.container, "resize", this.handleScroll);
  },
  beforeDestroy() {
    off(this.container, "scroll", this.handleScroll);
    off(this.container, "resize", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = getScroll(this.container, true);
      const offset = getOffset(this.$el);
      const offsetTop = this.container.offsetTop || 0;
      const containerHeight = this.container.innerHeight;
      const elHeight = this.$el.getElementsByTagName("div")[0].offsetHeight;

      // Fixed Top
      if ((offset.top - this.offsetTop - offsetTop) < scrollTop && this.offsetType === "top" && !this.shouldFixed) {
        this.shouldFixed = true;
        this.styles = {
          top: `${this.offsetTop + offsetTop}px`,
          left: `${offset.left}px`,
          width: `${this.$el.offsetWidth}px`
        };
        this.shouldShowSubstitute = true;
        this.substituteStyle = {
          height: `${this.$refs.point.offsetHeight}px`,
          width: `${this.$refs.point.offsetWidth}px`
        };
        this.$emit("on-change", true);
      } else if ((offset.top - this.offsetTop - offsetTop) > scrollTop && this.offsetType === "top" && this.shouldFixed) {
        this.shouldFixed = false;
        this.styles = {};
        this.shouldShowSubstitute = false;
        this.substituteStyle = {};
        this.$emit("on-change", false);
      }

      // Fixed Bottom
      if ((offset.top + this.offsetBottom + elHeight + offsetTop) > (scrollTop + containerHeight) && this.offsetType === "bottom" && !this.shouldFixed) {
        this.shouldFixed = true;
        this.styles = {
          bottom: `${this.offsetBottom}px`,
          left: `${offset.left}px`,
          width: `${this.$el.offsetWidth}px`
        };
        this.$emit("on-change", true);
      } else if ((offset.top + this.offsetBottom + elHeight + offsetTop) < (scrollTop + containerHeight) && this.offsetType === "bottom" && this.shouldFixed) {
        this.shouldFixed = false;
        this.styles = {};
        this.$emit("on-change", false);
      }
    }
  }
};
</script>
