<!--
 * @Author: your name
 * @Date: 2021-09-16 01:37:26
 * @LastEditTime: 2021-09-22 10:56:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\recommend.vue
-->
<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer';
import { formatSingerList } from '@/service/singer';
import IndexList from '../components/base/index-list/index-list.vue';

export default {
  name: 'singer',
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
    };
  },
  async created() {
    const result = await getSingerList(100);
    this.singers = formatSingerList(result.artists);
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
