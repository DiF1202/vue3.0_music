<!--
 * @Author: your name
 * @Date: 2021-10-07 11:47:50
 * @LastEditTime: 2021-10-12 00:11:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\album.vue
-->
<template>
  <div class="album">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getAlbum, getSongsDetail, getMp3s2 } from '../service/song';
import MusicList from '../components/music-list/music-list.vue';
import storage from 'good-storage';
import { ALBUM_KEY } from '@/assets/js/constant';
export default {
  name: 'album',
  components: { MusicList },
  props: {
    album: Object,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    computedAlbum() {
      //ret是返回值变量
      let ret = null;
      const album = this.album;
      if (album) {
        ret = album;
      } else {
        const catchAlbum = storage.session.get(ALBUM_KEY);
        if (catchAlbum && catchAlbum.id == this.$route.params.id) {
          ret = catchAlbum;
        }
      }
      return ret;
    },
    title() {
      const album = this.computedAlbum;
      return album.name;
    },
    pic() {
      const album = this.computedAlbum;
      return album.coverImgUrl;
    },
  },
  async created() {
    if (!this.computedAlbum) {
      const path = this.$route.matched[0].path;
      this.$router.push({
        path,
      });
      return;
    }
    const { playlist } = await getAlbum(this.computedAlbum);
    //获取数组ids
    const ids = playlist.trackIds;
    let Array_ids = ids.map((item) => {
      return item.id;
    });
    Array_ids = Array_ids.join(',');
    //进行请求
    //解构出songs
    const { songs } = await getSongsDetail(Array_ids);
    this.songs = await getMp3s2(songs);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
