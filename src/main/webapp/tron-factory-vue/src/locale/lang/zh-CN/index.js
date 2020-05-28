import elementLocale from 'element-ui/lib/locale/lang/zh-CN'

import base from './package/base'
import menu from './package/menu'
import sign from './package/sign'

import nodesManage from './package/nodesManage'
import configuration from './package/configuration'
import explorer from './package/explorer'
import walletCLI from './package/walletCLI'
import tronLink from './package/tronLink'

export default {
  ...elementLocale,
  base,
  menu,
  sign,
  nodesManage,
  configuration,
  explorer,
  walletCLI,
  tronLink,
}
