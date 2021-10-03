/*
 * @Author: your name
 * @Date: 2021-10-03 12:58:23
 * @LastEditTime: 2021-10-03 13:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\use-cd.js
 */
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default function useCd() {
    const cdRef = ref(null)
    const cdImageRef = ref(null)

    const store = useStore()
    const playing = computed(() => {
        return store.state.playing
    })

    const cdCls = computed(() => {
        return playing.value ? 'playing' : ''
    })

    watch(playing, (newPlaying) => {
        if (!newPlaying) {
            //暂停
            syncTransform(cdRef.value, cdImageRef.value)
        }
    })

    function syncTransform(wrapper, inner) {
        //外层的角度
        const wrapperTransform = getComputedStyle(wrapper).transform
        //内层的角度
        const innerTransform = getComputedStyle(inner).transform
        //外层角度变化
        wrapper.style.transform = wrapperTransform == 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    }

    return {
        cdCls,
        cdRef,
        cdImageRef
    }
}