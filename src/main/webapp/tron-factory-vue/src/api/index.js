import { initActions } from '@/utils/common'

import dashboard from './actions/dashboard'
import settingApi from './actions/settingApi'
import user from './actions/user'
import nodeApi from './actions/nodeApi'
import pluginApi from './actions/pluginApi'
import table from './actions/table'

const actions = {
  dashboard,
  settingApi,
  user,
  nodeApi,
  pluginApi,
  table,
}

export default initActions(actions)
