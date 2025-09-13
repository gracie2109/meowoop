<template>
  <div>
      <ImageUploadSection :max="2"
@upload-to-server="uploadServer"

      />
  </div>
</template>

<script setup lang="ts">
import ImageUploadSection from '@/components/Image/index.vue';


const uploadServer = (vl) => {
  console.log('vl', vl)
}

defineOptions({name: 'Test-comp'})
</script>

<style scoped>

</style>
