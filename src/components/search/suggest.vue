<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="!songs?.length"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ song?.ar?.[0]?.name }}
            <span v-show="song?.ar?.[1]?.name">/{{ song?.ar?.[1]?.name }}</span>
            -{{ song.name }}
          </p>
        </div>
      </li>
      <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
    </ul>
  </div>
</template>

<script>
import { ref, watch, computed, nextTick } from 'vue';
import { search } from '@/service/search';
import { getMp3s2, getSongsPic } from '@/service/song';
import usePullUpLoad from './use-pull-up-load';

export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const songs = ref([]);
    const hasMore = ref(true);
    const loadingText = ref('');
    const noResultText = ref('抱歉，暂无搜索结果');
    const manualLoading = ref(false);
    const offset = ref(0);

    const loading = computed(() => {
      return !songs?.value?.length;
    });

    const noResult = computed(() => {
      return !songs?.value?.length && !hasMore?.value;
    });

    const pullUpLoading = computed(() => {
      return isPullUpLoad.value && hasMore.value;
    });

    const preventPullUpLoad = computed(() => {
      return loading.value || manualLoading.value;
    });

    const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(
      searchMore,
      preventPullUpLoad
    );

    //watch
    watch(
      () => props.query,
      async (newQuery) => {
        if (!newQuery) {
          return;
        }
        await searchFirst();
      }
    );

    async function searchFirst() {
      if (!props.query) {
        return;
      }
      songs.value = [];
      hasMore.value = true;
      const { result } = await search(props.query);
      if (!result) {
        hasMore.value = false;
        return;
      }
      songs.value = await getSongsPic(result.songs);
      songs.value = songs.value.songs;
      console.log(songs);
      songs.value = await getMp3s2(songs.value);
      hasMore.value = result.hasMore;
      await nextTick();
      await makeItScrollable();
    }

    async function searchMore() {
      if (!hasMore.value || !props.query) {
        return;
      }
      offset.value += 30;
      const { result } = await search(props.query, offset.value);
      if (!result) {
        hasMore.value = false;
        return;
      }
      songs.value = await getSongsPic(result.songs);
      songs.value = songs.value.songs;
      songs.value = songs.value.concat(await getMp3s2(songs.value));
      hasMore.value = result.hasMore;
      await nextTick();
      await makeItScrollable();
    }

    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true;
        await searchMore();
        manualLoading.value = false;
      }
    }

    function selectSong(song) {
      emit('select-song', song);
    }

    return {
      songs,
      loadingText,
      noResultText,
      noResult,
      loading,
      pullUpLoading,
      selectSong,
      // pullUpLoad
      rootRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
