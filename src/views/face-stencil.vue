<template>
  <div class="circle-stencil" :style="stencilStyle">
    <DraggableElement class="circle-stencil__handler" @drag="onHandlerMove">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#aa2525" d="M11.5 15.577v-8.65l-2.33 2.33l-.708-.718L12 5l3.539 3.539l-.708.719L12.5 6.927v8.65zM5 19v-4.038h1V18h12v-3.038h1V19z"/></svg>
    </DraggableElement>
    <DraggableArea @move="onMove">
      <PreviewResult
        class="circle-stencil__preview"
        :img="props.img"
        :stencilCoordinates="props.stencilCoordinates"
        :resultCoordinates="props.resultCoordinates"
      />
    </DraggableArea>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  DraggableElement,
  DraggableArea,
  PreviewResult,
  ResizeEvent,
  MoveEvent,
} from 'vue-advanced-cropper'

// Define props with their expected types
interface Coordinates {
  left: number
  top: number
  width: number
  height: number
}

interface ImgObject {
  src: string
  width: number
  height: number
}

const props = defineProps<{
  img: ImgObject
  stencilCoordinates: Coordinates
  resultCoordinates: Coordinates
}>()

// Declare events this component will emit
const emit = defineEmits<{
  (e: 'move', event: MoveEvent): void
  (e: 'resize', event: ResizeEvent): void
}>()

// Compute inline style for the stencil wrapper
const stencilStyle = computed(() => {
  const { left, top, width, height } = props.stencilCoordinates
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  }
})

// Handler for area movement
function onMove(event: MoveEvent) {
  emit('move', event)
}

// Handler for resizing via the drag icon
function onHandlerMove(dragEvent: MoveEvent) {
  const shift = dragEvent?.shift()
  const widthResize = shift.left
  const heightResize = -shift.top

  emit(
    'resize',
    new ResizeEvent(dragEvent.nativeEvent, {
      left: widthResize,
      right: widthResize,
      top: heightResize,
      bottom: heightResize,
    }),
  )
}

// Optional helper if you need to enforce fixed aspect ratio
function aspectRatios() {
  const ratio = 0.85
  return {
    minimum: ratio,
    maximum: ratio,
  }
}
</script>
<style>
.circle-stencil {
  position: absolute;
  box-sizing: border-box;
  border: 2px dashed white;
  border-radius: 50%;
  cursor: move;
}

.circle-stencil__handler {
  position: absolute;
  right: 15%;
  top: 14%;
  transform: translate(50%, -50%);
  z-index: 1;
  cursor: ne-resize;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-stencil__preview {
  border-radius: 50%;
  overflow: hidden;
}
</style>

