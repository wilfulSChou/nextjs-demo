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
### ssr流程
` 服务端渲染: 浏览器发起页面请求 --->  koa接收到请求，并调用nextjs ---> nextjs开始渲染 --> 调用app的getInitailProps --> 调用页面的getInitailProps --> 渲染出最终的html --> 服务端返回页面，渲染 `
` 客户端路由跳转： 点击链接按钮 --> 异步加载页面的组件js --> 调用页面的getInitialProps --> 数据返回，路由变化 --> 渲染新的页面 `
### 什么是Hooks
- 让函数组件具有类组件的能力
- useState useEffect
### State Hooks
**API**
- useState
- useReducer
 ### reducer
 - 纯粹的函数，没有副作用
 - 有任何数据更新时，应该返回一个新对象
 - 通过combineReducers进行合并
 ### Nextjs中的HOC模式
 - 接受组件作为参数并返回新的组件
 ### 认证和授权
 ***什么是认证***
 - 用户名密码代表一个用户
 - 身份证代表一个人
 - 手机号码也可以确认一个人
 ***互联网中认证***
 - 用户名密码登录
 - 邮箱发送登录链接
 - 手机号码接受验证码

 ***OAuth是一种行业标准的授权方式***
 - Authorization Code
 - Refresh Token
 - Device Code
 - Password
 - Implicit（废弃）
 - Client Credentials（不常用）

 ***OAuth可靠性策略***
 - 一次性code
 - id + secret
 - redirect_uri

 - vscode-styled-jsx插件 可以高亮styled-jsx代码
 - cloneElement 扩展自定义组件

*** Markdown转html ***
1. 安装atob, atob本是浏览器的全局方法，atob插件可以时nodejs环境也可使用该方法, atob方法可使base字符转成string,注意，atob转中文字符会产生乱码，解决办法在第4步
2. 安装markdown-it, 将string渲染成md格式的html
3. 安装github-markdown-css,美化markdown样式
4. decodeURIComponent(escape(atob(str)))

*** 利用打包文件优化 ***
1. 安装@zeit/bundle-browser-analyzer并进行next.config.js和package.json配置
2. 分析打包文件，可使用dynamic动态加载依赖包，并进行缓存；或者使用webpack.IgnorePlugin()

*** 项目部署 ***
1. 项目变成git项目，通过git init初始化项目，增加一个.gitignore文件，添加不需要提交代码的文件，运行git add .和 git commit -m 'init'
2. 通过gitee创建线上仓库，获取ssh地址，在设置里面添加本地电脑公钥和线上服务器地址的公钥
3. 打开项目所在地址的命令行输入ssh-keygen.exe一直点击&生成公钥，通过cat ~/.ssh找到ssh目录，进入id_rsa.pub文件,文件内容即为公钥
4. git remote add origin 码云ssh地址 关联远程仓库
5. git push origin master 将本地master分支代码推到远程服务器上去
6. 打开项目所在地址的命令行输入`ssh 服务器ip地址和密码`，连接服务器

