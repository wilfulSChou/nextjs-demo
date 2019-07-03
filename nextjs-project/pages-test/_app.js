import App, {Container} from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/layout'
import 'antd/dist/antd.css'
import MyContext from '../lib/my-context'
import testHoc from '../lib/with-redux'

class MyApp extends App {
    state = {
        context: '111'
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
    render() {
        const { Component, pageProps, reduxStore } = this.props
        
        return (
            <Container>
                <Layout>
                    <Provider store={reduxStore}>
                        <MyContext.Provider value={this.state.context}>
                            <Component {...pageProps} />
                            {/* <button onClick={() => this.setState({context: `${this.state.context}111`})}>{this.state.context}</button> */}
                        </MyContext.Provider>
                    </Provider>
                </Layout> 
            </Container>
        )
    }
}

export default testHoc(MyApp)