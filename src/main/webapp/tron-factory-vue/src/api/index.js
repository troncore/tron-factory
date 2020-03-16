import { initActions } from '@/utils/common'

import user from './actions/user'
import nodesManage from './actions/nodesManage'
import configuration from './actions/configuration'

// import getStart from './actions/getStart'
// import nodeList from './actions/nodeList'
// import configManage from './actions/configManage'
// import importPlugin from './actions/importPlugin'

const actions = {
  user,
  nodesManage,
  configuration,

  // getStart,
  // nodeList,
  // configManage,
  // importPlugin,
}

export default initActions(actions)
