<!--
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-09-29 20:35:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\App.vue
-->
<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
  <player></player>
</template>

<script>
import Header from '@/components/header/header.vue';
import Tab from '@/components/tab/tab';
import Player from './components/player/player.vue';

export default {
  components: {
    MHeader: Header,
    Tab,
    Player,
  },
};
</script>

<style lang="scss" scoped>
</style>
