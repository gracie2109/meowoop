<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('pType.T-02') : $t('pType.T-01')"
    @handleCancel="$emit('onCancel')"
    :width="'900px'"
    @handle-ok="handleOk"
    hide-footer
  >
    <template #content>
      <Form :model="formRef" @finish="handleOk">
        <Row :gutter="[20, 12]">
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.name"
              :name="DashboardParams.name"
              :label="$t('common.name')"
              isRequired
              :rules="rulesRef.name"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.description"
              :name="DashboardParams.desc"
              :label="$t('common.description')"
            />
          </Col>
      
          <Flex gap="20" align="center" justify="end">
            <Button size="large">
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
import { DashboardParams, type TDashboard, type TDashboardForm } from '@/types/dashboard'
import { reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import { useDashboardStore } from '@/stores'

const { t } = useI18n()
const useForm = Form.useForm
const props = defineProps<{
  showForm: boolean
  dataItem?: TDashboard | null
  dataSearch?: object
}>()
const emit = defineEmits(['onCancel'])
defineOptions({ name: 'addAndEditPetType' })

const DEFAULT_FORM: TDashboardForm = {
  name: '',
  description: '',
  status: false
}

const formRef = ref<TDashboardForm>({ ...DEFAULT_FORM })

const rulesRef = reactive({
  name: [
    {
      required: true,
      message: t('common.required', { name: t('common.name') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)
const $store = useDashboardStore()

const resetForm = () => {
  formRef.value = { ...DEFAULT_FORM }
}

const handleOk = () => {
  form
    .validate()
    .then(() => {
      if (!props.dataItem) {
        $store.createDashboard(formRef.value, () => {
          $store.searchList({ ...(props.dataSearch || {}) })
          resetForm()
        })
      } else {
        // $store.updateType({ ...formRef.value, id: props.dataItem?.id }, () => {
        //   $store.searchList({ ...(props.dataSearch || {}) })
        //   resetForm()
        // })
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
