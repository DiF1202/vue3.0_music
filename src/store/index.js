/*
 * @Author: your name
 * @Date: 2021-09-15 20:25:53
 * @LastEditTime: 2021-09-29 14:22:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\store\index.js
 */
import { createStore, createLogger } from 'vuex'
import state from './state'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

//引入开发环境的debugger
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
