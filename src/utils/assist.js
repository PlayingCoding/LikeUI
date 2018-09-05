/**
 * 判断参数是否被数组包含
 * @export
 * @param {any} value
 * @param {Array} validList
 */
export function oneOf (value, validList) {
  validList.some(v => {
    return value === v
  })
}

// 响应式，各分辨率判断
export const responseiveList = [
  {
    type: 'xxl',
    validator (value) {
      return value >= 1600
    }
  }, {
    type: 'xl',
    validator (value) {
      return value >= 1200
    }
  }, {
    type: 'lg',
    validator (value) {
      return value >= 992
    }
  }, {
    type: 'md',
    validator (value) {
      return value >= 768
    }
  }, {
    type: 'sm',
    validator (value) {
      return value >= 576
    }
  }, {
    type: 'xs',
    validator (value) {
      return value <= 575
    }
  }
]
