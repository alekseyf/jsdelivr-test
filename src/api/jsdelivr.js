import axios from 'axios'

const makeJsdelivrQuery = function (jsdelivrApiUrl) {
  let request = null

  return function (endPoint, options = {}) {
    if (request !== null) {
      request.cancel()
      request = null
    }
    return new Promise((resolve, reject) => {
      const axiosSource = axios.CancelToken.source()
      request = { cancel: axiosSource.cancel }
      axios
        .get(`${jsdelivrApiUrl}${endPoint}`, {
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
  makeJsdelivrQuery
}
