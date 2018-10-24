<template>
  <div
    :class="wrapClasses"
    :style="wrapStyles">
    <!-- 收缩宽度为0 特殊 trigger -->
    <template v-show="showZeroTrigger">
      <slot name="zeroWidthTrigger">
        <span @click="toggleCollapse" :class="zeroTriggerClasses">
          <i class="iku-icon iku-icon-ios-menu"></i>
        </span>
      </slot>
    </template>
    <div :class="childClasses">
      <slot></slot>
    </div>
    <slot name="trigger">
      <div v-show="showBottomTrigger" @click="toggleCollapse" :class="triggerClasses">
      </div>
    </slot>
  </div>
</template>

<script>
import { on, off } from "../../utils/dom.js";
import { setMatchMedia, dimensionMap } from "../../utils/assist.js";
const prefixCls = "iku-layout-sider";
setMatchMedia(); // matchMedia方法注入
export default {
  name: "Sider",
  data() {
    return {
      mediaMatched: false
    };
  },
  props: {
    className: String,
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: 64
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    },
    reverseArrow: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: () => {
        return {};
      }
    },
    theme: {
      // light | dark
      type: String,
      default: "dark"
    },
    width: {
      type: [Number, String],
      default: 200
    },
    hideTrigger: {
      type: Boolean,
      default: false
    },
    breakpoint: {
      type: String,
      validator(value) {
        return ["xs", "sm", "md", "lg", "xl", "xxl"].includes(value);
      }
    }
  },
  computed: {
    isCollapsed: {
      get() {
        return this.collapsed;
      },
      set(val) {
        this.$emit("on-collapse", val);
      }
    },
    wrapClasses() {
      let collapsed = this.collapsed ? this.collapsed : this.firstCollapsed;
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        this.siderWidth ? "" : `${prefixCls}-zero-width`,
        collapsed ? `${prefixCls}-collapsed` : "",
        this.className ? this.className : ""
      ];
    },
    wrapStyles() {
      return {
        ...this.styles,
        width: `${this.siderWidth}px`,
        minWidth: `${this.siderWidth}px`,
        maxWidth: `${this.siderWidth}px`,
        flex: `0 0 ${this.siderWidth}px`
      };
    },
    childClasses() {
      return `${prefixCls}-children`;
    },
    zeroTriggerClasses() {
      return [
        `${prefixCls}-zero-width-trigger`,
        this.reverseArrow ? `${prefixCls}-zero-width-trigger-left` : ""
      ];
    },
    triggerClasses() {
      return [
        `${prefixCls}-trigger`,
        this.collapsed ? `${prefixCls}-trigger-collapsed` : ""
      ];
    },
    siderWidth() {
      return this.collapsible
        ? this.collapsed
          ? this.mediaMatched
            ? 0
            : parseInt(this.collapsedWidth)
          : parseInt(this.width)
        : this.width;
    },
    showZeroTrigger() {
      return this.collapsible
        ? (this.mediaMatched && !this.hideTrigger) ||
            (parseInt(this.collapsedWidth) === 0 &&
              this.collapsed &&
              !this.hideTrigger)
        : false;
    },
    showBottomTrigger() {
      return this.collapsible ? !this.mediaMatched && !this.hideTrigger : false;
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    matchMedia() {
      let matchMedia;
      if (window.matchMedia) {
        matchMedia = window.matchMedia;
      }
      let mediaPoint =
        this.breakpoint === "xs"
          ? `(min-width: ${dimensionMap[this.breakpoint]})`
          : `(max-width: ${dimensionMap[this.breakpoint]})`;
      this.mediaMatched = matchMedia(mediaPoint).matches;
    },
    onWindowResize() {
      this.matchMedia();
    }
  },
  mounted() {
    if (this.defaultCollapsed) {
      this.isCollapsed = this.defaultCollapsed;
    }
    if (this.breakpoint !== undefined) {
      on(window, "resize", this.onWindowResize);
      this.matchMedia();
    }
  },
  beforeDestroy() {
    if (this.breakpoint !== undefined) {
      off(window, "resize", this.onWindowResize);
    }
  }
};
</script>
