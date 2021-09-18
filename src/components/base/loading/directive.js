/*
 * @Author: your name
 * @Date: 2021-09-17 15:30:35
 * @LastEditTime: 2021-09-18 22:12:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\loading\directive.js
 */
import Loading from './loading'
import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive'

const loadingDirective = createLoadingLikeDirective(Loading)

export default loadingDirective
