import Link from 'next/link'
import Router from 'next/router'
import { Button, Layout, Input, Icon, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { useCallback, useState } from 'react'
import Container from '../components/Container'
import { connect } from 'react-redux'
import { logout } from '../store/store'
import axios from 'axios'
import { withRouter } from 'next/router'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const {Header, Content, Footer} = Layout
const githubIconStyle = {
    color: 'white',
    fontSize: 40,
    display: 'block',
    paddingTop: 10,
    marginRight: 20
}
const footerStyle = {
    textAlign: 'center'
}
// const Comp = ({ color, children, style }) => <div style={{ color: color, ...style }}>{children}</div>
function MyLayout({children, user, logout, router}) {
    console.log(router);
    
    const [search, setSearch] = useState('')
    const handleSearchChange = useCallback((event) => {
        setSearch(event.target.value)
    }, [])
    const handleLogout = useCallback(() => {
        logout()
    }, [logout])
    const handleOnSearch = useCallback(() => {})
    const handleGotoOAuth = useCallback((e) => {
        e.preventDefault()
        axios.get(`/prepare-auth?url=${router.asPath}`)
        .then(resp => {
            if (resp.status === 200) {
                location.href = publicRuntimeConfig.OAUTH_URL
            } else {
                console.log('prepare auth failed', resp);
                
            }
        }).catch(err => {
            console.log('pare auth failed', err);
            
        })
    }, [])
    const userDropDown = (
        <Menu>
            <Menu.Item>
                <a href="javascript:;" onClick={handleLogout}>登出</a>
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout>
            <Header>
                <Container>
                    <div className="header-inner">
                        <div className="header-left">
                            <div className="logo">
                                <Icon type="github" style={githubIconStyle} />
                            </div>
                            <div>
                                <Input.Search
                                    placeholder="搜索仓库" 
                                    value={search}
                                    onChange={handleSearchChange}
                                    onSearch={handleOnSearch}
                                />
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="user">
                                {
                                    user && user.id ? (
                                        <Dropdown overlay={userDropDown}>
                                            <a href="/">
                                                <Avatar size={40} src={user.avatar_url} />
                                            </a>
                                        </Dropdown>
                                    ) : (
                                        <Tooltip title="点击进行登录">
                                            <a href={`/prepare-auth?url=${router.asPath}`}>
                                                <Avatar size={40} icon="user" />
                                            </a>
                                        </Tooltip> 
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Header>
            <Content>
                <Container>
                    {children}
                </Container>
            </Content>
            <Footer style={footerStyle}>
                Develop by wilfulschou @<a href="/">wilful</a>
            </Footer>
            <style jsx>{`
                .header-inner{
                    display: flex;
                    justify-content: space-between;
                }
                .header-left {
                    display: flex;
                    justify-content: flex-start
                }
                .content {
                    color: blue;
                }
            `}</style>
            <style jsx global>{`
                #__next{
                    height: 100%;
                }
                .ant-layout{
                    height: 100%;
                }
                .ant-layout-header{
                    padding-left: 0;
                    padding-right: 0;
                }
            `}</style>
        </Layout>
    )
}

export default connect(function mapState(state) {
    return {
        user: state.user
    }
}, function mapReducer(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
})(withRouter(MyLayout))