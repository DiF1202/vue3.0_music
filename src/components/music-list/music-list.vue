<!--
 * @Author: your name
 * @Date: 2021-09-23 23:21:50
 * @LastEditTime: 2021-09-29 15:42:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\music-list\music-list.vue
-->
<template>
  <div class="music-list">
    <!-- 返回按钮 -->
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <!-- 标题名字 -->
    <h1 class="title">{{ title }}</h1>
    <!-- 详情页的背景 -->
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <!-- 半透明保护层 -->
      <div class="filter" :style="filterStyle"></div>
    </div>

    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result="noResult"
      :probeType="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <!-- 所有歌曲可以抽象封装成一个组件 -->
        <song-list :songs="songs" :title="title" @select="selectItem">
        </song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '../base/scroll/scroll.vue';
import SongList from '../base/song-list/song-list.vue';
import { mapActions } from 'vuex';
const RESERVED_HEIGHT = 40;

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
    loading: Boolean,
    noResultText: {
      type: String,
      default: '抱歉，没有找到可播放的歌曲',
    },
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length;
    },
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = '70%';
      let height = 0;
      let translateZ = 0;

      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }

      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      // scrollY>0是往上推的一个过程
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    //动态属性 拉上去就隐藏
    playBtnStyle() {
      let display = '';
      //这个判断就是滚动在上方
      if (this.scrollY >= this.maxTranslateY) {
        display = 'none';
      }
      return {
        display,
      };
    },
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  methods: {
    goBack() {
      this.$router.back();
      // const path = this.$route.matched[0].path;
      // this.$router.push({
      //   path,
      // });
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    //vuex中的语法糖 mapActions
    ...mapActions(['selectPlay', 'randomPlay']),
    selectItem({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    //随机播放
    random() {
      this.randomPlay(this.songs);
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
    height: 40%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
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
