/**
 * 判断参数是否被数组包含
 * @export
 * @param {*} value
 * @param {array} validList
 */
export function oneOf(value, validList) {
  validList.some(v => {
    return value === v;
  });
}

/**
 * 向上寻找父组件
 * @export
 * @param {object} root
 * @param {string} componentName
 * @param {*} componentNames
 * @returns
 */
export function findComponentUpward(root, componentName, componentNames) {
  componentNames =
    typeof componentName === "string" ? [componentName] : componentName;
  let parent = root.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * 同层寻找兄弟组件
 * @export
 * @param {object} context
 * @param {string} componentName
 * @param {boolean} [exceptMe=true]
 * @returns
 */
export function findBrothersComponents(
  context,
  componentName,
  exceptMe = true
) {
  let brothersComponents = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  const index = brothersComponents.findIndex(item => {
    return item._uid === context._uid;
  });
  if (exceptMe) brothersComponents.splice(index, 1);
  return brothersComponents;
}

/**
 * 判断对象是否为空
 * @export
 * @param {*} obj
 */
export function isEmptyObject(obj) {
  for (let k in obj) {
    return false;
  }
  return true;
}

// 响应式，各分辨率对照表
export const responseiveList = [
  {
    type: "xxl",
    validator(value) {
      return value >= 1600;
    }
  },
  {
    type: "xl",
    validator(value) {
      return value >= 1200;
    }
  },
  {
    type: "lg",
    validator(value) {
      return value >= 992;
    }
  },
  {
    type: "md",
    validator(value) {
      return value >= 768;
    }
  },
  {
    type: "sm",
    validator(value) {
      return value >= 576;
    }
  },
  {
    type: "xs",
    validator(value) {
      return value <= 575;
    }
  }
];

// breakpoint map
export const dimensionMap = {
  xs: "575px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px"
};

/**
 * 向下寻找子组件
 * @export
 * @param {object} root
 * @param {string} componentName
 * @returns
 */
export function findComponentDownward(root, componentName) {
  const $children = root.$children;
  let children = null;
  if ($children.length) {
    for (const child of $children) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) {
          break;
        }
      }
    }
  }
  return children;
}

/**
 * 解决matchMedia方法兼容性
 * matchMedia：判断屏幕窗口大小
 * @export
 */
export function setMatchMedia() {
  if (typeof window !== "undefined") {
    const matchMediaPolyfill = mediaQuery => {
      return {
        media: mediaQuery,
        matches: false,
        on() {},
        off() {}
      };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
  }
}
