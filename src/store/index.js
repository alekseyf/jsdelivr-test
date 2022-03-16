import { createStore } from 'vuex'
import app from './app'
import packages from './packages'
import packageInfo from './packageInfo'

export default createStore({
  modules: {
    app,
    packages,
    packageInfo
  }
})
