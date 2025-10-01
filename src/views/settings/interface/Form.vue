<template>
  <div style="background-color: white; margin-top: 1rem">
    <div class="container">
      <Form :model="formRef" ref="formRefContainer" style="padding: 1.5rem" @finish="onFinish">
        <div>
          <p>LOGO</p>
          <div style="display: grid; place-content: center">
            <Flex gap="16">
              <div>
                <p style="text-align: center">Logo</p>
                <ImageUploadSection
                  :max="1"
                  :showButton="false"
                  @upload-to-server="setToForm"
                  @images-changed="setToForm"
                  style="height: 20px"
                  :disabled="!props.isEditMode"
                />
              </div>
              <div>
                <p style="text-align: center">Favicon</p>
                <ImageUploadSection
                  :max="1"
                  :showButton="false"
                  @upload-to-server="setToForm"
                  @images-changed="setToForm"
                  :disabled="!props.isEditMode"
                />
              </div>
            </Flex>
          </div>
        </div>

        <Row :gutter="8">
          <Col span="24">
            <p class="block_section">Infomation</p>
            <Row :gutter="8">
              <Col span="12">
                <FormItemInput
                  v-model:model-value="formRef.name"
                  :name="'name'"
                  :label="$t('customers.P1')"
                  :disabled="!props.isEditMode"
                />
              </Col>
              <Col span="12">
                <FormItemInput
                  v-model:model-value="formRef.description"
                  :name="'description'"
                  :label="$t('common.description')"
                  :disabled="!props.isEditMode"
                />
              </Col>
            </Row>
          </Col>

          <Col span="24">
            <p style="margin: 1rem 0">Address</p>
            <AddressForm :show-label="false" ref="addressRef" :disabled="!props.isEditMode" />
          </Col>

          <Col span="24">
            <p>Socials</p>
            <div style="height: auto; overflow-y: auto; max-height: 250px">
              <Space
                v-for="(user, index) in formRef.socials"
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
                <FormItem :name="[SETTING_INTERFACE.socials, index, SOCIAL_PARAMS.icon]">
                  <div style="border: 1px solid #dcdcdc; padding: 0.25rem">
                    <IconPicker
                      :is-all="false"
                      v-model:modelValue="user.icon"
                      :category="'socials'"
                    />
                  </div>
                </FormItem>
                <FormItem :name="[SETTING_INTERFACE.socials, index, SOCIAL_PARAMS.name]">
                  <Input
                    size="large"
                    v-model:value="user.name"
                    placeholder="Name"
                    :rules="{
                      required: true,
                      message: 'Missing name',
                    }"
                    :disabled="!props.isEditMode"
                  />
                </FormItem>
                <FormItem :name="[SETTING_INTERFACE.socials, index, SOCIAL_PARAMS.link]">
                  <Input
                    size="large"
                    v-model:value="user.link"
                    placeholder="Link"
                    :disabled="!props.isEditMode"
                    :rules="{
                      required: true,
                      message: 'Missing link',
                    }"
                  />
                </FormItem>
                <MinusCircleOutlined @click="removeSocial(user)" />
              </Space>
            </div>
            <FormItem>
              <Button
                type="dashed"
                block
                @click="addSocial"
                size="large"
                :disabled="!props.isEditMode"
              >
                <PlusOutlined />
                Add social
              </Button>
            </FormItem>
          </Col>

          <Col span="24">
            <Button type="primary" html-type="submit" :disabled="!props.isEditMode"> Save </Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, useTemplateRef } from 'vue'
import { Col, Flex, Form, Row, Space, FormItem, Input, Button } from 'ant-design-vue'
import ImageUploadSection, { type UploadedImage } from '@/components/Image/index.vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import {
  SETTING_INTERFACE,
  SOCIAL_PARAMS,
  type ISettingInterface,
  type Socical,
} from '@/types/settings'
import AddressForm from '@/components/Address/index.vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import IconPicker from '@/components/Icons/IconPicker.vue'
import { DEFAULT_COLOR } from '@/contants/lib'
import { ICON_PREFIX, iconSocials } from '@/components/Icons/utils'
import type { FormInstance } from 'ant-design-vue'

const props = defineProps<{
  isEditMode: boolean
}>()
const formRefContainer = ref<FormInstance>()
const addressRef = useTemplateRef('addressRef')
const formRef = reactive<Partial<ISettingInterface>>({
  name: '',
  description: '',
  favicon: null,
  logo: null,
  socials: [],
})
const createDefaultSocial = (index: number) => ({
  link: '',
  name: '',
  id: String(index),
  icon: {
    color: DEFAULT_COLOR,
    icon: `${ICON_PREFIX.socials}/${iconSocials[0]}`,
  },
})

const setToForm = (vl: UploadedImage[]) => {}

const removeSocial = (vl: Socical) => {
  if (!formRef.socials || !props.isEditMode) return
  const index = formRef.socials.indexOf(vl)
  if (index !== -1) {
    formRef.socials.splice(index, 1)
  }
}

const addSocial = () => {
  if (!formRef.socials) {
    formRef.socials = []
  }
  if (formRef.socials.length <= 5) {
    formRef.socials.push(createDefaultSocial(formRef.socials.length))
  }
}

const onFinish = () => {
  const address = toRaw(addressRef.value?.formRef)
  const payload = {
    ...formRef,
    address,
    socials: toRaw(formRef.socials),
  }
  console.log('payload', payload)
}
defineOptions({ name: 'interface-form' })
</script>

<style scoped>
.block_section {
  margin-bottom: 1rem;
}
</style>
