<!--
 * @Author: your name
 * @Date: 2021-10-07 18:52:45
 * @LastEditTime: 2021-10-09 16:58:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\top-detail.vue
-->
<template>
  <div class="top-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
      rank
    ></music-list>
  </div>
</template>

<script>
import { getTopDetail } from '@/service/top-list.js';
import { getMp3s } from '@/service/song.js';
import MusicList from '../components/music-list/music-list.vue';
import storage from 'good-storage';
import { TOP_KEY } from '@/assets/js/constant';
export default {
  name: 'top-detail',
  components: { MusicList },
  props: {
    top: Object,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    computedTop() {
      //ret是返回值变量
      let ret = null;
      const top = this.top;
      if (top) {
        ret = top;
      } else {
        const catchSinger = storage.session.get(TOP_KEY);
        if (catchSinger && catchSinger.id == this.$route.params.id) {
          ret = catchSinger;
        }
      }
      return ret;
    },
    title() {
      const top = this.computedTop;
      return top.name;
    },
    pic() {
      const top = this.computedTop;
      return top.coverImgUrl;
    },
  },
  async created() {
    if (!this.computedTop) {
      const path = this.$route.matched[0].path;
      this.$router.push({
        path,
      });
      return;
    }

    const {
      playlist: { tracks },
    } = await getTopDetail(this.computedTop);
    this.songs = await getMp3s(tracks.slice(0, 50));
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.top-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
