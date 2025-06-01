<template>
  <div style="position: relative">
    <DashboardHeader />
    <DashboardControlHeader />
    <div class="dashboard-content">
      <GridLayout
        v-model:layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="!!editMode"
        :is-resizable="!!editMode"
        :responsive="true"
        :vertical-compact="true"
        :use-css-transforms="true"
        class="grid"
        :class="{ 'edit-mode': editMode }"
        :is-bounded="true"
      >
        <GridItem
          v-for="item in layout"
          :key="item?.i"
          :x="item?.x"
          :y="item?.y"
          :w="item?.w"
          :h="item?.h"
          :i="item?.i"
        >
          <div>
            {{ item }}
          </div>
        </GridItem>
      </GridLayout>
    </div>
  </div>
  <Drawer
    placement="right"
    :closable="false"
    :open="showDrawer"
    :get-container="false"
    :style="{ position: 'absolute' }"
    width="60vw"
    destroyOnClose
    :maskClosable="false"
    :body-style="{
      background: '#fffffe',
      padding: 0,
    
    }"
  >
    <ListWidget />
  </Drawer>
</template>

<script setup lang="ts">
import DashboardHeader from '@/views/Dashboard/components/dashboard-header/Index.vue'
import DashboardControlHeader from './components/control-header/Index.vue'
import { useDashboardStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { GridLayout, GridItem } from 'vue-grid-layout-v3'
import { onMounted, ref } from 'vue'
import { Drawer } from 'ant-design-vue'
import ListWidget from './Widgets/ListWidget.vue'
const $store = useDashboardStore()

const { editMode, showDrawer } = storeToRefs($store)

const layout = ref([
  { x: 0, y: 0, w: 2, h: 2, i: '0' },
  { x: 2, y: 0, w: 2, h: 4, i: '1' },
  { x: 4, y: 0, w: 2, h: 5, i: '2' },
  { x: 6, y: 0, w: 2, h: 3, i: '3' },
  { x: 8, y: 0, w: 2, h: 3, i: '4' },
  { x: 10, y: 0, w: 2, h: 3, i: '5' },
  { x: 0, y: 5, w: 2, h: 5, i: '6' },
  { x: 2, y: 5, w: 2, h: 5, i: '7' },
  { x: 4, y: 5, w: 2, h: 5, i: '8' },
  { x: 6, y: 4, w: 2, h: 4, i: '9' },
  { x: 8, y: 4, w: 2, h: 4, i: '10' },
  { x: 10, y: 4, w: 2, h: 4, i: '11' },
  { x: 0, y: 10, w: 2, h: 5, i: '12' },
  { x: 2, y: 10, w: 2, h: 5, i: '13' },
  { x: 4, y: 8, w: 2, h: 4, i: '14' },
  { x: 6, y: 8, w: 2, h: 4, i: '15' },
  { x: 8, y: 10, w: 2, h: 5, i: '16' },
  { x: 10, y: 4, w: 2, h: 2, i: '17' },
  { x: 0, y: 9, w: 2, h: 3, i: '18' },
  { x: 2, y: 6, w: 2, h: 2, i: '19' },
])
defineOptions({
  name: 'DashboardIndex',
})

onMounted(() => {
  $store.searchList({ page: 1, size: 1000 })
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
