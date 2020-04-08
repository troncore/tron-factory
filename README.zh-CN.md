<p align="center">
  <img width="320" src="./src/main/webapp/tron-factory-vue/src/assets/logo.png">
</p>

简体中文 | [English](./README.md)

## 简介

[TRON FACTORY](http://39.106.174.213/kangjiancheng/tron-factory) 是一个一键发链解决方案， 帮助您快速构建更稳定、 安全的生产级区块链环境， 减少在区块链部署、 运维、 管理、 应用开发等方面的挑战， 使您更专注于核心业务创新， 并实现业务快速上链.

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 、[yarn](https://yarn.bootcss.com/docs/install/#mac-stable)、[git](https://git-scm.com/) 和 [maven](http://maven.apache.org/)（推荐当前官网稳定版本，不推荐旧版本 Node,否则项目无法正常启动）。   
前端技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)  
后端技术栈基于 [sprint-boot](https://spring.io/projects/spring-boot)、[maven](https://maven.apache.org/guides/mini/index.html) 和 [lightbend](https://github.com/lightbend/config)  
提前了解和学习这些知识会对使用本项目有很大的帮助。

## 部署环境

基于java-tron部署的应用链需要确保服务器安装恰当的依赖环境。
- JDK1.8(JDK 1.9+ is not supported yet)
- On Linux Ubuntu system (e.g. Ubuntu 16.04.4 LTS), ensure that the machine has [Oracle JDK 8](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04), instead of having Open JDK 8 in the system. If you are building the source code by using Open JDK 8, you will get Build Failed result
- Open UDP ports for connection to the network
- MINIMUM 2 CPU Cores

 <p align="center">
  <!-- <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png"> -->
</p>

## 功能

```
- 节点管理
  - 签名算法
  - 添加节点
  - 部署

- 配置
  - 快速配置
  - 自定义配置
    - 创世块信息
    - 基础配置
    - HTTP/RPC配置
    - 数据库基础配置
    - P2P配置
    - 模块定制化

- 生态应用（建设中）


```

## 启动步骤

```bash
# 克隆项目
git clone http://39.106.174.213/kangjiancheng/tron-factory.git

# 进入项目目录
cd tron-factory

# 安装依赖
./install.sh

# 启动服务：http://localhost:8080
./deploy.sh

# 部署完成
项目被部署到/home/USERNAME/java-tron目录下, 项目运行日志可以在网站中查看

```

## 使用步骤

[使用步骤](./steps/steps.zh.md)

## 版本发布日志

详细的版本发布日志将稍后添加

## 浏览器支持

推荐使用最新版chrome浏览器.

## 版权

Copyright (c) 2020 Tron Factory