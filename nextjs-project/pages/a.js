import { withRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
// import moment from 'moment'
// import Comp from '../components/comp'

const Comp = dynamic(import('../components/comp'))
const Title = styled.h1`
    color: yellow;
    font-size: 40px;
`
const A = ({router, name, time}) => (
    <>
        <Comp />
        <Title>This is Title {time}</Title>
        <Link href="#aaa">
            <a className="link">
            A {router.query.id} {name}
            </a>
        </Link>
        <style jsx>{`
            a {
                color: blue;
            }
            .link {
                color: red;
            }
        `}</style>
        <style jsx global>{`
            a {
                color: green;
            }
        `}</style>
    </>
)

A.getInitialProps = async (ctx) => {
    const moment = await import('moment')
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'lilp',
                time: moment.default(Date.now() - 60 * 1000).fromNow()
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(A)