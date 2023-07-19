import React from 'react'
import ReactMarkdown from 'react-markdown'
import './preview.css'
import {Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
interface Props {
    doc: string
}
const Preview: React.FC<Props> = (props: Props) => {
    return (
        <div className="preview">
            <ReactMarkdown 
                children={props.doc}
                remarkPlugins={[remarkGfm,remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      //如果代码块是块级(非内联)且有语言类型
                      //则函数会返回一个 <SyntaxHighlighter> 组件，用于语法高亮显示代码
                      return !inline && match ? (
                        <SyntaxHighlighter
                          {...props}
                          //代码内容
                          children={String(children).replace(/\n$/, '')}
                          //代码高亮样式
                          style={darcula}
                          //代码语言
                          language={match[1]}
                          //将代码块包裹在 <div> 元素中，以保持与 Markdown 渲染的一致性
                          PreTag="div"
                        />) : (//没有语言类型，那么返回普通的 <code> 组件
                        <code {...props} className={className}>{children}</code>
                      )
                    }
                  }}
            />
        </div>
    )
}
export default Preview
