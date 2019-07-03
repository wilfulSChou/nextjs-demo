import React, { 
    Component, 
    useState, 
    useEffect, 
    useLayoutEffect, 
    useReducer, 
    useContext, 
    useRef,
    memo,
    useCallback,
    useMemo
} from 'react'

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
    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('sisi')
    const countRef = useRef() // 返回的都是同一个对象，是解决闭包陷阱的一种方法
    countRef.current = count
    // 优化hook
    const config = useMemo(() => ({
        text: `count is ${count}`,
        color: count > 3 ? 'red' : 'blue'
    }), [count])

    // const onButtonClick = useCallback(() => dispatchCount({ type: 'add' }), [])

    const onButtonClick = useMemo(() => () => dispatchCount({ type: 'add' }), []) //优化hook
    
    // 闭包陷阱
    const handleAlertButtonClick = function() {
        setTimeout(() => {
            alert(countRef.current)
        }, 2000)
    }
    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <Child
                config={config}
                onButtonClick={onButtonClick}
            />
            <button onClick={handleAlertButtonClick}>alert count</button>
        </div>
    )
}

const Child = memo(function Child({ onButtonClick, config }) {
    console.log('child render');
    return (
        <button onClick={onButtonClick} style={{ color: config.color }}>
            {config.text}
        </button>
    )
    
})

export default MyCountFunc