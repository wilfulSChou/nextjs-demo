import { memo, isValidElement } from 'react'
import { withRouter } from 'next/router'
import { Row, Col, List, Pagination } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

const api = require('../lib/api')

import Repo from '../components/Repo'

const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']

const SORT_TYPES = [
    {
        name: 'Best match'
    },
    {
        name: 'Most Stars',
        value: 'stars',
        order: 'desc'
    },
    {
        name: 'Fewest Stars',
        value: 'stars',
        order: 'asc'
    },
    {
        name: 'Most Forks',
        value: 'forks',
        order: 'desc'
    },
    {
        name: 'Most Forks',
        value: 'stforksars',
        order: 'asc'
    },
]

function noop () {}

const selectedItemStyle = {
    borderLeft: '2px solid #e36209',
    fontWeight: 100
}

const per_page = 20

const FilterLink = memo(({ name, query, lang, sort, order, page }) => {    
    let queryString = `?query=${query}`
    if (lang) queryString += `&lang=${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`
    queryString += `&per_page=${per_page}`
    return (
        <Link href={`/search${queryString}`}>
            {isValidElement(name) ? name : <a>{name}</a>}
        </Link>
    )
})

/**
 * 
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的项目开发主语言
 * page: 分页页面
 */
function Search({ router, repos }) {
    console.log(repos);

    const { ...querys } = router.query
    console.log(querys);
    
    const { lang, order, sort, page } = router.query
    
    return (
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={ LANGUAGES }
                        renderItem={item => {
                            const selected = lang === item
                            return (
                                <List.Item style={ selected ? selectedItemStyle : null }>
                                    { selected ? <span>{item}</span> : <FilterLink {...querys} lang={item} name={item}  /> }
                                </List.Item>
                            )
                        }}
                    />
                    <List
                        bordered
                        header={<span className="list-header">排序</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={ SORT_TYPES }
                        renderItem={item => {
                            let selected = false
                            if (item.name === 'Best Match' && !sort) {
                                selected = true
                            } else if (item.value === sort && item.order === order) {
                                selected = true
                            } else {
                                selected = false
                            }
                            return (
                                <List.Item style={ selected ? selectedItemStyle : null }>
                                    { selected ?  <span>{item.name}</span> : <FilterLink {...querys} sort={item.value} name={item.name} order={item.order} /> }
                                </List.Item>
                            )
                        }}
                    />
                </Col>
                <Col span={18}>
                    <h3 className="repos-title">{repos.total_count}个仓库</h3>
                    {
                        repos.items.map(repo => <Repo repo={repo} key={repo.id} />)
                    }
                    <div className="pagination">
                        <Pagination
                            pageSize={per_page}
                            current={Number(page) || 1}
                            total={1000}
                            onChange={noop}
                            itemRender={(page, type, ol) => {
                                return <FilterLink {...querys} page={page} name={ol} />
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <style jsx>{`
                .root{
                    padding: 20px 0;
                }
                .list-header {
                    font-weight: 800;
                    font-size: 16px;
                }
                .repos-title {
                    border-bottom: 1px solid #eee;
                    font-size: 24px;
                    line-height: 50px;
                }
                .pagination {
                    font-size: 20px;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}

Search.getInitialProps = async ({ ctx }) => {    
    const { query, sort, lang, order, page } = ctx.query
    if (!query) {
        return {
            repos: {
                total_count: 0
            }
        }
    }
    let queryString = `?q=${query}`
    if (lang) queryString += `+language:${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`

    queryString += `&per_page=${per_page}`

    const result = await api.request({
        url: `/search/repositories${queryString}`,
    }, ctx.req, ctx.res)

    return {
        repos: result.data
    }

}
export default withRouter(Search)