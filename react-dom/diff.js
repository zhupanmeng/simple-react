import { ReactDOM } from './index'
export function diff(dom, vnode, container) {

    const ret = diffNode(dom, vnode)

    if (container) {
        container.appendChild(ret)
    }
    return ret

}
function diffNode(dom, vnode) {
    let out = dom
    if (vnode === undefined || vnode === null || vnode === '') return;
    if (typeof vnode === 'number') {
        vnode = vnode.toString()
    }
    if (typeof vnode === 'string') {
        if (dom && dom.nodeType === 3) {
            if (dom.textContent !== vnode) { // dom表示老节点
                dom.textContent = vnode
            }
        } else {
            out = document.createTextNode(vnode)
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom)
            }
        }
        return out
    }
    // 非文本dom节点
    if (!dom) {
        out = document.createElement(vnode.tag)
    }
    diffAttribute(out, vnode)
    return out
}
function diffAttribute(dom, vnode) {
    const oldAttrs = {}
    const newAttrs = vnode.attr;
    const domAttrs = dom.attributes;
    [...domAttrs].forEach((item) => {
        oldAttrs[item.name] = item.value
    })
    for (let k in oldAttrs) {
        if (!(k in newAttrs)) {
            ReactDOM.setAttrbute(dom, k, null)
        }
    }
    for (let k in newAttrs) {
        if ((oldAttrs[k] !== newAttrs[k])) {
            ReactDOM.setAttrbute(dom, k, newAttrs[k])
        }
    }
}