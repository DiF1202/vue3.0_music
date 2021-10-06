/*
 * @Author: your name
 * @Date: 2021-09-22 02:05:55
 * @LastEditTime: 2021-09-22 15:38:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\index-list\use-shortcut.js
 */
import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch = {}

  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
