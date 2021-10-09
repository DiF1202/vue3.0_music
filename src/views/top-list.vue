<!--
 * @Author: your name
 * @Date: 2021-09-16 01:40:47
 * @LastEditTime: 2021-10-09 16:59:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\top-list.vue
-->
<template>
  <div class="top-list" v-loading="loading">
    <scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList4"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl" />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.tracks"
              :key="song.id"
            >
              <span>{{ index + 1 }}. </span>
              <span>{{ song.first }}-{{ song.second }}</span>
            </li>
          </ul>
        </li>
        <div class="playLists">
          <li
            class="albums"
            v-for="item in toplistLast"
            :key="item.id"
            @click="selectItem(item)"
          >
            <div class="icons">
              <img width="100" height="100" v-lazy="item.coverImgUrl" />
            </div>
          </li>
        </div>
      </ul>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Scroll from '@/components/wrap-scroll';
import { getTopList } from '@/service/top-list';
import { TOP_KEY } from '@/assets/js/constant';
import storage from 'good-storage';
export default {
  name: 'top-list',
  components: {
    Scroll,
  },
  data() {
    return {
      topList: [],
      topList4: [],
      toplistLast: [],
      loading: true,
      selectedTop: null,
    };
  },
  async created() {
    const { list } = await getTopList();
    this.topList = list;
    this.topList4 = this.topList.slice(0, 4);
    this.toplistLast = this.topList.slice(4);
    this.loading = false;
  },
  methods: {
    selectItem(top) {
      this.selectedTop = top;
      this.cacheTop(top);
      this.$router.push({
        path: `/top-list/${top.id}`,
      });
    },
    cacheTop(top) {
      storage.session.set(TOP_KEY, top);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-list {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .top-list-content {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
    .playLists {
      display: flex;
      margin: 0 20px;
      justify-content: space-between;
      flex-wrap: wrap;
      .albums {
        padding-top: 20px;
        width: 33%;
        display: flex;
        justify-content: center;
        .icons {
          height: 100px;
          width: 100px;
        }
      }
      .albums:nth-child(3n + 1) {
        justify-content: flex-start;
      }
      .albums:nth-child(3n) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
