<!--
 * @Author: your name
 * @Date: 2021-09-23 00:38:27
 * @LastEditTime: 2021-10-13 02:40:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\singer-detail.vue
-->
<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
      :showAuthorName="showAuthorName"
    >
    </music-list>
  </div>
</template>

<script>
import { getSingerSongs, getMp3s2 } from '@/service/song.js';
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
      showAuthorName: true,
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
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path;
      this.$router.push({
        path,
      });
      return;
    }
    const { songs } = await getSingerSongs(this.computedSinger);
    this.songs = await getMp3s2(songs);
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
