<template>
  <div id="header">
    <div class="header-wrap" style="padding: 0 1rem">
      <div class="header-wrap">
        <p>{{ $t('dashboard.d5') }}</p>
      </div>

      <div class="icon" @click="$dbStore.toggleshowDrawer()">
        <Icon icon="ic:twotone-close" />
      </div>
    </div>
  </div>

  <div class="wrap">
    <div class="wrap_w">
      <div v-for="i in WIDGET_LIST" :key="i.key" style="border: 1px solid #cccc" class="widget">
        <div
          style="height: 100%; width: 100%"
          class="widget-container"
          @click="
            () => {
              selectedGroup = i
            }
          "
        >
          <p>{{ i.key }}</p>
          <img
            alt="example"
            :src="i.image"
            style="height: 250px; width: 250px; object-fit: contain"
          />
        </div>
      </div>
    </div>

    <div class="wrap_w">
      <div
        v-for="i in selectedGroup?.comp"
        :key="i.key"
        style="border: 1px solid #cccc"
        class="widget"
      >
        <div
          style="height: 100%; width: 100%"
          class="widget-container"
          @click="
            () => {
              selectedGroup = i
            }
          "
        >
          <p>{{ i }}</p>
          <img
            alt="example"
            :src="selectedGroup.image"
            style="height: 250px; width: 250px; object-fit: contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores'
import { WIDGET_LIST } from '@/views/Dashboard/contants/widget'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref } from 'vue'
const $dbStore = useDashboardStore()

const selectedGroup = ref({})
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1rem;
}

.wrap_w {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.widget {
  background-color: white;
  border-radius: 5px;
}

.widget-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  place-content: center;
}

#header {
  height: 60px;
  border-bottom: 1px solid #cccc;
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  align-items: center;
}

.icon {
  cursor: pointer;
}
</style>
