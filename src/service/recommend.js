/*
 * @Author: your name
 * @Date: 2021-09-16 13:45:27
 * @LastEditTime: 2021-09-16 19:32:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\recommend.js
 */
import { get } from './base'

export function getRecommend() {
    return get('/banner?type2')
}