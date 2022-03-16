import { appStatuses } from '@/config'

export default {
  namespaced: true,
  state: () => ({
    status: appStatuses.INIT,
    error: null
  }),
  mutations: {
    setStatus (state, status) {
      state.status = status
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  }
}
