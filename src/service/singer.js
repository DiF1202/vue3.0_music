/*
 * @Author: your name
 * @Date: 2021-09-20 01:31:18
 * @LastEditTime: 2021-09-24 23:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\service\singer.js
 */
import { get } from './base.js'

//获取歌手列表
export function getSingerList(params) {
    return get('/artist/list', {
        limit: params
    })
}

//整理数据
export function formatSingerList(singerList) {
    const HOT_NAME = '热';
    let pinyin = require('pinyin');

    // 做一层数据映射，构造单个 singer 数据结构
    function map(singerList) {
        return singerList.map((item) => {
            return {
                id: item.id,
                name: item.name,
                pic: item.picUrl
                    // .replace(/\.webp$/, '.jpg')
                    .replace('150x150', '800x800'),
            };
        });
    }

    // 构造歌手 Map 数据结构
    const singerMap = {
        hot: {
            title: HOT_NAME,
            list: map(singerList.slice(0, 10)),
        },
    };

    singerList.forEach((item) => {
        // 把歌手名转成拼音
        const p = pinyin(item.name);
        if (!p || !p.length) {
            return;
        }
        // 获取歌手名拼音的首字母
        const key = p[0][0].slice(0, 1).toUpperCase();
        if (key) {
            if (!singerMap[key]) {
                singerMap[key] = {
                    title: key,
                    list: [],
                };
            }
            // 每个字母下面会有多名歌手
            singerMap[key].list.push(map([item])[0]);
        }
    });

    // 热门歌手
    const hot = [];
    // 字母歌手
    const letter = [];

    // 遍历处理 singerMap，让结果有序
    for (const key in singerMap) {
        const item = singerMap[key];
        if (item.title.match(/[a-zA-Z]/)) {
            letter.push(item);
        } else if (item.title === HOT_NAME) {
            hot.push(item);
        }
    }
    // 按字母顺序排序
    letter.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    });

    return hot.concat(letter)
}

//获取歌手详情信息
export function getSingerDetail(singer) {
    return get('/artist/detail', {
        id: singer.id
    })
}

