import { jsdelivrApiUrl, appStatuses } from '@/config'

import { makeJsdelivrQuery } from '@/api/jsdelivr'

const jsdelivrQuery = makeJsdelivrQuery(jsdelivrApiUrl)

export default {
  namespaced: true,
  state: () => ({
    packageInfo: null
  }),
  mutations: {
    setPackageInfo (state, packageInfo) {
      state.packageInfo = packageInfo
    },
    clearPackageInfo (state) {
      state.packageInfo = null
    }
  },
  actions: {
    packageInfo ({ commit, state }, { name, version }) {
      commit('app/setStatus', appStatuses.LOADING, { root: true })
      jsdelivrQuery(`/package/npm/${name}@${version}/entrypoints`).then((responseJson) => {
        commit('setPackageInfo', {
          name,
          version,
          entrypoints: responseJson
        })
        commit('app/setStatus', appStatuses.WAITING, { root: true })
      }).catch((err) => {
        if (!err.isCancel) {
          commit('app/setError', err, { root: true })
          commit('app/setStatus', appStatuses.ERROR, { root: true })
        }
      })
    }
  }
}
