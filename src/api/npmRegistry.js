import axios from 'axios'

const makeRegistryQuery = function (npmRegistryApiUrl, endPoint) {
  let request = null

  return function (options = {}) {
    if (request !== null) {
      request.cancel()
      request = null
    }
    return new Promise((resolve, reject) => {
      const axiosSource = axios.CancelToken.source()
      request = { cancel: axiosSource.cancel }
      axios
        .get(`${npmRegistryApiUrl}${endPoint}`, {
          cancelToken: axiosSource.token,
          params: options
        })
        .then((response) => {
          request = null
          return resolve(response.data)
        })
        .catch((err) => {
          const jsonErr = { error: true, message: 'Unknown error' }
          if (err instanceof Error) {
            jsonErr.message = err.message
          }
          if (axios.isCancel(err)) {
            jsonErr.isCancel = true
            jsonErr.message = 'Canceled'
          }
          return reject(jsonErr)
        })
    })
  }
}

export {
  makeRegistryQuery
}
