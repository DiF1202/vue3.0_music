/*
 * @Author: your name
 * @Date: 2021-09-23 18:45:07
 * @LastEditTime: 2021-09-24 21:25:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\song.js
 */
import { get } from './base.js'

//获取歌手个人所有歌曲
export function getSingerSongs(singer) {
    return get('/artist/songs', {
        id: singer.id,
        limit: 30
    })
}

export function processSongs(singerSongs) {
    if (!singerSongs.length) {
        return Promise.resolve(singerSongs)
    }


    // return Promise.all(singerSongs.map((item) => {
    //     return new Promise((resolve, reject) => {
    //         get('/song/url', { id: item.id }).then((result) => {
    //             resolve({
    //                 ...item,
    //                 songurl: result?.data?.[0]?.url
    //             })
    //         }, (error) => {
    //             reject(error)
    //         })
    //     })
    // }))
    return Promise.all(singerSongs.map((item) => {
        return new Promise((resolve, reject) => {
            get('/song/url', { id: item.id }).then((result) => {
                resolve({
                    ...item,
                    songurl: result?.data?.[0]?.url
                })
            }, (error) => {
                reject(error)
            })
        })
    }))

    // function funtion_map(singerSongs) {
    //     return singerSongs.map((item) => {
    //         return {
    // id: item.id,
    // name: item.name,
    // authorName: item.ar[0].name,
    // authorId: item.ar[0].id,
    // albumName: item.al.name,
    // albumId: item.al.id,
    // albumPic: item.al.pic,
    // songurl: item.songurl,
    //             // id: item?.id,
    //             // name: item?.name,
    //             // authorName: item?.ar?.[0]?.name,
    //             // authorId: item?.ar?.[0]?.id,
    //             // albumName: item?.al?.name ?? '专辑为空',
    //             // albumId: item?.al?.id,
    //             // albumPic: item?.al?.pic,
    //             // songurl: result?.data?.[0]?.url
    //         };
    //     });
    // }

}

