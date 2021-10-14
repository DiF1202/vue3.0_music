/*
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-10-14 19:29:35
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
import noResultDirective from '@/components/base/no-result/directive'
import 'default-passive-events'
import '@/assets/scss/index.scss'
import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { getMp3s2 } from '@/service/song'

axios.defaults.baseURL = 'http://101.34.216.21:3000/'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
    getMp3s2(favoriteSongs).then((songs) => {
        store.commit('setFavoriteList', songs)
        saveAll(songs, FAVORITE_KEY)
    })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
    getMp3s2(historySongs).then((songs) => {
        store.commit('setPlayHistory', songs)
        saveAll(songs, PLAY_KEY)
    })
}

createApp(App).use(store).use(router).use(lazyPlugin, {
    loading: require('@/assets/images/load.gif')
}).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
