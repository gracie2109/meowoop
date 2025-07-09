<template>
  <div id="app">
    <Cropper
      class="cropper"
      :src="img"
      :stencil-props="{
        aspectRatio: 10 / 12,
      }"
      @change="change"
    />
  </div>
</template>

<script lang="ts" setup>
import { Cropper, type Coordinates } from "vue-advanced-cropper"
import "vue-advanced-cropper/dist/style.css"

const img = "https://images.pexels.com/photos/11301535/pexels-photo-11301535.jpeg"

const change = ({ coordinates, canvas }: { coordinates: Coordinates; canvas: HTMLCanvasElement}) => {
  console.log("🌳 ~ coordinates", coordinates)
  console.log("🚀 ~ canvas", canvas)
}
</script>

<style scoped>
.cropper {
  height: 600px;
}
</style>
