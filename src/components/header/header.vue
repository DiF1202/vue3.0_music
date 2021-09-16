<!--
 * @Author: your name
 * @Date: 2021-09-15 20:25:53
 * @LastEditTime: 2021-09-16 21:24:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\header\header.vue
-->
<template>
  <div class="header">
    <span class="logo"></span>
    <h1 class="text">Di迪的网抑云</h1>
    <router-link class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'm-header',
};
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .logo {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    // @include bg-image('logo');
    background-color: yellow;
    background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}
</style>
