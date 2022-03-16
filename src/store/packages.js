import { appStatuses, npmRegistryApiUrl, packagesOnPage } from '@/config'
import { makeRegistryQuery } from '@/api/npmRegistry'

const npmRegistryQuery = makeRegistryQuery(npmRegistryApiUrl, '/-/v1/search')

export default {
  namespaced: true,
  state: () => ({
    total: 0,
    packages: []
  }),
  mutations: {
    clearSearch (state) {
      state.total = 0
      state.packages = []
    },
    setSearchFromResponse (state, responseJson) {
      state.total = +responseJson.total
      state.packages = responseJson.objects
    }
  },
  actions: {
    searchPackage ({ commit, state }, { query, page = 1 }) {
      if (query.length < 2) {
        commit('clearSearch')
        commit('app/setStatus', appStatuses.INIT, { root: true })
      } else {
        commit('app/setStatus', appStatuses.LOADING, { root: true })
        npmRegistryQuery({
          text: query,
          size: packagesOnPage,
          from: packagesOnPage * (page - 1)
        }).then((responseJson) => {
          commit('setSearchFromResponse', responseJson)
          commit('app/setStatus', appStatuses.WAITING, { root: true })
        }).catch((err) => {
          if (!err.isCancel) {
            commit('clearSearch')
            commit('app/setError', err, { root: true })
            commit('app/setStatus', appStatuses.ERROR, { root: true })
          }
        })
      }
    }
  }
}
