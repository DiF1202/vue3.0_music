/*
 * @Author: your name
 * @Date: 2021-10-04 16:30:02
 * @LastEditTime: 2021-10-05 16:25:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\use-middle-interactive.js
 */
import { ref } from 'vue'

export default function useMiddleInteractive() {
  //默认值为cd这个视图层
  const currentShow = ref('cd')

  //给左右两个视图 动态绑定样式
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)

  //定义一个对象用来存东西
  const touch = {}
  let currentView = 'cd'   //最终的视图

  function onMiddleTouchStart(e) {
    //获取手指一点下去的x坐标
    touch.startX = e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    //方向锁
    touch.directionLocked = ''
  }

  function onMiddleTouchMove(e) {
    //算出拖动距离
    //向左为负 向右为正 
    const deltaX = e.touches[0].pageX - touch.startX
    const deltaY = e.touches[0].pageY - touch.startY

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (!touch.directionLocked) {
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }

    //纵向偏移就return 纵向偏移就没作用了
    if (touch.directionLocked == 'v') {
      return
    }

    const left = currentView === 'cd' ? 0 : -window.innerWidth

    //计算出偏移量
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))

    //算出偏移比例
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    }

  }

  function onMiddleTouchEnd() {
    let offsetWidth
    let opacity
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300
    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    }
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}