/*
 * @Author: your name
 * @Date: 2021-09-16 02:01:30
 * @LastEditTime: 2021-09-16 02:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\base.js
 */
import axios from 'axios'

const ERR_OK = 0
const baseURL = '/'

axios.defaults.baseURL = baseURL

export function get(url, params) {
    return axios.get(url, {
        params
    }).then((res) => {
        const serverData = res.data
        if (serverData.code === ERR_OK) {
            return serverData.result
        }
    }).catch((e) => {
        console.log(e)
    })
}
