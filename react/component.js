import { ReactDOM } from '../react-dom/index.js'
class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
    }
    setState(newState, callback) {
        setTimeout(() => {
            Object.assign(this.state, newState)
            callback && callback(this.state)
            ReactDOM.renderComponent(this)
        })
    }
}
export default Component