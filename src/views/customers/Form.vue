<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('customers.L4') : $t('customers.L3')"
    @handle-cancel="() => $emit('onCancel')"
    :width="'900px'"
    @handle-ok="handleOk"
    hide-footer
  >
    <template #content>
      <Form :model="formRef" @finish="handleOk">
        <Row :gutter="[20, 12]">
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.displayName"
              :name="[PetCategoryParams.name, FieldMultiLangParam.vi]"
              :label="$t('customers.P1')"
              isRequired
              :rules="rulesRef.displayName"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.fullName"
              :name="[PetCategoryParams.name, FieldMultiLangParam.vi]"
              :label="$t('customers.P4')"
              isRequired
              :rules="rulesRef.fullName"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.email"
              :name="[PetCategoryParams.name, FieldMultiLangParam.vi]"
              :label="$t('customers.P3')"
              isRequired
              :rules="rulesRef.email"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.phoneNumber"
              :name="[PetCategoryParams.name, FieldMultiLangParam.vi]"
              :label="$t('customers.P2')"
              isRequired
              :rules="rulesRef.phoneNumber"
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
import { FieldMultiLangParam, PetCategoryParams } from '@/types/pet-type'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'

const { t } = useI18n()
const useForm = Form.useForm

const props = defineProps<{
  showForm: boolean
  dataItem?: object | null
  dataSearch?: object
}>()
// const emit = defineEmits(['onCancel'])

interface ICustomers {
  displayName: string
  fullName: string
  email: string
  phoneNumber: string
  avartarUrl?: unknown
  addressInfo?: unknown[]

}

const DEFAULT_FORM: ICustomers = {
  displayName: '',
  fullName: '',
  email: '',
  phoneNumber: '',
}

const formRef = ref<ICustomers>({ ...DEFAULT_FORM })

const rulesRef = reactive({
  displayName: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P1') }),
    },
  ],
  fullName: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P4') }),
    },
  ],
  email: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P3') }),
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P2') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)

const handleOk = () => {
  form
    .validate()
    .then(() => {})
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

<style scoped>
.form_wrap_content-slider {
  height: 60px;
  border: 1px solid #d9d9d9;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
