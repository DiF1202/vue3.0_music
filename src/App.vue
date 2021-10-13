<!--
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-10-13 02:52:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\App.vue
-->
<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view :style="viewStyle" name="user" v-slot="{ Component }">
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <player></player>
</template>

<script>
import Header from '@/components/header/header.vue';
import Tab from '@/components/tab/tab';
import Player from '@/components/player/player';
import { mapState } from 'vuex';

export default {
  components: {
    Player,
    MHeader: Header,
    Tab,
  },
  computed: {
    viewStyle() {
      const bottom = this.playList.length ? '60px' : '0';
      return {
        bottom,
      };
    },
    ...mapState(['playList']),
  },
};
</script>

<style lang="scss" scoped>
</style>
