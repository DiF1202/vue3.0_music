<!--
 * @Author: your name
 * @Date: 2021-09-23 00:38:27
 * @LastEditTime: 2021-09-24 21:24:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\singer-detail.vue
-->
<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :pic="pic"> </music-list>
  </div>
</template>

<script>
// import { getSingerDetail } from '@/service/singer';
import { getSingerSongs } from '@/service/song.js';
import { processSongs } from '@/service/song.js';
import MusicList from '../components/music-list/music-list.vue';

export default {
  name: 'singer-detail',
  components: { MusicList },
  props: {
    singer: Object,
  },
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    pic() {
      return this.singer.pic;
    },
  },
  async created() {
    //歌手详情信息
    // const detailMessage = await getSingerDetail(this.singer);
    // console.log(this.singer.name);
    //歌手 所有歌曲
    const data_songs = await getSingerSongs(this.singer);
    //获取 每个歌手能播放的歌

    this.songs = await processSongs(data_songs.songs);

    console.log(this.songs);
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
