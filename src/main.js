/*
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-09-18 13:54:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './components/base/loading/directive'
//引入全局样式文件
import '@/assets/scss/index.scss'
// import '@/assets/scss/mixin.scss'
// import '@/assets/scss/variable.scss'

axios.defaults.baseURL = 'http://localhost:3000'
createApp(App).use(store).use(router).use(lazyPlugin, {
    loading: require('@/assets/images/load.gif')
}).directive('loading', loadingDirective).mount('#app')
