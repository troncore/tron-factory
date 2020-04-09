<p align="center">
  <img width="320" src="./src/main/webapp/tron-factory-vue/src/assets/logo.png">
</p>

English | [简体中文](./README.zh-CN.md)

## Introduction

[TRON FACTORY](http://39.106.174.213/kangjiancheng/tron-factory) is a one-click chaining solution that helps you quickly build a more stable and secure production-level blockchain environment, reducing the challenges of blockchain deployment, operations, management, application development, etc. You are more focused on core business innovation and fast business.

## Preparation

You need to install [node](https://nodejs.org/), [yarn](https://yarn.bootcss.com/docs/install/#mac-stable), [git](https://git-scm.com/) and [maven](http://maven.apache.org/) locally.（Recommend the current official website stable version, do not use the old version of Node, otherwise the project can not start normally).  
Front end of this project is based on [ES2015+](https://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [vue-cli](https://github.com/vuejs/vue-cli) , [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element).  
Backend end of this project is based on [sprint-boot](https://spring.io/projects/spring-boot), [maven](https://maven.apache.org/guides/mini/index.html) and [lightbend](https://github.com/lightbend/config).  
Learning this knowledge in advance will make a greate help in this project.

 <p align="center">
  <!-- <img width="900" src=""> -->
</p>

## Environment

Make sure you have the proper dependencies.
- JDK1.8(JDK 1.9+ is not supported yet)
- On Linux Ubuntu system (e.g. Ubuntu 16.04.4 LTS), ensure that the machine has [Oracle JDK 8](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04), instead of having Open JDK 8 in the system. If you are building the source code by using Open JDK 8, you will get Build Failed result
- Open UDP ports for connection to the network
- MINIMUM 2 CPU Cores

## Features

```
- Nodes Manage
  - Signature Algorithm
  - Add Node
  - Deploy

- Configuration
  - Fast Config
  - Custom Config
    - Genesis
    - Basic Config
    - HTTP/RPC
    - Database
    - P2P
    - Module

- Ecology App(In development)

```

## Startup step

```bash
# clone the project
git clone http://39.106.174.213/kangjiancheng/tron-factory.git

# Enter the project directory
cd tron-factory

# install dependency
./install.sh

# deploy start
./deploy.sh


```

## Deployed nodes

The default path of the node deployed through TRON FACTORY is in the `～/java-tron` directory,and the running logs of the node can be viewed on the server.


## Steps for usage

[manual for usage](./steps/steps.md)

## Changelog

Detailed changes for each release are coming soon.

## Browsers support

Chrome is recommended.

## License

Copyright (c) 2019 Tron Factory
