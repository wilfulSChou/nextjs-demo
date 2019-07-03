import React, { 
    Component, 
    useState, 
    useEffect, 
    useLayoutEffect, 
    useReducer, 
    useContext, 
    useRef 
} from 'react'
import MyContext from '../../lib/my-context'
class MyCount extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }
    
    state = {
        count: 0
    }
    componentDidMount() {
        console.log(this.ref.current);
        
        this.interval = setInterval(() => {
            this.setState(prev => ({
                count: prev.count + 1
            }))
        }, 1000)
    }
    componentWillMount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    render() {
        return (
            <div>
                <span ref={this.ref}>{this.state.count}</span>
            </div>
        )
    }
}

function countReducer(state, action) {
    switch(action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}

function MyCountFunc() {
    // const [count, setCount] = useState(0) //默认值0

    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('sisi')
    const context = useContext(MyContext)
    const inputRef = useRef()
    // setCount(1) // 闭包陷阱
    // setCount(c => c + 1) // 基于最新的c

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // setCount(c => c + 1)
    //         dispatchCount({type: 'minus'})
    //     }, 1000)
    //     return () => clearInterval(interval)
    // }, [])

    // dom渲染之后
    useEffect(() => {
        console.log('effect invoked');
        console.log(inputRef.current);
        
        return () => console.log('effect deteched');
    }, [count])

    // dom渲染之前 一般不要用
    // useLayoutEffect(() => {
    //     console.log('layout effect invoked');
    //     return () => console.log('layout effect deteched');
    // }, [count])

    return (
        <div>
            <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => dispatchCount({type: 'add'})} >{count}</button>
            <p>{context}</p>
        </div>
    )
}

export default MyCountFunc