import withRepoBasic from '../../components/with-repo-basic'
function Detail ({ test }) {
    return <span>Detail Index {test}</span>
}

Detail.getInitialProps = async ({ router, ctx }) => {
    console.log('detail getInitialProps invocked')
    return {
        test: 123
    }
}

export default withRepoBasic(Detail, 'index')