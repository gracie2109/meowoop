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
      <Form :model="formRef" @finish="handleOk" ref="formInstance" :layout="''">
        <div style="display: grid; place-content: center">
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
              v-model:model-value="formRef[CUSTOMER_PARAMS.displayName]"
              :name="CUSTOMER_PARAMS.displayName"
              :label="$t('customers.P1')"
              isRequired
              :rules="rulesRef[CUSTOMER_PARAMS.displayName]"
            />
          </Col>
          <Col span="12" v-if="!props.dataItem">
            <FormItemInput
              v-model:model-value="formRef[CUSTOMER_PARAMS.password]"
              :name="CUSTOMER_PARAMS.password"
              :label="$t('customers.P6')"
              isRequired
              :rules="rulesRef[CUSTOMER_PARAMS.password]"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef[CUSTOMER_PARAMS.fullName]"
              :name="CUSTOMER_PARAMS.fullName"
              :label="$t('customers.P4')"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef[CUSTOMER_PARAMS.email]"
              :name="CUSTOMER_PARAMS.email"
              :label="$t('customers.P3')"
            />
          </Col>
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef[CUSTOMER_PARAMS.phoneNumber]"
              :name="CUSTOMER_PARAMS.phoneNumber"
              :label="$t('customers.P2')"
              isRequired
              :rules="rulesRef[CUSTOMER_PARAMS.phoneNumber]"
            />
          </Col>

          <Col span="12">
            <DatePicker
              v-model:model-value="dob"
              :name="CUSTOMER_PARAMS.dob"
              :label="$t('customers.P5')"
            />
          </Col>
          <Col span="12">
            <FormItemSelect
              v-model:modelValue="formRef.gender"
              :name="CUSTOMER_PARAMS.gender"
              :label="$t('customers.genderTitle')"
              :options="GENDER_ARRAYS(t)"
              :showSearch="true"
            />
          </Col>
        </Row>
        <Row v-if="!props.dataItem">
          <Typography.Text strong>
            {{ $t('customers.addressTitle') }}
          </Typography.Text>
          <Col span="24" class="adress_content">
            <AddressForm ref="addressRef"/>
          </Col>
        </Row>
        <Col span="24">
          <Flex gap="20" align="center" justify="end">
            <Button size="large" @click="() => $emit('onCancel')">
              {{ $t('common.cancelTitle') }}
            </Button>
            <Button size="large" type="primary" htmlType="submit">
              {{ $t('common.saveTitle') }}
            </Button>
          </Flex>
        </Col>
      </Form>
    </template>
  </ModalCs>
</template>

<script lang="ts" setup>
import { Row, Col, Form, Button, Flex, Typography } from 'ant-design-vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import { reactive, ref, toRaw, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import ImageUploadSection, { type UploadedImage } from '@/components/Image/index.vue'
import { CUSTOMER_PARAMS, type ICustomers } from '@/types/customers'
import DatePicker from '@/components/DatePicker/Index.vue'
import AddressForm from '@/components/Address/index.vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import { GENDER_ARRAYS } from './contants'
import { useCustomer } from '@/stores'
import { formatTime } from '@/utils/time'
const { t } = useI18n()
const useForm = Form.useForm

const props = defineProps<{
  showForm: boolean
  dataItem?: object | null
  dataSearch?: object
}>()

const emits = defineEmits(['onCancel'])

const DEFAULT_FORM: ICustomers = {
  [CUSTOMER_PARAMS.displayName]: '',
  [CUSTOMER_PARAMS.fullName]: '',
  [CUSTOMER_PARAMS.email]: '',
  [CUSTOMER_PARAMS.phoneNumber]: '',
  [CUSTOMER_PARAMS.avartarUrl]: [],
  [CUSTOMER_PARAMS.dob]: '',
  [CUSTOMER_PARAMS.password]: '',
  [CUSTOMER_PARAMS.gender]: GENDER_ARRAYS(t)[0].value,
}

const formRef = ref<ICustomers>({ ...DEFAULT_FORM })
const dob = ref()
const addressRef = ref()
const $store = useCustomer()

const rulesRef = reactive({
  [CUSTOMER_PARAMS.displayName]: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P1') }),
    },
  ],
  [CUSTOMER_PARAMS.password]: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P6') }),
    },
  ],

  [CUSTOMER_PARAMS.phoneNumber]: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P2') }),
    },
  ],
})

const form = useForm(formRef, rulesRef)

const setToForm = (vl: UploadedImage[]) => {
  formRef.value[CUSTOMER_PARAMS.avartarUrl] = vl
}

const getAddressData = () => {
  const data = toRaw(addressRef.value?.formRef)
  if (!data) return null
  return data
}

const handleOk = () => {
  form
    .validate()
    .then(() => {
      const address = getAddressData()
      const formData = toRaw(formRef.value)
      const payload = {
        ...formData,
        [CUSTOMER_PARAMS.dob]: toRaw(dob.value),
        address,
        gender: formData.gender || GENDER_ARRAYS(t)[0].value,
      }
      $store.createCustomer(
        payload,
        () => {
          formRef.value = DEFAULT_FORM
          dob.value = null
          emits('onCancel')
          $store.searchCustomers({})
        },
        () => {},
      )
    })
    .catch((e) => {
      console.log('Validation failed:', e)
    })
}

watch(
  () => props.dataItem,
  (newVal) => {
    formRef.value = Object.assign({}, DEFAULT_FORM, newVal || {})

    const data = newVal as ICustomers
    if (data && data[CUSTOMER_PARAMS.dob]) {
      dob.value = formatTime(data[CUSTOMER_PARAMS.dob])
    } else {
      dob.value = null
    }
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

.adress_content {
  margin-top: 1rem;
}
</style>
