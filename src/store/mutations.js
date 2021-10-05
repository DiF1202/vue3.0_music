/*
 * @Author: your name
 * @Date: 2021-09-29 13:45:55
 * @LastEditTime: 2021-10-05 20:06:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\store\mutations.js
 */
const mutations = {
    //设置播放状态
    setPlayingState(state, playing) {
        state.playing = playing
    },
    //设置顺序播放列表
    setSequenceList(state, list) {
        state.sequenceList = list
    },
    //设置播放列表
    setPlayList(state, list) {
        state.playList = list
    },
    //设置播放模式
    setPlayMode(state, mode) {
        state.playMode = mode
    },
    //设置当前播放索引
    setCurrentIndex(state, index) {
        state.currentIndex = index
    },
    //设置全屏还是收缩
    setFullScreen(state, fullScreen) {
        state.fullScreen = fullScreen
    },
    //设置喜欢歌曲的列表
    setFavoriteList(state, list) {
        state.favoriteList = list
    },
    //添加歌词
    addSongLyric(state, { song, lyric }) {
        state.sequenceList.map((item) => {
            if (item.id == song.id) {
                item.lyric = lyric
            }
            return item
        })
    },
}

export default mutations