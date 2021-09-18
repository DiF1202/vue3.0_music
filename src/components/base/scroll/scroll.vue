<!--
 * @Author: your name
 * @Date: 2021-09-17 01:41:42
 * @LastEditTime: 2021-09-17 01:57:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\src\components\base\scroll\scroll.vue
-->
<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScroll from './use-scroll';
import { ref } from 'vue';

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    probeType: {
      type: Number,
      default: 0,
    },
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const rootRef = ref(null);
    const scroll = useScroll(rootRef, props, emit);

    return {
      rootRef,
      scroll,
    };
  },
};
</script>
