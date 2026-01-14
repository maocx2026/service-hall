/* eslint-disable prefer-template */
export function on(el, event, fn, options) {
  el.addEventListener(event, fn, options);
  return () => el.removeEventListener(event, fn, options);
}

export function e(selector) {
  return document.querySelector(selector);
}

export function appendHTML(element, html) {
  element.insertAdjacentHTML('beforeend', html);
  return element.lastChild;
}

export function appendCss(code) {
  const el = appendHTML(e('head'), `<style>${code}</style>`);
  return () => el.remove();
}

export function vueCssScope(vueVm) {
  const attrIds = vueVm.$el.getAttributeNames();
  for (let i = 0; i < attrIds.length; i += 1) {
    const id = attrIds[i];
    if (id.startsWith('data-v-')) {
      return id;
    }
  }

  return undefined;
}

export function getStyleByKey(selector, key) {
  const ele = e(selector);
  try {
    const style = window.getComputedStyle(ele, null) || null;
    return parseFloat(style.getPropertyValue(key));
  } catch (error) {
    return null;
  }
}

export function getPaddingTop(selector) {
  return getStyleByKey(selector, 'padding-top');
}

export function getMarginTop(selector) {
  return getStyleByKey(selector, 'margin-top');
}

export function domObserverHeight(selector, fn) {
  let oriHeight = 0;
  // 定时100ms 监听高度变化
  const timer = setInterval(() => {
    const height = e(selector)?.offsetHeight;
    if (oriHeight !== height) {
      oriHeight = height;
      fn();
    }
  }, 100);
  // 清除timer
  return () => clearInterval(timer);
}
