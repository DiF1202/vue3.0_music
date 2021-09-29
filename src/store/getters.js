/*
 * @Author: your name
 * @Date: 2021-09-29 13:44:26
 * @LastEditTime: 2021-09-29 13:45:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\store\getters.js
 */
export const currentSong = (state) => {
    return state.playList[state.currentIndex]
}