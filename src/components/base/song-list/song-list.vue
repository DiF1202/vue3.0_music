<!--
 * @Author: your name
 * @Date: 2021-09-24 18:28:05
 * @LastEditTime: 2021-09-29 14:30:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\song-list\song-list.vue
-->
<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <div class="rank"></div>
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ title }}--{{ song.al.name }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
    },
  },
  emits: ['select'],
  methods: {
    selectItem(song, index) {
      this.$emit('select', { song, index });
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>