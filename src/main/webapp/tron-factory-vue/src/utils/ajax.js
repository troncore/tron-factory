import Axios from 'axios'
import { Notification } from 'element-ui'

const isDevelopment = process.env.NODE_ENV !== 'production'

// if the server responses success, just deal with the useless data
function responseSuccess(response, callback) {
  if (response.data && (response.data.code < 300 || response.data.code === 304)) {
    callback(null, response.data.data)
  } else {
    let error_msg = response.data.msg

    responseFail(error_msg, callback)
  }
}

// the server responses error or network error
function responseFail(error, callback) {
  let error_msg = '' + (error || 'Exception Error')
  Notification.error({
    title: 'Error',
    message: error_msg,
  })

  callback(error_msg)
}

export const proxyMap = {
  local: '/__local__',
  mock: '/__mock__',
  service: '/__server__',
}
let globalProxy = 'local'

const $axios = Axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  // timeout: 200000,
})

export default {
  request(config) {
    return $axios.request(config)
  },
  $http(method, url, params, callback) {
    const config = {
      url: url,
      method: method,
    }

    // if  url like as '/__mock__/api/getTestInfo' which it has proxy prefix, it will ignore the global proxy
    let isSingleProxy = Object.values(proxyMap).some(value => ~config.url.indexOf(value))
    if (isDevelopment) {
      // global proxy
      if (!isSingleProxy) config.baseURL = proxyMap[globalProxy]
    } else if (isSingleProxy) {
      Object.values(proxyMap).forEach(value => {
        // avoid the url has prefix proxy in production
        if (~config.url.indexOf(value)) config.url = config.url.replace(value, '')
      })
    }

    if (['post', 'put', 'patch'].includes(method)) {
      config.data = params
    } else {
      config.params = params
    }

    this.request(config).then(
      response => responseSuccess(response, callback),
      error => responseFail(error, callback),
    )
  },
  get(url, params, callback) {
    this.$http('get', url, params, callback)
  },
  post(url, params, callback) {
    this.$http('post', url, params, callback)
  },
  put(url, params, callback) {
    this.$http('put', url, params, callback)
  },
  delete(url, params, callback) {
    this.$http('delete', url, params, callback)
  },
}
