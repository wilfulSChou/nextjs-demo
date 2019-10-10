import withRepoBasic from '../../components/with-repo-basic'
function Issues ({ test }) {
    return <span>Issues Index {test}</span>
}

Issues.getInitialProps = async ({ router, ctx }) => {
    console.log('Issues getInitialProps invocked')
    return {
        test: 123
    }
}

export default withRepoBasic(Issues, 'issues')