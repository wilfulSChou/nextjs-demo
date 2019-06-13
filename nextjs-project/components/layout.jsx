import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
export default ({children}) => {
    function gotoTestB() {
        Router.push('/test/b')
    }
    return (
        <>
            <header>
                <Link href="/a">
                    <Button>A</Button>
                </Link>
                <Button onClick={gotoTestB}>test b</Button>
            </header>
            {children}
        </>
    )
}