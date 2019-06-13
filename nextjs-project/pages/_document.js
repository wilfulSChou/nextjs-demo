import Document, { Html, Head, Main, NextScript } from 'next/document'
import  { ServerStyleSheet } from 'styled-components'
function withLog(Comp) {
    return (props) => {
        console.log(props);
        return <Comp {...props} />
    }
}
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet =new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />)
            })
            // 若要覆盖，必须写这一段
            const props = await Document.getInitialProps(ctx)
            return {
                ...props,
                styles: <>{props.styles}{sheet.getStyleElement()}</>
            }
            // end
        } finally {
            sheet.seal()
        }
    }
    render () {
        // 重写必须
        return (
            <Html>
                <Head>
                    <style>{`.test { color: red }`}</style>
                </Head>
                <body className="test">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
        // end
    }
}

export default MyDocument