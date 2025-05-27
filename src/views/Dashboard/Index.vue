<template>
  <div style="position: relative">
    <DashboardHeader />
    <DashboardControlHeader />
    <div class="dashboard-content">
      <GridLayout
        v-model:layout="currentWidget"
        :col-num="12"
        :row-height="30"
        :is-draggable="!!editMode"
        :is-resizable="!!editMode"
        :responsive="false"
        :vertical-compact="false"
        :prevent-collision="true"
        :use-css-transforms="true"
        class="grid"
        :class="{ 'edit-mode': editMode }"
      >
        <GridItem
          v-for="item in currentWidget"
          :key="item?.i"
          :static="item?.static"
          :x="item?.x"
          :y="item?.y"
          :w="item?.w"
          :h="item?.h"
          :i="item?.i"
        >
          <span class="text">{{ item?.i }}</span>
        </GridItem>
      </GridLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '@/views/Dashboard/components/dashboard-header/Index.vue'
import DashboardControlHeader from './components/control-header/Index.vue'
import { useDashboardStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { GridLayout, GridItem } from 'vue-grid-layout-v3'
import { onMounted } from 'vue'

const $store = useDashboardStore()
const { currentWidget, editMode, currentDashboard } = storeToRefs($store)

defineOptions({
  name: 'DashboardIndex',
});


onMounted(() => {
  $store.searchList({ page: 1, size: 1000 });
})
</script>

<style scoped>
.grid {
  position: relative;
  width: 100%;
  min-height: 82vh;
  margin: 0 auto;
}

.edit-mode::before {
  content: '';
  background-size: calc(calc(100% - 5px) / 24) 40px;
  background-image:
    linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
  height: calc(100% - 5px);
  width: calc(100% - 5px);
  position: absolute;
  background-repeat: repeat;
  margin: 5px;
}

.vue-grid-layout {
  background: white;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item .text {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
</style>
