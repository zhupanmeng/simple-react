import Component from '../react/component.js'
import { diff } from './diff.js'
export class ReactDOM {
    static render(vnode, container, dom) {
        // return container.appendChild(this._render(vnode))
        return diff(dom, vnode,container)
    }
    static createComponent(tag, props) { // vnode中的tag才是真正的处理函数
        let inst = null
        if (tag.prototype && tag.prototype.render) { //类式组件，函数式组件没有render方法，直接render 'jsx'
            inst = new tag(props)
        } else { // 函数式组件，构造成类式组件
            inst = new Component(props)
            inst.constructor = tag
            inst.render = function () {
                return this.constructor()
            }
        }
        return inst
    }
    static setComponentProps(comp, props) {
        comp.props = props
        this.renderComponent(comp)
    }
    static renderComponent(comp) {
        let base;
        const renderer = comp.render()
        if (!comp.base && comp.componmentDidMount) {
            comp.componmentDidMount()
        }
        if (comp.base && comp.componmentDidUpdate) {
            comp.componmentDidUpdate()
        }
        base = this._render(renderer)
        if (comp.base && comp.base.parentNode) {
            comp.base.parentNode.replaceChild(base, comp.base)
        }
        comp.base = base
        // setTimeout(() => {
        //     console.dir(comp.base.parentNode) 最终comp.base作为dom节点被添加到dom树中，该对象的父节点可以被查询到
        // })
    }
    static _render(vnode) {
        if (vnode === undefined || vnode === null || vnode === '') return;
        if (typeof vnode === 'number') {
            vnode = vnode.toString()
        }
        if (typeof vnode === 'string') {
            const dom = document.createTextNode(vnode)
            return dom
        }
        if (typeof vnode.tag === 'function') { // 组件
            const comp = this.createComponent(vnode.tag, vnode.attr)
            this.setComponentProps(comp, vnode.attr)
            return comp.base
        }
        if (typeof vnode === 'object') {
            const { tag, attr, childrens } = vnode
            const dom = document.createElement(tag)
            if (attr) {
                Object.keys(attr).forEach((key) => {
                    ReactDOM.setAttrbute(dom, key, attr[key])
                })
            }
            childrens.forEach(child => {
                this.render(child, dom)
            });
            return dom
        }
    }
    static setAttrbute(dom, key, value) {
        if (key == 'className') { // 类名
            key = 'class'
        }
        if (/^on\w/.test(key)) {// 自定义事件
            key = key.toLowerCase()
            dom[key] = value || ''
        } else if (key == 'style') {
            if (!value || typeof value === 'string') {
                dom.style.cssText = value || ''
            } else if (value && typeof value === 'object') {
                for (let k in value) {
                    if (typeof value[k] == 'number') {
                        dom.style[k] = value[k] + 'px'
                    } else {
                        dom.style[k] = value[k] + ''
                    }
                }
            }
        } else if (key in dom) {
            dom[key] = value
        } else if (value) { //自定义属性
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }


    }
}