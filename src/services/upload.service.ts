import type { UploadedImage } from '@/components/Image/index.vue'
import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { axiosPost } from '@/utils/axios'

// Upload response interface
export interface UploadResponse {
  success: boolean
  message: string
  data?: {
    files: Array<{
      filename: string
      originalname: string
      path: string
      size: number
      mimetype: string
    }>
  }
}

export interface UploadOptions {
  onStart?: () => void
  onProgress?: (progress: number) => void
  onSuccess?: (response: UploadResponse) => void
  onError?: (error: Error) => void
  onFinally?: () => void
}

/**
 * Upload images to server
 * @param images Array of images to upload
 * @param options Upload options with callbacks
 * @returns Promise<UploadResponse>
 */
export const uploadToServer = async (
  images: UploadedImage[],
  options?: UploadOptions,
): Promise<UploadResponse> => {
  const formData = new FormData()
  images.forEach((image) => {
    if (image.file) {
      formData.append('files', image.file)
    }
  })

  try {
    // Trigger onStart callback
    options?.onStart?.()
    const result = await axiosPost<UploadResponse, FormData>(
      `/${API_ROUTER_PREFIX.ASSET}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    console.log('Upload successful:', result)

    if (result.success) {
      const response: UploadResponse = {
        success: true,
        message: result.message || `Successfully uploaded ${images.length} images to server!`,
        data: result.data,
      }

      // Trigger onSuccess callback
      options?.onSuccess?.(response)

      return response
    } else {
      throw new Error(result.message || 'Upload failed')
    }
  } catch (error: unknown) {
    console.error('Upload failed:', error)
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to upload images to server. Please try again.'

    const uploadError = new Error(errorMessage)

    // Trigger onError callback
    options?.onError?.(uploadError)

    throw uploadError
  } finally {
    // Trigger onFinally callback
    options?.onFinally?.()
  }
}
