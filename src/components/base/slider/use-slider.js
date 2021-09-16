/*
 * @Author: your name
 * @Date: 2021-09-16 20:13:50
 * @LastEditTime: 2021-09-16 20:58:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\slider\use-slider.js
 */
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef) {
    const slider = ref(null)
    const currentPageIndex = ref(0)

    onMounted(() => {
        const sliderVal = slider.value = new BScroll(wrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: true
        })

        sliderVal.on('slideWillChange', (page) => {
            currentPageIndex.value = page.pageX
        })
    })

    onUnmounted(() => {
        slider.value.destroy()
    })

    onActivated(() => {
        slider.value.enable()
        slider.value.refresh()
    })

    onDeactivated(() => {
        slider.value.disable()
    })

    return {
        slider,
        currentPageIndex
    }
}
