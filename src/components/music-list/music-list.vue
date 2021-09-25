<!--
 * @Author: your name
 * @Date: 2021-09-23 23:21:50
 * @LastEditTime: 2021-09-24 20:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\music-list\music-list.vue
-->
<template>
  <div class="music-list">
    <!-- 返回按钮 -->
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <!-- 标题名字 -->
    <h1 class="title">{{ title }}</h1>
    <!-- 详情页的背景 -->
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <!-- 半透明保护层 -->
      <div class="filter"></div>
    </div>
    <scroll class="list">
      <div class="song-list-wrapper">
        <!-- 所有歌曲可以抽象封装成一个组件 -->
        <song-list :songs="songs" :title="title"> </song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '../base/scroll/scroll.vue';
import SongList from '../base/song-list/song-list.vue';
export default {
  name: 'music-list',
  components: { scroll, SongList },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
  },
  computed: {
    bgImageStyle() {
      return {
        backgroundImage: `url(${this.pic})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    // height: 50%;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
