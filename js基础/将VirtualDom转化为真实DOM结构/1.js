/**
 * vnode 结构
 * {
 *    tag,
 *    attrs,
 *    children,
 * }
 */

 // Virtual DOM => DOM

function render(vnode, container) {
  container.appendChild(_render(vnode));
}

function _render(vnode) {
  // 如果是数字类型转化为字符串
  if(typeof vnode === 'number') {
    vnode = String(vnode);
  }

  // 字符串类型直接就是文本节点
  if(typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  const dom = document.createElement(vnode.tag);
  if(vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    })
  }

  vnode.children.forEach(child => render(child, dom));
  return dom;
}