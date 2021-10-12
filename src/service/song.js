/*
 * @Author: your name
 * @Date: 2021-09-23 18:45:07
 * @LastEditTime: 2021-10-12 12:05:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\song.js
 */
import { get } from './base.js'

//获取歌手个人所有歌曲
export function getSingerSongs(singer) {
    return get('/artist/top/song', {
        id: singer.id,
        // limit: 25
    })
}

//获取歌单的歌曲
export function getAlbum(album) {
    return get('/playlist/detail', {
        id: album.id
    })
}

//根据id数组获取歌曲详情
export function getSongsDetail(ids) {
    return get('/song/detail', {
        ids: ids
    })
}

//根据id数组获取歌曲图片
export function getSongsPic(songs) {
    if (!songs?.length) {
        return Promise.resolve(songs)
    }
    let Array_ids = songs.map((item) => {
        return item.id;
    });
    Array_ids = Array_ids.join(',');

    return get('/song/detail', {
        ids: Array_ids
    })
}

//获取mp3
export function getMp3s(singerSongs) {
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

export function getMp3s2(songs) {
    if (!songs?.length) {
        return Promise.resolve(songs)
    }
    return get('/song/url', {
        id: songs.map((song) => {
            return song.id
        })
    }).then((result) => {
        let urlObject = {}
        result.data.map((item) => {
            urlObject[item.id] = item.url
        })
        return songs.map((song) => {
            song.songurl = urlObject[song.id]
            return song
        })
    })
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

//创建一个mpe3Map 用来存mp3数据
// const songurlsMap = {}
// export function getMp3(song) {
//     //如果song的json结构上已经有了就返回不在请求
//     if (song.songurl) {
//         return Promise.resolve(song.songurl)
//     }
//     //存入Map数据结构中
//     const songurl = songurlsMap[song.id]
//     if (songurl) {
//         return Promise.resolve(songurl)
//     }
//     //对mp3地址请求
//     return get('/song/url', {
//         id: song.id,
//     }).then((result) => {
//         let songurl = null
//         if (result?.data?.[0]?.url) {
//             songurl = result?.data?.[0]?.url
//         }
//         return songurl
//     })
// }

// //获取图片
// const imgsMap = {}
// export function getSongImg(song) {
//     if (song.song_pic) {
//         return Promise.resolve(song.song_pic)
//     }
//     const song_pic = imgsMap[song.id]
//     if (song_pic) {
//         return Promise.resolve(song_pic)
//     }
//     //进行对歌词的请求封装
//     return get('/song/detail', {
//         ids: song.id,
//     }).then((result) => {
//         let song_pic = null
//         if (result?.songs?.[0]?.al?.picUrl) {
//             song_pic = `${result?.songs?.[0]?.al?.picUrl}?param=300y300`
//         }
//         return song_pic
//     })
// }