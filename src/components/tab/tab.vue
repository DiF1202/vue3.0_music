<!--
 * @Author: your name
 * @Date: 2021-09-15 20:41:50
 * @LastEditTime: 2021-09-16 13:26:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\tab\tab.vue
-->
<template>
  <div class="tab">
    <router-link
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="tab-item"
    >
      <span class="tab-link">{{ tab.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data() {
    return {
      tabs: [
        {
          name: '推荐',
          path: '/recommend',
        },
        {
          name: '歌手',
          path: '/singer',
        },
        {
          name: '排行',
          path: '/top-list',
        },
        {
          name: '搜索',
          path: '/search',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }
    &.router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
