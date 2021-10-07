/*
 * @Author: your name
 * @Date: 2021-09-23 18:45:07
 * @LastEditTime: 2021-10-07 15:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\song.js
 */
import { get } from './base.js'

//获取歌手个人所有歌曲
export function getSingerSongs(singer) {
    return get('/artist/songs', {
        id: singer.id,
        limit: 25
    })
}

//获取歌单的歌曲
export function getAlbum(album) {
    return get('/playlist/detail', {
        id: album.id
    })
}

//这个要修改
//拿到图片
export function processSongs(singerSongs) {
    if (!singerSongs.length) {
        return Promise.resolve(singerSongs)
    }

    return Promise.all(singerSongs.map((item) => {
        return new Promise((resolve, reject) => {
            get('/song/detail', { ids: item.id }).then((result) => {
                resolve({
                    ...item,
                    song_pic: `${result.songs[0].al.picUrl}?param=300y300`
                })
            }, (error) => {
                reject(error)
            })
        })
    }))

}

//拿到mp3地址
export function getUrls(singerSongs) {
    if (!singerSongs.length) {
        return Promise.resolve(singerSongs)
    }

    return Promise.all(singerSongs.map((item) => {
        return new Promise((resolve, reject) => {
            get('/song/url', { id: item.id }).then((result) => {
                resolve({
                    ...item,
                    songurl: result?.data?.[0]?.url,
                })
            }, (error) => {
                reject(error)
            })
        })
    }))
}

//获取歌词
const lyricMap = {}
export function getLyric(song) {
    //如果已经有歌词了就不请求了
    if (song.lyric) {
        return Promise.resolve(song.lyric)
    }
    const lyric = lyricMap[song.id]
    //将每次请求到的歌词放lyricMap里面如果存在也不请求
    if (lyric) {
        return Promise.resolve(lyric)
    }
    //进行对歌词的请求封装
    return get('/lyric', {
        id: song.id,
    }).then((result) => {
        // const lyric = result.lrc.lyric ? result.lrc.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
        let lyric = null
        if (result?.lrc?.lyric) {
            lyric = result.lrc.lyric
        } else {
            lyric = '[00:00:00]该歌曲暂时无法获取歌词'
        }
        return lyric
    })
}

