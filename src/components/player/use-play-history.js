/*
 * @Author: your name
 * @Date: 2021-10-13 00:52:19
 * @LastEditTime: 2021-10-13 00:52:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\use-play-history.js
 */
import { useStore } from 'vuex'
import { PLAY_KEY } from '@/assets/js/constant'
import { save } from '@/assets/js/array-store'

export default function usePlayHistory() {
  const store = useStore()

  const maxLen = 100

  function savePlay(song) {
    const songs = save(song, PLAY_KEY, (item) => {
      return item.id === song.id
    }, maxLen)

    store.commit('setPlayHistory', songs)
  }

  return {
    savePlay
  }
}
