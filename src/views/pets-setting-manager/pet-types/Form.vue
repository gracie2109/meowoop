<template>
  <Form :model="formRef" @finish="handleOk">
    <Row :gutter="[20, 12]">
      <Col span="12">
        <FormItemInput
          v-model:model-value="formRef.name"
          :name="PetTypeParams.name"
          :label="$t('common.name')"
          isRequired
          :rules="rulesRef.name"
        />
      </Col>
      <Col span="12">
        <FormItemInput
          v-model:model-value="formRef.description"
          :name="PetTypeParams.desc"
          :label="$t('common.description')"
        />
      </Col>
      <Col span="12">
        <div class="iconFormWrap">
          <div style="position: relative; height: 100%; padding-top: 3px; padding-left: 15px">
            <IconPicker v-model:modelValue="formRef.icon" />
          </div>
          <label class="form_label">Icon </label>
        </div>
      </Col>
      <Col span="12">
        <FormSwitch
          :label="$t('common.display')"
          :name="PetTypeParams.desc"
          v-model:checked="formRef.status"
        />
      </Col>
    </Row>

    <Button
      html-type="submit"
      size="large"
      type="primary"
      :loading="false"
      style="margin-top: 1rem"
    >
      {{ $t('common.saveTitle') }}
    </Button>
  </Form>
</template>

<script lang="ts" setup>
import { Row, Col, Button, Form } from 'ant-design-vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import { type TPetTypeForm, PetTypeParams } from '@/types/pet-type'
import { reactive, ref } from 'vue'
import IconPicker from '@/components/Icons/IconPicker.vue'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import FormSwitch from '@/components/FormItem/FormSwitch.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const useForm = Form.useForm

const formRef = ref<TPetTypeForm>({
  name: '',
  description: '',
  icon: {
    color: DEFAULT_COLOR,
    icon: DEFAULT_ICON,
  },
  status: false,
})

const rulesRef = reactive({
  [PetTypeParams.name]: [
    {
      required: true,
      message: t('common.required', { name: t('common.name') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)

const handleOk = () => {
  form
    .validate()
    .then(() => {
      console.log('formState', formRef.value)
    })
    .catch((e) => {
      console.log('eeee', e)
    })
}
defineOptions({ name: 'addAndEditPetType' })
</script>

<style>
.iconFormWrap {
  width: 100%;
  border: 1px solid #d9d9d9;
  height: var(--input-height);
  position: relative;
  border-radius: 5px;
}
</style>
