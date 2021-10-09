<!--
 * @Author: your name
 * @Date: 2021-09-24 18:28:05
 * @LastEditTime: 2021-10-09 16:55:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\song-list\song-list.vue
-->
<template>
  <div>
    <ul class="song-list">
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="song.id"
        @click="selectItem(song, index)"
      >
        <div class="rank" v-if="rank">
          <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
        </div>
        <div class="content">
          <h2 class="name">{{ song?.name }}</h2>
          <p class="desc">
            {{ song?.ar?.[0]?.name }}
            <span v-if="song?.ar?.[1]?.name">/</span>
            {{ song?.ar?.[1]?.name }}--{{ song?.al?.name }}
          </p>
        </div>
      </li>
    </ul>
  </div>
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
    rank: Boolean,
  },
  emits: ['select'],
  methods: {
    selectItem(song, index) {
      this.$emit('select', { song, index });
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return 'text';
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1;
      }
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
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 20px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image('first');
        }
        &.icon1 {
          @include bg-image('second');
        }
        &.icon2 {
          @include bg-image('third');
        }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
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
