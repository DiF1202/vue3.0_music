/*
 * @Author: your name
 * @Date: 2021-09-30 20:09:24
 * @LastEditTime: 2021-10-01 21:19:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\use-mode.js
 */

//这个use-Mode.js 是一个hook函数
//功能是为了用来实现 歌曲播放页面里面的，播放模式的切换等比如循环顺序等
import { useStore } from "vuex";
import { computed } from "vue";
import { PLAY_MODE } from "../../assets/js/constant";

export default function useMode() {
    const store = useStore()
    const playMode = computed(() => store.state.playMode)

    //根据vuex中的播放模式值 切换图片
    //没什么难度其实，就是获取vuex里面的值，根据值来判断改变其的图标Icon
    const modeIcon = computed(() => {
        const playModeVal = playMode.value
        return playModeVal === PLAY_MODE.sequence
            ? 'icon-sequence'
            : playModeVal === PLAY_MODE.random
                ? 'icon-random'
                : 'icon-loop'
    })

    function changeMode() {
        const mode = (playMode.value + 1) % 3
        store.dispatch('changeMode', mode)
    }

    return {
        modeIcon
    }
}
