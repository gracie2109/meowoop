<template>
  <div class="facebook-cropper">
    <!-- Upload Section -->
    <div v-if="!selectedImage" class="upload-section">
      <div class="upload-header">
        <h2>Create Post</h2>
        <button class="close-btn" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </button>
      </div>

      <div
        class="upload-area"
        :class="{ 'drag-over': isDragOver }"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        @click="triggerFileInput"
      >
        <input
          ref="fileInput"
          type="file"
          @change="onFileChange"
          accept="image/*"
          multiple
          style="display: none"
        />

        <div class="upload-content">
          <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
            </svg>
          </div>
          <h3>Add Photos/Videos</h3>
          <p>or drag and drop</p>
        </div>
      </div>

      <!-- Multiple Images Preview -->
      <div v-if="uploadedImages.length > 0" class="images-grid">
        <div
          v-for="(img, index) in uploadedImages"
          :key="img.id"
          class="image-thumbnail"
          @click="selectImageForEdit(img, index)"
        >
          <img :src="img.croppedData || img.preview" :alt="`Image ${index + 1}`" />
          <button class="remove-image" @click.stop="removeImage(index)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path
                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
              />
            </svg>
          </button>
          <div class="edit-overlay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path
                d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M20.71,7.04Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="uploadedImages.length > 0" class="upload-actions">
        <button class="btn btn-primary" @click="proceedToPost">
          Create Post ({{ uploadedImages.length }}
          {{ uploadedImages.length === 1 ? 'photo' : 'photos' }})
        </button>
      </div>
    </div>

    <!-- Cropping Modal -->
    <div v-if="selectedImage && showCropper" class="cropper-modal">
      <div class="cropper-header">
        <button class="back-btn" @click="backToGallery">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </button>
        <h3>Edit Photo</h3>
        <button class="save-btn" @click="saveCroppedImage" :disabled="!hasCropChanges">Save</button>
      </div>

      <div class="cropper-container">
        <div class="cropper-wrapper">
          <Cropper
            ref="cropperRef"
            class="cropper"
            :src="currentImageSrc"
            :stencil-component="currentStencil"
            :stencil-props="stencilProps"
            @change="onCropChange"
            @ready="onCropperReady"
          />
        </div>

        <!-- Cropper Controls -->
        <div class="cropper-controls">
          <div class="aspect-ratio-controls">
            <h4>Aspect Ratio</h4>
            <div class="ratio-buttons">
              <button
                v-for="ratio in aspectRatios"
                :key="ratio.name"
                :class="['ratio-btn', { active: selectedRatio === ratio.name }]"
                @click="setAspectRatio(ratio)"
              >
                <div class="ratio-icon" :style="{ aspectRatio: ratio.value }"></div>
                <span>{{ ratio.name }}</span>
              </button>
            </div>
          </div>

          <div class="adjustment-controls">
            <h4>Adjustments</h4>
            <div class="slider-group">
              <label>
                <span>Zoom</span>
                <input
                  type="range"
                  v-model.number="zoomLevel"
                  min="0.5"
                  max="3"
                  step="0.1"
                  @input="applyZoom"
                />
                <span>{{ zoomLevel.toFixed(1) }}x</span>
              </label>
            </div>
          </div>

          <div class="transform-controls">
            <h4>Transform</h4>
            <div class="transform-buttons">
              <button @click="rotateImage(-90)" class="transform-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20V18A6,6 0 0,0 18,12A6,6 0 0,0 12,6H10.5L12.5,4H12M6.5,10L4.5,12L6.5,14L8.5,12L6.5,10Z"
                  />
                </svg>
                Rotate Left
              </button>
              <button @click="rotateImage(90)" class="transform-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20V18A6,6 0 0,1 6,12A6,6 0 0,1 12,6H13.5L11.5,4H12M17.5,10L19.5,12L17.5,14L15.5,12L17.5,10Z"
                  />
                </svg>
                Rotate Right
              </button>
              <button @click="flipImage('horizontal')" class="transform-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15,21H9V9L15,15V21M23,12L16,5V8H8V16H16V19L23,12Z" />
                </svg>
                Flip H
              </button>
              <button @click="flipImage('vertical')" class="transform-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,9H21V15H15L21,22H15V16H9V22H3L9,15V9M12,8V2L5,9H8V1H16V9H19L12,8Z" />
                </svg>
                Flip V
              </button>
              <button @click="resetImage" class="transform-btn reset-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12,4C7.58,4 4,7.58 4,12A1,1 0 0,0 5,13A1,1 0 0,0 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18H9L12.5,21.5L16,18H12A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                  />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final Preview -->
    <div v-if="selectedImage && !showCropper" class="preview-section">
      <div class="preview-header">
        <h3>Create Post</h3>
        <button class="close-btn" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </button>
      </div>

      <div class="post-composer">
        <div class="user-avatar">
          <div class="avatar-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </svg>
          </div>
        </div>
        <textarea
          v-model="postText"
          placeholder="What's on your mind?"
          class="post-textarea"
        ></textarea>
      </div>

      <div class="image-preview-container">
        <div v-for="(img, index) in processedImages" :key="img.id" class="image-preview-item">
          <img :src="img.croppedData || img.preview" :alt="`Preview ${index + 1}`" />
          <button class="edit-image-btn" @click="editImage(index)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path
                d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M20.71,7.04Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="post-actions">
        <button class="btn btn-secondary" @click="backToUpload">Add More Photos</button>
        <button class="btn btn-primary" @click="publishPost">Post</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { Cropper, RectangleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

// Define emits
const emit = defineEmits(['close', 'post-created'])

// Reactive data
const uploadedImages = ref([])
const selectedImage = ref(null)
const selectedImageIndex = ref(-1)
const showCropper = ref(false)
const isDragOver = ref(false)
const fileInput = ref(null)
const cropperRef = ref(null)
const postText = ref('')
const hasCropChanges = ref(false)
const currentCropData = ref(null)

// Cropper controls
const selectedRatio = ref('Original')
const zoomLevel = ref(1)
const rotation = ref(0)
const flipH = ref(false)
const flipV = ref(false)
const currentImageSrc = ref('')

const aspectRatios = [
  { name: 'Original', value: null },
  { name: 'Square', value: 1 },
  { name: '4:5', value: 4 / 5 },
  { name: '16:9', value: 16 / 9 },
  { name: '9:16', value: 9 / 16 },
]

// Watch for zoom changes from cropper
let isUpdatingZoom = false

watch(zoomLevel, (newZoom) => {
  if (!isUpdatingZoom && cropperRef.value) {
    applyZoom()
  }
})

// Computed
const currentStencil = computed(() => RectangleStencil)

const stencilProps = computed(() => {
  const ratio = aspectRatios.find((r) => r.name === selectedRatio.value)
  return {
    aspectRatio: ratio?.value,
    resizable: true,
    movable: true,
  }
})

const processedImages = computed(() => {
  return uploadedImages.value.map((img) => ({
    ...img,
    // Use croppedData if available, otherwise fallback to preview
    displaySrc: img.croppedData || img.preview,
  }))
})

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = (event) => {
  const files = Array.from(event.target.files || [])
  handleFiles(files)
}

const handleFiles = (files) => {
  files.forEach((file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          original: e.target.result,
          croppedData: null,
          transformedSrc: e.target.result, // Track transformed version separately
        }
        uploadedImages.value.push(imageData)
      }
      reader.readAsDataURL(file)
    }
  })

  // Reset input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Drag & Drop
const onDragOver = () => {
  isDragOver.value = true
}

const onDragLeave = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    isDragOver.value = false
  }
}

const onDrop = (event) => {
  isDragOver.value = false
  const files = Array.from(event.dataTransfer?.files || [])
  handleFiles(files)
}

// Image management
const removeImage = (index) => {
  uploadedImages.value.splice(index, 1)
}

const selectImageForEdit = (img, index) => {
  selectedImage.value = img
  selectedImageIndex.value = index
  showCropper.value = true

  // Set current image source - use transformedSrc if available, otherwise original
  currentImageSrc.value = img.transformedSrc || img.original

  resetCropperSettings()
}

const editImage = (index) => {
  selectImageForEdit(uploadedImages.value[index], index)
}

const resetCropperSettings = () => {
  selectedRatio.value = 'Original'
  zoomLevel.value = 1
  rotation.value = 0
  flipH.value = false
  flipV.value = false
  hasCropChanges.value = false
  currentCropData.value = null
}

const resetImage = () => {
  if (!selectedImage.value) return

  // Reset to original image
  currentImageSrc.value = selectedImage.value.original
  selectedImage.value.transformedSrc = selectedImage.value.original

  resetCropperSettings()

  nextTick(() => {
    if (cropperRef.value && cropperRef.value.refresh) {
      cropperRef.value.refresh()
    }
  })
}

// Cropper events
const onCropChange = ({ coordinates, canvas, visibleArea }) => {
  if (canvas) {
    currentCropData.value = canvas
    hasCropChanges.value = true

    // Sync zoom level with cropper's actual zoom
    if (visibleArea && !isUpdatingZoom) {
      const cropperZoom = visibleArea.width / coordinates.width
      isUpdatingZoom = true
      zoomLevel.value = Math.round(cropperZoom * 10) / 10
      isUpdatingZoom = false
    }
  }
}

const onCropperReady = () => {
  console.log('Cropper ready')
  nextTick(() => {
    if (cropperRef.value) {
      // Get initial zoom level
      const { coordinates, visibleArea } = cropperRef.value.getResult()
      if (coordinates && visibleArea) {
        const initialZoom = visibleArea.width / coordinates.width
        isUpdatingZoom = true
        zoomLevel.value = Math.round(initialZoom * 10) / 10
        isUpdatingZoom = false
      }
      hasCropChanges.value = false
    }
  })
}

// Cropper controls
const setAspectRatio = (ratio) => {
  selectedRatio.value = ratio.name
  nextTick(() => {
    if (cropperRef.value && cropperRef.value.refresh) {
      cropperRef.value.refresh()
    }
  })
}

const applyZoom = () => {
  if (cropperRef.value && cropperRef.value.zoom && !isUpdatingZoom) {
    cropperRef.value.zoom(zoomLevel.value)
  }
}

const rotateImage = (degrees) => {
  rotation.value = (rotation.value + degrees) % 360
  applyTransformations()
}

const flipImage = (direction) => {
  if (direction === 'horizontal') {
    flipH.value = !flipH.value
  } else {
    flipV.value = !flipV.value
  }
  applyTransformations()
}

const applyTransformations = () => {
  if (!selectedImage.value) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()

  img.onload = () => {
    // Calculate canvas size based on rotation
    let canvasWidth = img.width
    let canvasHeight = img.height

    if (Math.abs(rotation.value) === 90 || Math.abs(rotation.value) === 270) {
      canvasWidth = img.height
      canvasHeight = img.width
    }

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Apply transformations
    ctx.save()
    ctx.translate(canvasWidth / 2, canvasHeight / 2)

    // Apply rotation
    if (rotation.value !== 0) {
      ctx.rotate((rotation.value * Math.PI) / 180)
    }

    // Apply flipping
    ctx.scale(flipH.value ? -1 : 1, flipV.value ? -1 : 1)

    // Draw image from center
    ctx.drawImage(img, -img.width / 2, -img.height / 2)
    ctx.restore()

    // Update the cropper source
    const transformedDataUrl = canvas.toDataURL('image/jpeg', 0.9)
    currentImageSrc.value = transformedDataUrl
    selectedImage.value.transformedSrc = transformedDataUrl

    nextTick(() => {
      if (cropperRef.value && cropperRef.value.refresh) {
        cropperRef.value.refresh()
      }
    })
  }

  // Use the latest transformed source or original
  img.src = selectedImage.value.transformedSrc || selectedImage.value.original
}

// Navigation
const backToGallery = () => {
  showCropper.value = false
  selectedImage.value = null
  selectedImageIndex.value = -1
}

const backToUpload = () => {
  selectedImage.value = null
  showCropper.value = false
}

const saveCroppedImage = () => {
  if (currentCropData.value && selectedImageIndex.value >= 0) {
    const croppedDataUrl = currentCropData.value.toDataURL('image/jpeg', 0.9)

    // Update the specific image in the array with new cropped data
    const updatedImages = [...uploadedImages.value]
    updatedImages[selectedImageIndex.value] = {
      ...updatedImages[selectedImageIndex.value],
      croppedData: croppedDataUrl,
      // Also save the transformed source for future edits
      transformedSrc: currentImageSrc.value,
    }

    // Trigger reactivity by replacing the entire array
    uploadedImages.value = updatedImages

    console.log('Saved cropped image for index:', selectedImageIndex.value)
  }
  backToGallery()
}

const proceedToPost = () => {
  // Move to preview mode without cropper
  showCropper.value = false
}

const publishPost = () => {
  const postData = {
    text: postText.value,
    images: processedImages.value.map((img) => ({
      id: img.id,
      original: img.original,
      cropped: img.croppedData || img.preview,
      file: img.file,
    })),
  }

  emit('post-created', postData)
  console.log('Publishing post:', postData)
}
</script>

<style scoped>
.facebook-cropper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  overflow: hidden;
}

/* Upload Section */
.upload-section {
  padding: 0;
}

.upload-header, .preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e4e6ea;
  background: #f8f9fa;
}

.upload-header h2, .preview-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1c1e21;
}

.close-btn {
  background: #e4e6ea;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #65676b;
}

.close-btn:hover {
  background: #d8dadf;
}

.upload-area {
  margin: 20px;
  border: 2px dashed #bcc0c4;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.upload-area:hover, .upload-area.drag-over {
  border-color: #1877f2;
  background: #f0f8ff;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-icon {
  width: 60px;
  height: 60px;
  background: #e4e6ea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #65676b;
}

.upload-content h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1c1e21;
}

.upload-content p {
  margin: 0;
  color: #65676b;
  font-size: 15px;
}

/* Images Grid */
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  padding: 20px;
}

.image-thumbnail {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.image-thumbnail:hover {
  border-color: #1877f2;
}

.image-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-thumbnail:hover .remove-image {
  opacity: 1;
}

.edit-overlay {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  padding: 6px;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-thumbnail:hover .edit-overlay {
  opacity: 1;
}

/* Upload Actions */
.upload-actions {
  padding: 20px;
  border-top: 1px solid #e4e6ea;
}

/* Cropper Modal */
.cropper-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cropper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e4e6ea;
}

.cropper-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1c1e21;
}

.back-btn, .save-btn {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
}

.back-btn {
  color: #1877f2;
}

.save-btn {
  background: #1877f2;
  color: white;
}

.save-btn:disabled {
  background: #bcc0c4;
  cursor: not-allowed;
}

.cropper-container {
  display: flex;
  flex: 1;
  background: #f0f2f5;
}

.cropper-wrapper {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.cropper {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 8px;
  overflow: hidden;
}

/* Cropper Controls */
.cropper-controls {
  width: 300px;
  background: white;
  padding: 20px;
  overflow-y: auto;
}

.cropper-controls h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1c1e21;
}

.aspect-ratio-controls {
  margin-bottom: 24px;
}

.ratio-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.ratio-btn.active .ratio-icon {
  background: #1877f2;
}

.adjustment-controls {
  margin-bottom: 24px;
}

.slider-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.slider-group input[type="range"] {
  width: 60%;
}

.transform-controls {
  margin-bottom: 24px;
}

.transform-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.transform-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border: 1px solid #e4e6ea;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 11px;
  color: #65676b;
  transition: all 0.2s;
}

.transform-btn:hover {
  background: #f0f2f5;
}

.reset-btn {
  background: #ff6b6b !important;
  color: white !important;
  grid-column: span 2;
}

.reset-btn:hover {
  background: #ff5252 !important;
}

/* Preview Section */
.post-composer {
  display: flex;
  gap: 12px;
  padding: 20px;
}

.user-avatar .avatar-circle {
  width: 40px;
  height: 40px;
  background: #e4e6ea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #65676b;
}

.post-textarea {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  min-height: 60px;
  color: #1c1e21;
}

.post-textarea::placeholder {
  color: #65676b;
}

.image-preview-container {
  padding: 0 20px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.image-preview-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.edit-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-preview-item:hover .edit-image-btn {
  opacity: 1;
}

/* Post Actions */
.post-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #e4e6ea;
  background: #f8f9fa;
}

/* Buttons */
.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #1877f2;
  color: white;
}

.btn-primary:hover {
  background: #166fe5;
}

.btn-secondary {
  background: #e4e6ea;
  color: #1c1e21;
}

.btn-secondary:hover {
  background: #d8dadf;
}

/* Responsive */
/* @media (max-width: 768px) {
  .facebook-cropper {
    max-width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  .cropper-container {
    flex-direction: column;
  }

  .cropper-controls {
    width: 100%;
    max-height: 40vh;
  }

  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .transform-buttons {
    grid-template-columns: repeat(3, 1fr);
  }

  .reset-btn {
    grid-column: span 3;
  }
} {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border: 1px solid #e4e6ea;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  color: #65676b;
} */

.ratio-btn.active {
  border-color: #1877f2;
  background: #f0f8ff;
  color: #1877f2;
}

.ratio-icon {
  width: 24px;
  height: 16px;
  background: #bcc0c4;
  border-radius: 2px;
}


.ratio-btn.active .ratio-icon {
  background: #1877f2;
}

.adjustment-controls {
  margin-bottom: 24px;
}

.slider-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.slider-group input[type="range"] {
  width: 60%;
}

.transform-controls {
  margin-bottom: 24px;
}

.transform-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.transform-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border: 1px solid #e4e6ea;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 11px;
  color: #65676b;
}

.transform-btn:hover {
  background: #f0f2f5;
}

/* Preview Section */
.post-composer {
  display: flex;
  gap: 12px;
  padding: 20px;
}

.user-avatar .avatar-circle {
  width: 40px;
  height: 40px;
  background: #e4e6ea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #65676b;
}

.post-textarea {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  min-height: 60px;
  color: #1c1e21;
}

.post-textarea::placeholder {
  color: #65676b;
}

.image-preview-container {
  padding: 0 20px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.image-preview-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.edit-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-preview-item:hover .edit-image-btn {
  opacity: 1;
}

/* Post Actions */
.post-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #e4e6ea;
  background: #f8f9fa;
}

/* Buttons */
.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #1877f2;
  color: white;
}

.btn-primary:hover {
  background: #166fe5;
}

.btn-secondary {
  background: #e4e6ea;
  color: #1c1e21;
}

.btn-secondary:hover {
  background: #d8dadf;
}

/* Responsive */
@media (max-width: 768px) {
  .facebook-cropper {
    max-width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  .cropper-container {
    flex-direction: column;
  }

  .cropper-controls {
    width: 100%;
    max-height: 40vh;
  }

  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
