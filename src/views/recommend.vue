<!--
 * @Author: your name
 * @Date: 2021-09-16 01:37:26
<<<<<<< HEAD
 * @LastEditTime: 2021-09-20 01:04:41
=======
 * @LastEditTime: 2021-09-20 01:36:42
>>>>>>> singer
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\recommend.vue
-->
<template>
  <div class="recommend" v-loading="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li v-for="item in playlists" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.creator.nickname }}
                </h2>
                <p class="title">
                  {{ item.name }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getPlayList } from '@/service/recommend';
import Slider from '@/components/base/slider/slider';
import Scroll from '@/components/base/scroll/scroll';
export default {
  name: 'recommend',
  components: {
    Slider,
    Scroll,
  },
  data() {
    return {
      sliders: [],
      playlists: [],
      loadingText: '正在载入',
    };
  },
  computed: {
    loading() {
      return !this.sliders.length && !this.playlists.length;
    },
  },
  async created() {
    //获取轮播图数据
    const result = await getRecommend();
    this.sliders = result.banners;
    //获取歌单数据
    const playList = await getPlayList(15);
    this.playlists = playList.playlists;
    // console.log(this.playlists);
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
