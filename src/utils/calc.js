/**
 * 计算元素在窗口左上角水平和垂直方向滚动的像素
 * @export
 * @param {dom} target
 * @param {boolean} isVertical
 * @returns
 */
export function getScroll(target, isVertical) {
  const prop = isVertical ? "scrollY" : "scrollX";
  const method = isVertical ? "scrollTop" : "scrollLeft";
  let distance = target[prop];
  if (distance === undefined) {
    distance = window.document.documentElement[method];
  }
  return distance;
}

/**
 * 计算元素在窗口左上角水平和垂直方向的像素
 * @export
 * @param {dom} el
 * @returns
 */
export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  const scrollTop = getScroll(window, true);
  const scrolleft = getScroll(window, false);

  const body = window.document.body;
  const clientTop = body.clientTop || 0;
  const clientLeft = body.clientLeft || 0;

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrolleft - clientLeft
  };
}
