<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('medical.editPetTitle') : $t('medical.addPetTitle')"
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
              v-model:model-value="formRef[PET_BOSS_PARAMS.name]"
              :name="PET_BOSS_PARAMS.name"
              :label="$t('customers.P1')"
              is-required
              :rules="rulesRef[PET_BOSS_PARAMS.name]"
            />
          </Col>
          <Col span="12">
            <FormItemSelect
              v-memo="[customers]"
              v-model:modelValue="formRef[PET_BOSS_PARAMS.owner_id]"
              :name="PET_BOSS_PARAMS.owner_id"
              :label="$t('pType.owner')"
              :options="
                customers.length > 0
                  ? customers.map((i) => ({
                      label: i?.name,
                      value: i?._id!,
                    }))
                  : []
              "
              :showSearch="true"
              is-required
              :rules="rulesRef[PET_BOSS_PARAMS.owner_id]"
              :disabled="!!props.dataItem"
            />
          </Col>

          <!-- <Col span="12">
            <DatePicker
              v-model:model-value="formRef[PET_BOSS_PARAMS.profile_data][PET_BOSS_PARAMS.dob]"
              :name="PET_BOSS_PARAMS.dob"
              :label="$t('customers.P5')"
            />
          </Col> -->
          <Col span="12">
            <FormItemSelect
              v-memo="[PET_GENDER_ARRAYS(t)]"
              v-model:modelValue="formRef[PET_BOSS_PARAMS.profile_data][PET_BOSS_PARAMS.gender]"
              :name="PET_BOSS_PARAMS.gender"
              :label="$t('customers.genderTitle')"
              :options="PET_GENDER_ARRAYS(t)"
              :showSearch="true"
            />
          </Col>

          <Col span="12">
            <FormItemSelect
              v-memo="[petTypes]"
              v-model:modelValue="formRef[PET_BOSS_PARAMS.animal_type]"
              :name="PET_BOSS_PARAMS[PET_BOSS_PARAMS.animal_type]"
              :label="$t('pType.modal_option_pet')"
              :options="
                petTypes.length > 0
                  ? petTypes.map((i) => ({
                      label: i.name,
                      value: i._id!,
                    }))
                  : []
              "
              :showSearch="true"
              is-required
              :rules="rulesRef[PET_BOSS_PARAMS.animal_type]"
              :disabled="!!props.dataItem"
            />
          </Col>

          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef[PET_BOSS_PARAMS.profile_data][PET_BOSS_PARAMS.breed]"
              :name="PET_BOSS_PARAMS[PET_BOSS_PARAMS.breed]"
              :label="$t('customers.bossBread')"
            />
          </Col>
          <Col span="24">
            <FormItemInput
              v-model:model-value="formRef[PET_BOSS_PARAMS.profile_data][PET_BOSS_PARAMS.hometown]"
              :name="PET_BOSS_PARAMS[PET_BOSS_PARAMS.hometown]"
              :label="$t('medical.hometown')"
            />
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
import { Row, Col, Form, Button, Flex } from 'ant-design-vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import { reactive, ref, toRaw, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import ImageUploadSection, { type UploadedImage } from '@/components/Image/index.vue'
import DatePicker from '@/components/DatePicker/Index.vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import { PET_GENDER_ARRAYS } from '@/views/customers/contants'
import { useCustomer, usePetTypesStore, usePetBoss } from '@/stores'

import { PET_BOSS_PARAMS, type IPetBoss } from '@/types/pet-boss'

import { storeToRefs } from 'pinia'
const { t } = useI18n()
const useForm = Form.useForm

const props = defineProps<{
  showForm: boolean
  dataItem?: object | null
  dataSearch?: object
}>()

const emits = defineEmits(['onCancel', 'onFinish'])
const $customers = useCustomer()
const $boss = usePetBoss()
const { dataList: customers } = storeToRefs($customers)
const dob = ref()

const DEFAULT_FORM: Partial<IPetBoss> = {
  [PET_BOSS_PARAMS.name]: '',
  [PET_BOSS_PARAMS.owner_id]: null,
  [PET_BOSS_PARAMS.animal_type]: null,
  [PET_BOSS_PARAMS.profile_data]: {
    [PET_BOSS_PARAMS.breed]: '',
    [PET_BOSS_PARAMS.hometown]: '',
    [PET_BOSS_PARAMS.dob]: null,
    [PET_BOSS_PARAMS.gender]: '0',
  },
}

const formRef = ref<Partial<IPetBoss>>({ ...DEFAULT_FORM })

const $storePetType = usePetTypesStore()

const { dataList: petTypes } = storeToRefs($storePetType)

const rulesRef = reactive({
  [PET_BOSS_PARAMS.name]: [
    {
      required: true,
      message: t('common.required', { name: t('customers.P1') }),
    },
  ],
  [PET_BOSS_PARAMS.owner_id]: [
    {
      required: true,
      message: t('common.required', { name: t('medical.owner') }),
    },
  ],
  [PET_BOSS_PARAMS.animal_type]: [
    {
      required: true,
      message: t('common.required', { name: t('pType.modal_option_pet') }),
    },
  ],
})

const form = useForm(formRef, rulesRef)

const setToForm = (vl: UploadedImage[]) => {
  formRef.value[PET_BOSS_PARAMS.avatar] = vl
}

const handleOk = () => {
  form
    .validate()
    .then(() => {
      const formData = toRaw(formRef.value)
      console.log('formData', formData)
      $boss.createBoss(formData).then(() => {
        emits('onFinish')
      })
    })
    .catch((e) => {
      console.log('Validation failed:', e)
    })
}

watch(
  () => props.dataItem,
  (newVal) => {
    formRef.value = Object.assign({}, DEFAULT_FORM, newVal || {})

    // const data = newVal as IPetBoss
    // if (data && data?.profile_data?.dob) {
    //   dob.value = data?.profile_data?.dob ? formatTime(data.profile_data.dob) : null
    // } else {
    //   dob.value = null
    // }
  },
  { immediate: true },
)
defineOptions({ name: 'bossForm' })
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
