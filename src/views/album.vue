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
import { getAlbum } from '../service/song';
import MusicList from '../components/music-list/music-list.vue';
import storage from 'good-storage';
import { ALBUM_KEY } from '@/assets/js/constant';
import { processSongs, getUrls } from '@/service/song.js';
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
    const data_songs = await getAlbum(this.computedAlbum);
    //获取歌单能播放的歌
    this.songs = data_songs.playlist.tracks;
    this.songs = await processSongs(this.songs);
    this.songs = await getUrls(this.songs);
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
