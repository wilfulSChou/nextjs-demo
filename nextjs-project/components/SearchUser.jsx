import { useState, useCallback, useRef } from 'react'
import { Select, Spin } from 'antd'   
import debounce from 'loadsh/debounce'
import api from '../lib/api'

const Option = Select.Option

function SearchUser({ onChange, value }) {
    // { current: 0 }
    const lastFetchIdRef = useRef(0)
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])

    const fetchUser = useCallback(
        debounce(value => {
            // console.log('fetching user', value)
            lastFetchIdRef.current += 1
            const fetchId = lastFetchIdRef.current
            setFetching(true)
            setOptions([])

            api.request({
                url: `/search/users?q=${value}`
            }).then(resp => {
                // console.log('user:', resp);
                if (fetchId !== lastFetchIdRef.current) return
                const data = resp.data.items.map(user => ({
                    text: user.login,
                    value: user.login
                }))
                setFetching(false)
                setOptions(data)
            })
    }, 500), [])

    const handleChange = value => {
        setOptions([])
        setFetching(false)
        onChange(value)
    }
    return (
        <Select
            showSearch
            notFoundContent={fetching ? <Spin size="small" /> : <span>nothing</span>}
            filterOption={false}
            placeholder="创建者"
            allowClear
            value={value}
            onChange={handleChange}
            onSearch={fetchUser}
            style={{ width: 200 }}
        >
            {
                options.map(opt => (
                    <Option value={opt.value} key={opt.value}>{opt.text}</Option>
                ))
            }
        </Select>
    )
}

export default SearchUser