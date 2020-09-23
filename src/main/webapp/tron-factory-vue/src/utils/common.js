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


export function webDownload (blob, name) {
  // 创建一个 DOMString
  let blobURL = URL.createObjectURL(blob)

  // 创建 a元素 点击下载
  let aElement = document.createElement('a')
  aElement.href= blobURL
  // 下载名字
  aElement.download = name

  document.body.append(aElement)
  aElement.click()
  document.body.append(aElement)

  // 释放内存占用
  URL.revokeObjectURL(blobURL)
}
