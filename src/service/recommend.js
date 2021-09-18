/*
 * @Author: your name
 * @Date: 2021-09-16 13:45:27
 * @LastEditTime: 2021-09-17 00:28:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\recommend.js
 */
import { get } from './base'

export function getRecommend() {
    return get('/banner?type2')
}

export function getPlayList(params) {
    return get('/top/playlist', {
        limit: params
    })
}