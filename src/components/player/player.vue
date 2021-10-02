<!--
 * @Author: your name
 * @Date: 2021-09-29 15:59:43
 * @LastEditTime: 2021-10-02 16:18:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\player\player.vue
-->
<template>
  <div class="player">
    <div class="normal-player" v-if="fullScreen">
      <div class="background">
        <img :src="currentSong.song_pic" alt="" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">
          {{ currentSong.ar[0].name }}
          {{ currentSong?.ar[1]?.name }}
        </h2>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i @click="changeMode" :class="modeIcon"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i-right">
            <i
              :class="getFavoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
    ></audio>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';
import useMode from './use-mode';
import useFavorite from './use-favorite';
export default {
  name: 'player',
  setup() {
    //data
    const audioRef = ref(null);
    const songReady = ref(false);
    //vuex
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const currentIndex = computed(() => store.state.currentIndex);
    const playList = computed(() => store.state.playList);
    //获取播放状态
    const playing = computed(() => store.state.playing);

    //引入hook函数
    const { modeIcon, changeMode } = useMode();
    const { getFavoriteIcon, toggleFavorite } = useFavorite();

    //computed
    //根据不同播放状态求得不同icon
    const playIcon = computed(() => {
      return playing.value ? 'icon-pause' : 'icon-play';
    });

    const disableCls = computed(() => {
      return songReady.value ? '' : 'disable';
    });

    //watch
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.songurl) {
        return;
      }
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = newSong.songurl;
      audioEl.play();
    });

    //监听playing 控制音乐的播放和暂停
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return;
      }
      const audioEl = audioRef.value;
      newPlaying ? audioEl.play() : audioEl.pause();
    });

    //function
    function goBack() {
      store.commit('setFullScreen', false);
    }

    function togglePlay() {
      if (!songReady.value) {
        return;
      }
      store.commit('setPlayingState', !playing.value);
    }

    //意外暂停 比如睡眠，待机等 audio会触发了暂停机制
    function pause() {
      store.commit('setPlayingState', false);
    }

    //切换到上一首歌曲
    function prev() {
      const list = playList.value;
      if (!songReady.value || !list.length) {
        return;
      }
      //如果只有一首歌
      if (list.length == 1) {
        loop();
      } else {
        let index = currentIndex.value - 1;
        if (index == -1) {
          index = list.length - 1;
        }
        store.commit('setCurrentIndex', index);
        if (!playing.value) {
          store.commit('setPlayingState', true);
        }
      }
    }

    //切换到下一首歌曲
    function next() {
      const list = playList.value;
      if (!songReady.value || !list.length) {
        return;
      }
      if (list.length == 1) {
        loop();
      } else {
        let index = currentIndex.value + 1;
        if (index == list.length) {
          index = 0;
        }
        store.commit('setCurrentIndex', index);
        if (!playing.value) {
          store.commit('setPlayingState', true);
        }
      }
    }

    //循环loop函数
    function loop() {
      const audioEl = audioRef.value;
      audioEl.currentTime = 0;
      audioEl.play();
      store.commit('setPlayingState', true);
    }

    //检测歌曲链接是否缓存好
    function ready() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
    }
    //如果出错的情况，你要把songready设置为true 才能进行下一次切换
    function error() {
      songReady.value = true;
    }
    //return
    return {
      fullScreen,
      currentSong,
      audioRef,
      goBack,
      playIcon,
      togglePlay,
      pause,
      prev,
      next,
      ready,
      disableCls,
      error,
      //钩子函数mode
      modeIcon,
      changeMode,
      //狗子函数favorite
      getFavoriteIcon,
      toggleFavorite,
    };
  },
};
</script>
<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
