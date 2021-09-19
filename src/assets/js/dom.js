/*
 * @Author: your name
 * @Date: 2021-09-19 03:48:33
 * @LastEditTime: 2021-09-19 23:10:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\assets\js\dom.js
 */
export function addClass(el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

export function removeClass(el, className) {
  el.classList.remove(className)
}
