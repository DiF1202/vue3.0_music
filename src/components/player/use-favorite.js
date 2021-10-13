/*
 * @Author: your name
 * @Date: 2021-10-02 14:11:15
 * @LastEditTime: 2021-10-13 02:40:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\use-favorite.js
 */
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { save, remove } from "../../assets/js/array-store";
import { FAVORITE_KEY } from "../../assets/js/constant";

export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => {
        return store.state.favoriteList
    })
    const maxLen = 100

    //获得是否喜欢的图标
    function getFavoriteIcon(song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }


    function toggleFavorite(song) {
        let list
        if (isFavorite(song)) {
            //移除remove
            list = remove(FAVORITE_KEY, compare)
        } else {
            //save
            list = save(song, FAVORITE_KEY, compare, maxLen)
        }
        store.commit('setFavoriteList', list)

        function compare(item) {
            return item.id == song.id
        }
    }

    //判断这首歌是不是喜欢的歌曲返回值是布尔值
    function isFavorite(song) {
        return favoriteList.value.findIndex((item) => {
            return item.id == song.id
        }) > -1
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}