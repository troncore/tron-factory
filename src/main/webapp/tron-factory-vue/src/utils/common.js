import Ajax from '@/utils/ajax'

export function initActions(actions) {
  let api = {}
  for (let action in actions) {
    api[action] = {}

    for (let method in actions[action]) {
      for (let url in actions[action][method]) {
        api[action][url] = (params, config = {}, callback) => {
          // api url
          if (typeof config === "function") {
            callback = config
            config = {}
          }
          Ajax[Ajax[method] ? method : 'get'](
            actions[action][method][url],
            params,
            config,
            callback,
          )
        }
      }
    }
  }
  return api
}

/**
 * @return {string}
 */
export function transferBigIntToString (value = '') {
  return String(BigInt(value))
}
