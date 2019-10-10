import withRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'
import MDRender from '../../components/MarkdownRender'



function Detail ({ readme }) {
    console.log('readme==', readme);
    
    return <MDRender content={readme.content} isBase64={true} />
}

Detail.getInitialProps = async ({ router, ctx: { query: { owner, name }, req, res } }) => {
    // console.log('detail getInitialProps invocked')

    const readmeResp = await api.request({
        url: `/repos/${owner}/${name}/readme`
    }, req, res)
    return {
        readme: readmeResp.data
    }
}

export default withRepoBasic(Detail, 'index')