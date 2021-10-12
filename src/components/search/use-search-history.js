/*
 * @Author: your name
 * @Date: 2021-10-12 19:12:13
 * @LastEditTime: 2021-10-12 19:18:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\search\use-search-history.js
 */
import { save, remove, clear } from '@/assets/js/array-store'
import { SEARCH_KEY } from '@/assets/js/constant'
import { useStore } from 'vuex'

export default function useSearchHistory() {
    const maxLen = 100

    const store = useStore()

    function saveSearch(query) {
        const searches = save(query, SEARCH_KEY, (item) => {
            return item === query
        }, maxLen)
        store.commit('setSearchHistory', searches)
    }

    function deleteSearch(query) {
        const searches = remove(SEARCH_KEY, (item) => {
            return item === query
        })
        store.commit('setSearchHistory', searches)
    }

    function clearSearch() {
        const searches = clear(SEARCH_KEY)
        store.commit('setSearchHistory', searches)
    }

    return {
        saveSearch,
        deleteSearch,
        clearSearch
    }
}
