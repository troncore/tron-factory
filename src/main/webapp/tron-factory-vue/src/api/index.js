import { initActions } from '@/utils/common'

import getStarted from './actions/getStarted'
import explorer from './actions/explorer'

const actions = {
  getStarted,
  explorer,
}

export default initActions(actions)
