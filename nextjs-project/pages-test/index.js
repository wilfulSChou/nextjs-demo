import { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { add } from '../store/store'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const Index = ({ count, username, rename, add }) => {
    useEffect(() => {
        axios.get('/api/user/info').then(res => console.log(res))
    }, [])
    return (
        <>
            <span>Count: {count}</span>
            <a>username: {username}</a>
            <input onChange={(e) => rename(e.target.value)} />
            <button onClick={() => add(2)}>add count</button>
            <a href={publicRuntimeConfig.OAUTH_URL}>去登陆</a>
        </>
    )
}

Index.getInitialProps = async ({ reduxStore }) => {
    reduxStore.dispatch(add(3))
    return {}
}

export default connect(function mapStateToProps(state) {
    return {
        count: state.counter.count,
        username: state.user.username
    }
}, function mapDispatchToProps(dispatch) {
    return {
        add: (num) => dispatch({ type: 'ADD', num }),
        rename: (name) => dispatch({ type:'UPDATE_USERNAME', name })
    }
})(Index)