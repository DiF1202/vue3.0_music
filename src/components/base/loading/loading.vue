<!--
 * @Author: your name
 * @Date: 2021-09-17 15:30:40
 * @LastEditTime: 2021-09-18 22:10:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\loading\loading.vue
-->
<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      title: '正在载入...',
    };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>
