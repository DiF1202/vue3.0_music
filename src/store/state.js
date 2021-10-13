/*
 * @Author: your name
 * @Date: 2021-09-29 02:19:00
 * @LastEditTime: 2021-10-13 02:31:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\store\state.js
 */
import { PLAY_MODE, FAVORITE_KEY, SEARCH_KEY, PLAY_KEY } from "../assets/js/constant"
import { load } from '../assets/js/array-store'

const state = {
    //原始数据(顺序播放列表)
    sequenceList: [],
    //真实播放列表
    playList: [],
    //播放状态
    playing: false,
    //播放模式
    playMode: PLAY_MODE.sequence,
    //播放那一首歌
    currentIndex: 0,
    //全屏还是收缩
    fullScreen: false,
    //收藏歌曲列表
    favoriteList: [],
    //搜索记录
    searchHistory: load(SEARCH_KEY),
    //最近播放
    playHistory: []
}

export default state