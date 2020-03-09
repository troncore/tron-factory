import { initActions } from '@/utils/common'

import user from './actions/user'
import nodesManage from './actions/nodesManage'
import configuring from './actions/configuring'

// import getStart from './actions/getStart'
// import nodeList from './actions/nodeList'
// import configManage from './actions/configManage'
// import importPlugin from './actions/importPlugin'

const actions = {
  user,
  nodesManage,
  configuring,

  // getStart,
  // nodeList,
  // configManage,
  // importPlugin,
}

export default initActions(actions)
