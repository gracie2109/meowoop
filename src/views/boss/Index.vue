<template>
  <UploadDragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    :customRequest="customUpload"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </UploadDragger>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message, UploadDragger } from 'ant-design-vue'
import type { UploadChangeParam, UploadRequestOption } from 'ant-design-vue'
import axios from 'axios'
import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { API_BASE_URL } from '@/config'

// Props để cấu hình component
interface Props {
  folderName?: string
  apiEndpoint?: string
}

const props = withDefaults(defineProps<Props>(), {
  folderName: 'test',
  apiEndpoint: `${API_BASE_URL}/${API_ROUTER_PREFIX.ASSET}/upload`,
  // Thay đổi theo route API của bạn
})

const fileList = ref([])

// Emit events để parent component có thể lắng nghe
const emit = defineEmits<{
  uploadSuccess: [data: any, file: any]
  uploadError: [error: Error, file: any]
}>()

// Custom upload function
const customUpload = async (options: UploadRequestOption) => {
  const { onSuccess, onError, file, onProgress } = options

  // Validate file type (chỉ cho phép image và video)
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    // Videos
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/webm',
  ]

  if (!allowedTypes.includes(file.type!)) {
    message.error('Only image and video files are allowed')
    onError?.(new Error('Invalid file type'))
    return
  }

  // Validate file size (max 50MB)
  const maxSize = 50 * 1024 * 1024 // 50MB
  if (file.size && file.size > maxSize) {
    message.error('File size must be less than 50MB')
    onError?.(new Error('File too large'))
    return
  }

  // Tạo FormData
  const formData = new FormData()
  formData.append('files', [field])
  formData.append('folderName', props.folderName)

  try {
    const response = await axios.post(props.apiEndpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Thêm authorization header nếu cần
        // 'Authorization': `Bearer ${your-token}`
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress?.({ percent })
        }
      },
    })

    // Response từ backend sẽ có format:
    // {
    //   public_id: string,
    //   url: string,
    //   resource_type: string,
    //   folder: string,
    //   original_name: string
    // }
    onSuccess?.(response.data, file)
    emit('uploadSuccess', response.data, file)
  } catch (error) {
    console.error('Upload failed:', error)
    onError?.(error as Error)
    emit('uploadError', error as Error, file)
  }
}

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status
  if (status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (status === 'done') {
    message.success(`${info.file.name} uploaded successfully.`)
    console.log('Upload response:', info.file.response)
    // Response sẽ chứa: public_id, url, resource_type, folder, original_name
  } else if (status === 'error') {
    message.error(`${info.file.name} upload failed.`)
  }
}

function handleDrop(e: DragEvent) {
  console.log(e)
}

defineOptions({ name: 'upload-asset' })
</script>
