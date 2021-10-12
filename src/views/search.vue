<!--
 * @Author: your name
 * @Date: 2021-09-16 01:37:26
 * @LastEditTime: 2021-10-12 19:51:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\views\recommend.vue
-->
<template>
  <!-- 搜索框 -->
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="(item, index) in hotKeys"
              :key="index"
              @click="addQuery(item.first)"
            >
              <span>{{ item.first }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory?.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          >
          </confirm>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          ></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong"></suggest>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/wrap-scroll';
import Suggest from '@/components/search/suggest';
import SearchInput from '@/components/search/search-input';
import SearchList from '@/components/search/search-list';
import Confirm from '@/components/base/confirm/confirm';
import { ref, computed, watch, nextTick } from 'vue';
import { getHotKeys } from '../service/search';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useSearchHistory from '@/components/search/use-search-history';

export default {
  name: 'search',
  components: {
    SearchInput,
    Scroll,
    Suggest,
    SearchList,
    Confirm,
  },
  setup() {
    //data
    const query = ref('');
    const hotKeys = ref([]);
    const searchHistory = computed(() => store.state.searchHistory);
    const scrollRef = ref(null);
    const confirmRef = ref(null);
    //vuex
    const store = useStore();
    const router = useRouter();
    //hook
    const { saveSearch, deleteSearch, clearSearch } = useSearchHistory();
    //获取数据
    getHotKeys().then((data) => {
      hotKeys.value = data.result.hots;
    });

    watch(query, async (newQuery) => {
      if (!newQuery) {
        await nextTick();
        refreshScroll();
      }
    });

    //function
    function refreshScroll() {
      scrollRef.value.scroll.refresh();
    }

    function addQuery(s) {
      query.value = s;
    }

    function selectSong(song) {
      saveSearch(query.value);
      store.dispatch('addSong', song);
    }
    function showConfirm() {
      confirmRef.value.show();
    }

    return {
      selectSong,
      query,
      confirmRef,
      hotKeys,
      scrollRef,
      //function
      showConfirm,
      addQuery,
      searchHistory,
      deleteSearch,
      clearSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
