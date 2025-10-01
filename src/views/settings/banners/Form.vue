<template>
  <div class="container" style="background-color: #ffff;height: 100%;">
    <Form :model="formRef" @finish="() => {}" ref="formInstance" :layout="''">
    <div style="display: grid; place-content: center; padding-top: 1rem;">
      <ImageUploadSection
        :max="1"
        :showButton="false"
        @upload-to-server="setToForm"
        @images-changed="setToForm"
      />
    </div>

    <Row :gutter="[20, 12]">
      <Col span="12">
        <FormItemInput
          v-model:model-value="formRef[BANNER_PARAMS.alt]"
          :name="BANNER_PARAMS.alt"
          :label="$t('customers.P1')"
        />
      </Col>
      <Col span="12">
        <FormItemSelect
          v-model:modelValue="formRef.position"
          :name="BANNER_PARAMS.position"
          label="Vị trí"
          :options="BANNER_POSITION_ARR()"
        />
      </Col>
    </Row>
    <Col span="24">
      <p>Socials</p>
      <div style="height: auto; overflow-y: auto; max-height: 150px">
        <Space
          v-for="(user, index) in formRef[BANNER_PARAMS.contents]"
          :key="user.id"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
        >
          <FormItem>
            <div
              style="
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: var(--vt-c-primary);
                display: grid;
                place-content: center;
                color: white;
              "
            >
              {{ index + 1 }}
            </div>
          </FormItem>
          <FormItem :name="[BANNER_PARAMS.contents, index, BANNER_CONTENT_PARAMS.type]">
            <!-- <Input
              size="large"
              v-model:value="user.type"
              placeholder="Link"
              :rules="{
                required: true,
                message: 'Missing link',
              }"
            /> -->


          </FormItem>

          <MinusCircleOutlined @click="() => {}" />
        </Space>
      </div>
      <FormItem>
        <Button type="dashed" block @click="addContents" size="large">
          <PlusOutlined />
          Add social
        </Button>
      </FormItem>
    </Col>
    <!-- <Col span="24" v-if="formRef.image">
      <div
        ref="bannersRef"
        style="
          height: 300px;
          width: 100%;
          border: 1px solid blue;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <BannerViewer
          :image-url="currentImageUrl"
          :position="(formRef.position as 'left' | 'center' | 'right') || 'left'"
          :texts="[]"
          :width="bannerWidth"
          :height="bannerHeight"
          :use-dynamic-content="true"
          :dynamic-content="dynamicBannerContent"
          :container-style="{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }"
          @image-uploaded="handleImageUploaded"
        />
      </div>
    </Col> -->
  </Form>
  </div>
</template>

<script setup lang="ts">
import { Col, Form, Row, Space, FormItem, Input, Button , Select} from 'ant-design-vue'
import { nextTick, onMounted, onUnmounted, ref, computed, reactive } from 'vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import {
  BANNER_PARAMS,
  type IBannerParam,
  type IBannerContent,
  BANNER_CONTENT_PARAMS,
} from '@/types/banners'
import { BANNER_POSITION, BANNER_POSITION_ARR } from '@/contants/settings'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import BannerViewer from '@/components/BannerCanvas/BannerViewer.vue'
import ImageUploadSection from '@/components/Image/index.vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { BannerContent } from '@/types/banner-content'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  showForm: boolean
  dataItem?: object | null
  dataSearch?: object
}>()

const DEFAULT_FORM = {
  [BANNER_PARAMS.position]: BANNER_POSITION.LEFT,
  [BANNER_PARAMS.alt]: '',
  [BANNER_PARAMS.image]: [],
  [BANNER_PARAMS.contents]: [],
}
let formRef = reactive<IBannerParam>({ ...DEFAULT_FORM })
const bannersRef = ref<HTMLDivElement | null>(null)
const bannerWidth = ref(100)
const bannerHeight = ref(100)

const handleImageUploaded = (image: object) => {
  formRef[BANNER_PARAMS.image] = image
}
const setToForm = (val: unknown) => {
  formRef[BANNER_PARAMS.image] = val
}

const dynamicBannerContent = ref<BannerContent[]>([])

const isImageArray = (val: unknown): val is Array<{ src: string }> => {
  return Array.isArray(val) && val.length > 0 && typeof val[0]?.src === 'string'
}

const currentImageUrl = computed(() => {
  const images = formRef[BANNER_PARAMS.image]

  if (isImageArray(images)) {
    return images[0].src
  }
  return ''
})

const updateBannerSize = async () => {
  await nextTick()
  if (bannersRef.value) {
    const rect = bannersRef.value.getBoundingClientRect()
    bannerWidth.value = (rect.width || bannersRef.value.offsetWidth) - 2
    bannerHeight.value = (rect.height || bannersRef.value.offsetHeight) - 2
  }
}


const addContents = (newContent: IBannerContent) => {
  if (!Array.isArray(formRef[BANNER_PARAMS.contents])) {
    formRef[BANNER_PARAMS.contents] = []
  }
  ;(formRef[BANNER_PARAMS.contents] as IBannerContent[]).push(newContent)
}
onMounted(async () => {
  await updateBannerSize()
  // Thêm resize listener
  window.addEventListener('resize', updateBannerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBannerSize)
  formRef = { ...DEFAULT_FORM }
})
defineOptions({ name: 'banner_form' })
</script>

<style scoped>
.text-item {
  margin-bottom: 10px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
}

.text-meta {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}
</style>
