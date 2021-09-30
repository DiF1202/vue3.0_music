<!--
 * @Author: your name
 * @Date: 2021-09-23 00:38:27
 * @LastEditTime: 2021-09-30 11:03:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\singer-detail.vue
-->
<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading">
    </music-list>
  </div>
</template>

<script>
// import { getSingerDetail } from '@/service/singer';
import { getSingerSongs } from '@/service/song.js';
import { processSongs } from '@/service/song.js';
import { getUrls } from '@/service/song.js';
import MusicList from '../components/music-list/music-list.vue';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant';

export default {
  name: 'singer-detail',
  components: { MusicList },
  props: {
    singer: Object,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    computedSinger() {
      //ret是返回值变量
      let ret = null;
      const singer = this.singer;
      if (singer) {
        ret = singer;
      } else {
        const catchSinger = storage.session.get(SINGER_KEY);
        if (catchSinger && catchSinger.id == this.$route.params.id) {
          ret = catchSinger;
        }
      }
      return ret;
    },
    title() {
      const singer = this.computedSinger;
      return singer.name;
    },
    pic() {
      const singer = this.computedSinger;
      return singer.pic;
    },
  },
  async created() {
    //改动在这里
    // const data_songs = await getSingerSongs(this.singer);
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path;
      this.$router.push({
        path,
      });
      return;
    }

    const data_songs = await getSingerSongs(this.computedSinger);
    //获取 每个歌手能播放的歌

    this.songs = data_songs.songs;
    this.songs = await processSongs(data_songs.songs);
    this.songs = await getUrls(this.songs);
    this.loading = false;
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
