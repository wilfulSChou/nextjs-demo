### nextjs目录结构
- .next文件夹是根据webpack实时编译产生的，浏览器页面访问的其实是.next文件夹里的内容，不可更改，不可删除
- components 存放公用组件
- lib 工具库
- pages 文件路径对应着路由路径，nextjs做了处理，该文件夹下的所有js文件都是一个页面，除了_app.js（重写nextjs的app.js）和document.js
- static 存放静态文件
- .babelrc 全局babel配置文件 
- next.config.js nextjs配置文件
### Link
- 进行前端路由跳转
- 需要指定渲染内容
### Router模块
Router.push()
### 动态路由
- 通过query传参
- withRouter
### 路由映射
- 浏览器端通过Link as属性映射或者Router.push()里的第二个参数进行映射
- 服务器端渲染会出现404，因为没有路由映射关系，可以通过配置koa或者express的router来实现
### getInitialProps
- 完成客户端和服务端数据的同步
- nextjs的数据获取规范
- 只在pages目录下的文件才会生效
- 服务端渲染和客户端渲染都会执行
### 自定义app
**作用**
- 固定Layout
- 保持一些公用状态
- 给页面传入一些自定义数据
- 自定义错误处理
### document
- 只有在服务端渲染的时候才会被调用
- 用来修改服务端渲染的文档内容
- 一般用来配合第三方css-in-js方案使用
### css in js  (style-jsx)
- nextjs自带的
- 服务端可以返回带样式的html
### styled-components
` yarn add styled-components babel-plugin-styled-components `
### LazyLoading
- 异步加载模块 import('..)
- 异步加载组件 import dynamic from 'next/dynamic'  dynamic(import('..))