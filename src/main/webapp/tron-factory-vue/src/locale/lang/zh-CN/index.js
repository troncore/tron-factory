import base from './base'
import getStart from './package/getStart'
import nodeList from "./package/nodeList";
import branch from './package/branch'
import setting from './package/setting'
import node from './package/node'
import plugin from './package/plugin'
import dashboard from './package/dashboard'
import route from './package/route'

export default {
  base,
  getStart,
  nodeList,
  ...branch,
  ...setting,
  ...node,
  ...plugin,
  ...dashboard,
  ...route,
}
