<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import {
  findComponentDownward,
  findBrothersComponents,
  responseiveList
} from "../../utils/assist.js";

const prefixCls = "iku-row";

export default {
  name: "Row",
  props: {
    type: {
      validator(value) {
        return ["flex"].includes(value);
      }
    },
    align: {
      validator(value) {
        return ["top", "middle", "bottom"].includes(value);
      }
    },
    justify: {
      validator(value) {
        return [
          "start",
          "end",
          "center",
          "space-around",
          "space-between"
        ].includes(value);
      }
    },
    gutter: [
      {
        type: Number,
        default: 0
      },
      {
        type: Object,
        default: {}
      }
    ],
    className: String
  },
  computed: {
    classes() {
      return [
        {
          [`${prefixCls}`]: !this.type,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
          [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
          [`${this.className}`]: !!this.className
        }
      ];
    },
    styles() {
      let style = {};
      let gutterValue = 0;
      if (typeof this.gutter === "number") {
        gutterValue = this.gutter;
      } else if (typeof this.gutters === "object") {
        const type = responseiveList.foreach(v => {
          if (v.validator(window.clientWidth)) {
            return v.type;
          }
        });
        gutterValue = this.gutter[type] || 0;
      }
      if (gutterValue !== 0) {
        style = {
          marginLeft: `${gutterValue / -2}px`,
          marginMargin: `${gutterValue / -2}px`
        };
      }
      return style;
    }
  },
  methods: {
    updateGutter(val) {
      // 纵向向下寻找 子 Col 组件
      const ColY = findComponentDownward(this, "Col");
      // 横向寻找 兄弟 Col 组件
      const ColX = findBrothersComponents(ColY, "Col", false);
      if (ColX.length) {
        ColX.forEach(child => {
          if (val !== 0) {
            child.gutter = val;
          }
        });
      }
    }
  },
  watch: {
    gutter(val) {
      this.updateGutter(val);
    }
  }
};
</script>
