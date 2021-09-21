<!--
 * @Author: your name
 * @Date: 2021-09-20 16:50:59
 * @LastEditTime: 2021-09-21 20:50:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\index-list\index-list.vue
-->
<template>
  <scroll class="index-list" :probe-type="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" class="item">
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed-title">{{ fixedTitle }}</div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll';
import useFixed from './use-fixed';
export default {
  name: 'index-list',
  components: { Scroll },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const { groupRef } = useFixed(props);
    return {
      groupRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
</style>