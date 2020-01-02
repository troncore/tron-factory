import { initActions } from '@/utils/common'

import getStart from './actions/getStart'
import nodeList from './actions/nodeList'
import configManage from './actions/configManage'
import user from './actions/user'
import pluginApi from './actions/pluginApi'
import table from './actions/table'

const actions = {
  getStart,
  nodeList,
  configManage,
  user,
  pluginApi,
  table,
}

export default initActions(actions)
