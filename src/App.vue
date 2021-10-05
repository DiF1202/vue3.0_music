<!--
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-10-05 19:01:29
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
import Player from '@/components/player/player';

export default {
  components: {
    Player,
    MHeader: Header,
    Tab,
  },
};
</script>

<style lang="scss" scoped>
</style>
