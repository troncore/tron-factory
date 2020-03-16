import { initActions } from '@/utils/common'

import user from './actions/user'
import nodesManage from './actions/nodesManage'
import configuration from './actions/configuration'

const actions = {
  user,
  nodesManage,
  configuration,
}

export default initActions(actions)
