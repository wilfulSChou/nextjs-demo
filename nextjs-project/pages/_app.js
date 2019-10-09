import App, {Container} from 'next/app'
import { Provider } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'
import 'antd/dist/antd.css'
import withRedux from '../lib/with-redux'
import PageLoading from '../components/PageLoading'
import axios from 'axios'

class MyApp extends App {
    state = {
        loading: false
    }
    static async getInitialProps(ctx) {
        const { Component } = ctx
        console.log('app init');
        
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps
        }
    }
    
    startLoading = () => {
        this.setState({
            loading: true
        })
    }

    stopLoading = () => {
        this.setState({
            loading: false
        })
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.startLoading)

    }

    componentWillMount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.startLoading)
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props
        // console.log('reduxStore', reduxStore.getState());
        
        return (
            <Container>
                <Provider store={reduxStore}>
                    {this.state.loading ? <PageLoading /> : null}
                    <Layout>
                        <Link href="/">
                            <a>Index</a>
                        </Link>
                        <Link href="/detail">
                            <a>Detail</a>
                        </Link>
                        <Component {...pageProps} />
                    </Layout>
                </Provider> 
            </Container>
        )
    }
}

export default withRedux(MyApp)