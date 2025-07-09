<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('pType.C_edit') : $t('pType.C_add')"
    :width="'900px'"
    @handle-ok="handleOk"
    hide-footer
    @handleCancel="$emit('onCancel')"
  >
    <template #content>
      <Form :model="formRef" @finish="handleOk">
        <Row :gutter="[20, 12]">
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.name.vi"
              :name="[PetCategoryParams.name, FieldMultiLangParam.vi]"
              :label="$t('pType.C-01-1')"
              isRequired
              :rules="rulesRef.name_vi"
            />
          </Col>

          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.name.en"
              :name="[PetCategoryParams.name, FieldMultiLangParam.en]"
              :label="$t('pType.C-01-2')"
              isRequired
              :rules="rulesRef.name_en"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.description.vi"
              :name="[PetCategoryParams.desc, FieldMultiLangParam.vi]"
              :label="$t('pType.C-02-1')"
            />
          </Col>

          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.description.en"
              :name="[PetCategoryParams.desc, FieldMultiLangParam.en]"
              :label="$t('pType.C-02-2')"
            />
          </Col>
          <Flex gap="20" align="center" justify="end">
            <Button size="large" @click="() => $emit('onCancel')">
              {{ $t('common.cancelTitle') }}
            </Button>
            <Button size="large" type="primary" htmlType="submit">
              {{ $t('common.saveTitle') }}
            </Button>
          </Flex>
        </Row>
      </Form>
    </template>
  </ModalCs>
</template>

<script lang="ts" setup>
import { Row, Col, Form, Button, Flex } from 'ant-design-vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import {
  FieldMultiLangParam,
  PetCategoryParams,
  type TPetCategory,
  type TPetCategoryForm,
} from '@/types/pet-type'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import { usePetCategoryStore } from '@/stores'

const { t } = useI18n()
const useForm = Form.useForm
const props = defineProps<{
  showForm: boolean
  dataItem?: TPetCategory | null
  dataSearch?: object
}>()
const emit = defineEmits(['onCancel'])

const DEFAULT_FORM: TPetCategoryForm = {
  name: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
}

const formRef = ref<TPetCategoryForm>({ ...DEFAULT_FORM })

const rulesRef = reactive({
  name_vi: [
    {
      required: true,
      message: t('common.required', { name: t('pType.C-01-1') }),
    },
  ],
  name_en: [
    {
      required: true,
      message: t('common.required', { name: t('pType.C-01-2') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)
const $store = usePetCategoryStore()

const resetForm = () => {
  formRef.value = { ...DEFAULT_FORM }
}

const handleOk = () => {
  form
    .validate()
    .then(() => {
      if (!props.dataItem) {
        $store.createPetType(formRef.value, () => {
          $store.searchList({ ...(props.dataSearch || {}) })
          resetForm()
        })
      } else {
        $store.updateType({ ...formRef.value, id: props.dataItem?.id }, () => {
          $store.searchList({ ...(props.dataSearch || {}) })
          resetForm()
        })
      }
      emit('onCancel')
    })
    .catch((e) => {
      console.log('eeee', e)
    })
}

watch(
  () => props.dataItem,
  (newVal) => {
    formRef.value = Object.assign({}, DEFAULT_FORM, newVal || {})
  },
  { immediate: true },
)
defineOptions({ name: 'addAndEditPetCategory' })
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
