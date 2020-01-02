import { initActions } from '@/utils/common'

import getStart from './actions/getStart'
import settingApi from './actions/settingApi'
import user from './actions/user'
import nodeList from './actions/nodeList'
import pluginApi from './actions/pluginApi'
import table from './actions/table'

const actions = {
  getStart,
  nodeList,
  settingApi,
  user,
  pluginApi,
  table,
}

export default initActions(actions)
