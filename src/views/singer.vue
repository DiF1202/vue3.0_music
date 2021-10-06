<!--
 * @Author: your name
 * @Date: 2021-09-16 01:37:26
 * @LastEditTime: 2021-10-07 02:06:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\recommend.vue
-->
<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <!-- <router-view :singer="selectedSinger"></router-view> -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer';
import { formatSingerList } from '@/service/singer';
import IndexList from '../components/index-list/index-list.vue';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant';

export default {
  name: 'singer',
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList(100);
    this.singers = formatSingerList(result.artists);
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.catchSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`,
      });
    },
    catchSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
