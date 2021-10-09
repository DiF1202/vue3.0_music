/*
 * @Author: your name
 * @Date: 2021-10-07 19:00:52
 * @LastEditTime: 2021-10-09 16:26:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\top-list.js
 */
import { get } from './base'

export function getTopList() {
  return get('/toplist/detail')
}

export function getTopDetail(top) {
  return get('/playlist/detail', {
    id: top.id,
  })
}
