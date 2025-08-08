<template>
  <div id="app">
    <h1>Vue Advanced Cropper with Image Upload</h1>

    <!-- Image Upload Input -->
    <input type="file" @change="onFileChange" accept="image/*" />

    <!-- Cropper Component -->
    <div v-if="img">
      <cropper
        class="cropper"
        :src="img"
        :stencil-props="{ aspectRatio: 16 / 9 }"
        @change="onCropChange"
        @ready="onImageReady"
        @error="onImageError"
      />
    </div>

    <!-- Display Cropped Image -->
    <div v-if="croppedImage">
      <h2>Cropped Image:</h2>
      <img :src="croppedImage" alt="Cropped" />
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'App',
  components: {
    Cropper,
  },
  data() {
    return {
      img: null, // Original image source
      croppedImage: null, // Cropped image source
    }
  },
  methods: {
    // Handle File Upload
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.img = e.target.result // Set the selected image as the cropper's source
        }
        reader.readAsDataURL(file)
      }
    },
    // Handle Cropping Changes
    onCropChange({ coordinates, canvas }) {
      if (canvas) {
        this.croppedImage = canvas.toDataURL('image/png') // Export cropped image as base64
      }
    },
    onImageReady() {
      console.log('Image successfully loaded into the cropper!')
    },
    onImageError(error) {
      console.error('Error loading image into the cropper:', error)
    },
  },
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

input[type='file'] {
  margin-bottom: 20px;
}

.cropper {
  width: 100%;
  max-width: 600px;
  height: 400px;
  background: #ddd;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
