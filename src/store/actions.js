/*
 * @Author: your name
 * @Date: 2021-09-29 13:56:17
 * @LastEditTime: 2021-10-01 14:52:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\store\actions.js
 */
import { PLAY_MODE } from "../assets/js/constant"
import { shuffle } from "../assets/js/util"

//当在列表中选择一首歌曲进行播放的时候
export function selectPlay({ commit }, { list, index }) {
    //提交播放模式
    commit('setPlayMode', PLAY_MODE.sequence)
    //提交顺序播放列表
    commit('setSequenceList', list)
    //提交 播放状态
    commit('setPlayingState', true)
    //提交 全屏状态
    commit('setFullScreen', true)
    //提交当前播放列表
    commit('setPlayList', list)
    //提交播放索引
    commit('setCurrentIndex', index)
}

//打扰播放顺序 洗牌
export function randomPlay({ commit }, list) {
    //提交播放模式(切换到随机模式)
    commit('setPlayMode', PLAY_MODE.random)
    //提交顺序播放列表
    commit('setSequenceList', list)
    //提交 播放状态
    commit('setPlayingState', true)
    //提交 全屏状态
    commit('setFullScreen', true)
    //提交当前播放列表(洗牌后的随机播放列表)
    commit('setPlayList', shuffle(list))
    //提交播放索引
    commit('setCurrentIndex', 0)
}