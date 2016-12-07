# Blog

## 设计模式
> 使用 MVC 设计模式 （model - view - controller/router)

## 模块使用
1. express Web 框架
2. express-session 中间件
3. connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
4. connect-flash: 页面通知提示的中间件，基于 session 实现
5. ejs: 模板
6. express-formidable: 接收表单及文件的上传中间件
7. config-lite: 读取配置文件
8. marked: markdown 解析
9. moment: 时间格式化
10. mongolass: mongodb 驱动
11. objectid-to-timestamp: 根据 ObjectId 生成时间戳
12. sha1: sha1 加密，用于密码加密
13. winston: 日志
14. express-winston: 基于 winston 的用于 express 的日志中间件

> 不管是小项目还是大项目，将配置与代码分离是一个非常好的做法。
我们通常将配置写到一个配置文件里，如 config.js 或 config.json ，并放到项目的根目录下。
但通常我们都会有许多环境，如本地开发环境、测试环境和线上环境等，
不同的环境的配置不同，我们不可能每次部署时都要去修改引用 config.test.js 或者 config.production.js。config-lite 模块正是你需要的。

## config-lite
[config-lite](https://www.npmjs.com/package/config-lite) 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（`NODE_ENV`）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。如果不设置 `NODE_ENV`，则读取默认的 default 配置文件，如果设置了 `NODE_ENV`，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 `NODE_ENV=test node app` 启动，则通过 `require('config-lite')` 会依次降级查找 `config/test.js`、`config/test.json`、`config/test.node`、`config/test.yml`、`config/test.yaml` 并合并 default 配置; 如果程序以 `NODE_ENV=production node app` 启动，则通过 `require('config-lite')` 会依次降级查找 `config/production.js`、`config/production.json`、`config/production.node`、`config/production.yml`、`config/production.yaml` 并合并 default 配置。


