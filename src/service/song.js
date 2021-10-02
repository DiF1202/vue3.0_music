/*
 * @Author: your name
 * @Date: 2021-09-23 18:45:07
 * @LastEditTime: 2021-10-03 02:06:19
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

//这个要修改
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

