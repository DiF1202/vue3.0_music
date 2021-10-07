/*
 * @Author: your name
 * @Date: 2021-09-16 13:45:27
 * @LastEditTime: 2021-10-07 11:47:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\recommend.js
 */
import { get } from './base'

//轮播图
export function getRecommend() {
    return get('/banner?type2')
}

//歌单
export function getPlayList(params) {
    return get('/top/playlist', {
        limit: params
    })
}

