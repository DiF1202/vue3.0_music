/*
 * @Author: your name
 * @Date: 2021-10-03 14:42:38
 * @LastEditTime: 2021-10-09 12:24:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\use-lyric.js
 */
import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
    //歌词
    const currentLyric = ref(null)
    //行号
    const currentLineNum = ref(0)

    //为了自动播放的两行
    const lyricScrollRef = ref(null)
    const lyricListRef = ref(null)
    //纯音乐
    const pureMusicLyric = ref('')
    //当前播放的歌词
    const playingLyric = ref('')
    //vuex获取
    const store = useStore()
    const currentSong = computed(() => {
        return store.getters.currentSong
    })

    //watch
    watch(currentSong, async (newSong) => {
        if (!newSong.id || !newSong.songurl) {
            return
        }
        stopLyric()
        currentLyric.value = null
        currentLineNum.value = 0
        pureMusicLyric.value = ''
        playingLyric.value = ''

        //这是一个异步过程
        const lyric = await getLyric(newSong)
        store.commit('addSongLyric', {
            song: newSong,
            lyric
        })

        //如果获取到的歌词不匹配就跳过。因为有可能你切换歌曲过快。这是一种保护
        if (currentSong.value.lyric !== lyric) {
            return
        }

        //我们引入第三方库Lyric,并用其创建一个对象实例,里面lyric就是我们获取的那一堆歌词，handleLyric就是一个回调函数
        //可以通过这个回调函数得到行号lineNum

        currentLyric.value = new Lyric(lyric, handleLyric)

        //判断是否有歌词
        const hasLyric = currentLyric.value.lines.length
        if (hasLyric) {
            //有歌词非纯音乐
            if (songReady.value) {
                playLyric()
            }
        }
        else {
            //纯音乐
            playingLyric.value = pureMusicLyric.value = '该歌曲为纯音乐，请欣赏'
        }
    })



    //播放歌词
    function playLyric() {
        const currentLyricVal = currentLyric.value
        if (currentLyricVal) {
            currentLyricVal.seek(currentTime.value * 1000) //核心播放
        }
    }

    //暂停播放
    function stopLyric() {
        const currentLyricVal = currentLyric.value
        if (currentLyricVal) {
            currentLyricVal.stop() //暂停核心
        }
    }

    //更新行号
    function handleLyric({ lineNum, txt }) {
        currentLineNum.value = lineNum
        //当前播放的歌词的哪一行将来放在cd那个页面里面
        playingLyric.value = txt
        const scrollComp = lyricScrollRef.value
        const listEl = lyricListRef.value
        if (!listEl) {
            return
        }
        //这些是为了让歌词能自动滚动
        if (lineNum > 5) {
            const lineEl = listEl.children[lineNum - 5]
            scrollComp.scroll.scrollToElement(lineEl, 1000)
        } else {
            scrollComp.scroll.scrollTo(0, 0, 1000)
        }
    }

    return {
        currentLyric,
        currentLineNum,
        pureMusicLyric,
        playingLyric,
        lyricScrollRef,
        lyricListRef,
        playLyric,
        stopLyric
    }

}