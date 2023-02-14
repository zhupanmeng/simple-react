import React from './react'
import { ReactDOM } from './react-dom'


// const ele = (
//     <div id="con" title="zpm" style={{ width: 200, height: '180px', background: 'red' }} onClick={c}>
//         hello,<span>React</span>
//     </div>
// )

// function Home() {
//     return (
//         <div>
//             hello,<span>function Component</span>
//         </div>
//     )
// }
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0
        }
    }
    componmentDidMount() {
        console.log('组件挂载了')
    }
    componmentDidUpdate() {
        console.log('组件更新了')
    }
    handler() {
        this.setState({
            num: this.state.num + 1
        }, (state) => {
            console.log(state.num)
        })
        console.log(this.state.num)
    }
    render() {
        return (
            <div>
                hello,<span>class Component
                    <div>{this.state.num}</div>
                </span>
                <button onClick={this.handler.bind(this)}>摸我</button>
            </div>
        )
    }
}
// console.log(<Home />)  // 对于一个函数式组件，babel依然会帮我们编译识别，转换为vnode对象
// ReactDOM.render(<Funcom name='title' />, document.getElementById('root'))
ReactDOM.render(<Home name='title' />, document.getElementById('root'))
// ReactDOM.render(ele, document.getElementById('root'))