import  Component  from './component.js'

function createElement(tag, attr, ...childrens) {

    return {
        tag,
        attr,
        childrens
    }
}

export default {
    createElement,
    Component
 }
