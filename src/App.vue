<!--
 * @Author: your name
 * @Date: 2021-09-15 19:16:13
 * @LastEditTime: 2021-09-16 01:45:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\App.vue
-->
<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
</template>

<script>
import Header from '@/components/header/header.vue';
import Tab from '@/components/tab/tab';

export default {
  components: {
    MHeader: Header,
    Tab,
  },
};
</script>

<style lang="scss" scoped>
</style>
