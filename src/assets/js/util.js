/*
 * @Author: your name
 * @Date: 2021-09-29 15:08:51
 * @LastEditTime: 2021-10-02 22:01:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\assets\js\util.js
 */
//洗牌函数
export function shuffle(source) {
    const arr = source.slice()
    for (let i = 0; i < arr.length; i++) {
        const j = getRandomInt(i)
        swap(arr, i, j)
    }
    return arr
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}

function swap(arr, i, j) {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}

export function formatTime(interval) {
    interval = interval | 0
    const minute = ((interval / 60 | 0) + '').padStart(2, '0')
    const second = (interval % 60 + '').padStart(2, '0')
    return `${minute}:${second}`
}

