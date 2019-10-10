import { memo, useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import 'github-markdown-css'

const md = new MarkdownIt({
    html: true,
    linkify: true // 字符串地址变成可点击链接
})

function b64_to_utf8(str) {
    return decodeURIComponent(escape(atob(str)))
}

export default memo(function MarkdownRender({ content, isBase64 }) {
    const markdown = isBase64 ? b64_to_utf8(content) : content    
    let html = ''
    useMemo(() => {
        html = md.render(markdown)
    }, [markdown])    

    return (
        <div className="markdown-body">
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
    )
})