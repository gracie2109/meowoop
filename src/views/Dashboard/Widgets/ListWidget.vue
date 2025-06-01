<template>
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

    <div class="wrap_w" >
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
import {  WIDGET_LIST } from '@/views/Dashboard/contants/widget'
import {  ref } from 'vue'

const selectedGroup = ref({})
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
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
</style>
