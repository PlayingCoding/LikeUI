<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf, findComponentDownward, findBrothersComponents, responseiveList } from '../../utils/assist.js'

const prefixCls = 'iku-row'

export default {
  name: 'URow',
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['flex'])
      }
    },
    align: {
      validator (value) {
        return oneOf(value, ['top', 'middle', 'bottom'])
      }
    },
    justify: {
      validator (value) {
        return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between'])
      }
    },
    gutter: [
      {
        type: Number,
        default: 0
      }, {
        type: Object,
        default: {}
      }
    ],
    className: String
  },
  computed: {
    classes () {
      return [
        {
          [`${prefixCls}`]: !this.type,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
          [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
          [`${this.className}`]: !!this.className
        }
      ]
    },
    styles () {
      let style = {}
      let gutterValue = 0
      if (typeof this.gutter === 'number') {
        gutterValue = this.gutter

      } else if (typeof this.gutters === 'object') {
        const type = responseiveList.foreach(v => {
          if (v.validator(window.clientWidth)) {
            return v.type
          }
        })
        gutterValue = this.gutter[type] || 0
      }
      if (gutterValue !== 0) {
        style = {
          marginLeft: `${gutterValue / -2}px`,
          marginMargin: `${gutterValue / -2}px`
        }
      }
    }
  },
  methods: {
    updateGutter (val) {
      // 纵向向下寻找 子UCol 组件
      const ColY = findComponentDownward(this, 'UCol')
      // 横向寻找 兄弟UCol 组件
      const ColX = findBrothersComponents(ColY, 'UCol', false)
      if (ColX.length) {
        ColX.forEach(child => {
          if (val !== 0) {
            child.gutter = val
          }
        })
      }
    }
  },
  watch: {
    gutter (val) {
      this.updateGutter(val)
    }
  }
}
</script>
