<!--
 * @Author: your name
 * @Date: 2021-09-16 01:37:26
 * @LastEditTime: 2021-10-14 16:40:43
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
            <li
              v-for="item in playlists"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img
                  width="60"
                  height="60"
                  v-lazy="item.coverImgUrl + '?param=100y100'"
                />
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
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :album="selectedAlbum" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getRecommend, getPlayList } from '@/service/recommend';
import Slider from '@/components/base/slider/slider';
import Scroll from '../components/wrap-scroll/index';
import { ALBUM_KEY } from '@/assets/js/constant';
import storage from 'good-storage';

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
      selectedAlbum: null,
    };
  },
  computed: {
    loading() {
      return !this.sliders.length && !this.playlists.length;
    },
  },
  async created() {
    //获取轮播图数据
    const { banners } = await getRecommend();
    this.sliders = banners;
    //获取歌单数据
    const { playlists } = await getPlayList(100);
    this.playlists = playlists;
  },
  methods: {
    selectItem(album) {
      this.selectedAlbum = album;
      this.cacheAlbum(album);
      this.$router.push({
        path: `/recommend/${album.id}`,
      });
    },
    cacheAlbum(album) {
      storage.session.set(ALBUM_KEY, album);
    },
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
