import base from './base'
import getStart from './package/getStart'
import nodeList from "./package/nodeList";
import configManage from "./package/configManage";


import branch from './package/branch'
import setting from './package/setting'
import node from './package/node'
import plugin from './package/plugin'
import route from './package/route'

export default {
  base,
  getStart,
  nodeList,
  configManage,

  ...branch,
  ...setting,
  ...node,
  ...plugin,
  ...route,
}
