### Nextjs 
- React同构框架 完善的react项目架构，搭建轻松
- 自带数据同步策略，解决同构项目最大难点
- 丰富的插件帮助我们增加各种功能
- 灵活的配置根据你的需求来自定义
### OAuth授权体系
- 最广泛的第三方认证体系
- 常见OAuth提供商:QQ、微博、微信
### React Hooks
### Koa
### Redis

**版本号 ^aa.bb.cc**
- ^代表自动安装当前大版本号下最新的
- aa是大版本号，一般只有breaking changes的时候才会更新
- bb一般是修复较大bug，cc是一些细微修改

```
yarn config get registry
yarn config set registry https://registry.yarnpkg.com
```

**nextjs项目创建**
- 手动创建
```
npm init -y
yarn add react react-dom next --save
修改package.json中的scripts
pages文件夹下的js文件需要导出，会自动生成路由，可以不引用react，因为next全局处理过
```
- create-next-app创建
```
npm i -g create-next-app
npx create-next-app next-create  /   yarn create next-app next-create
```

**服务器**
- nextjs自身带有服务器，只处理ssr渲染
- 处理HTTP请求，并根据请求数据返回相应的内容
- 根据域名之类的HOST来定位服务器

**nextjs无法处理服务端**
- 数据接口
- 数据库连接
- session状态

**koa是一个非常流行的轻量级的nodejs服务端框架**
- 项目相对轻量，并不需要很多集成的功能
- 非常易于扩展，编程模式非常符合JS特性

**Koa的特点**
- 轻量：本身不封装什么功能
