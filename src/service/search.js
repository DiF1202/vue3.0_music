/*
 * @Author: your name
 * @Date: 2021-10-10 21:48:41
 * @LastEditTime: 2021-10-12 01:58:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\search.js
 */
import { get } from './base'

export function getHotKeys() {
    return get('/search/hot')
}

export function search(keywords, offset) {
    return get('/search', {
        keywords,
        offset
    })
}