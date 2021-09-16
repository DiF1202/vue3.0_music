/*
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-09-15 20:35:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入全局样式文件
import '@/assets/scss/index.scss'
import '@/assets/scss/mixin.scss'
import '@/assets/scss/variable.scss'

createApp(App).use(store).use(router).mount('#app')
