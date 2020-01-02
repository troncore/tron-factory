import { initActions } from '@/utils/common'

import getStart from './actions/getStart'
import nodeList from './actions/nodeList'
import configManage from './actions/configManage'
import user from './actions/user'
import importPlugin from './actions/importPlugin'

const actions = {
  user,
  getStart,
  nodeList,
  configManage,
  importPlugin,
}

export default initActions(actions)
