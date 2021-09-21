/*
 * @Author: your name
 * @Date: 2021-09-20 19:43:57
 * @LastEditTime: 2021-09-21 20:50:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\index-list\use-fixed.js
 */
import { ref, watch, nextTick } from 'vue'

export default function useFixed(props) {
    const groupRef = ref(null)
    //定义高度数组
    const listHeights = ref(null)

    watch(() => props.data, async () => {
        await nextTick()
        calculate()
    })

    function caclculate() {
        const list = groupRef.value.children
        const listHeightsVal = listHeights.value
        let height = 0

        listHeightsVal.length = 0
        listHeightsVal.push(height)

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightsVal.push(height)
        }
    }

    function onScroll() {

    }

    return {
        groupRef,
        onScroll
    }
}