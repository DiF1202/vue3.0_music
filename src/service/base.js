/*
 * @Author: your name
 * @Date: 2021-09-16 02:01:30
 * @LastEditTime: 2021-09-16 19:36:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\base.js
 */
import axios from 'axios'

const ERR_OK = 200

const baseURL = 'http://localhost:8080'

axios.defaults.baseURL = baseURL
export function get(url, params) {
    return axios.get(url, {
        params
    }).then((res) => {
        if (res.status === ERR_OK) {
            return res.data
        }
    }).catch((e) => {
        console.log(e)
    })
}
