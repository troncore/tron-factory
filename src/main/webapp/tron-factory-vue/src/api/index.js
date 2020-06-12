import { initActions } from '@/utils/common'

import user from './actions/user'
import getStarted from './actions/getStarted'
import nodesManage from './actions/nodesManage'
import configuration from './actions/configuration'
import explorer from './actions/explorer'

const actions = {
  user,
  getStarted,
  nodesManage,
  configuration,
  explorer,
}

export default initActions(actions)
