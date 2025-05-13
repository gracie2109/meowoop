<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('pType.C_edit') : $t('pType.C_add')"
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
            <FormItemSelect
              v-model:model-value="formRef.category_id"
              :name="IPetServiceParams.category_id"
              :label="$t('pType.S5')"
              :options="
                petTypes?.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))
              "
              is-required
              :rules="rulesRef.category_id"
            />
          </Col>
          <Col span="12">
            <FormItemSelect
              v-model:model-value="formRef.pet_type_ids"
              :name="IPetServiceParams.pet_type_ids"
              :label="$t('pType.S6')"
              :options="
                categories?.map((i) => ({
                  label: i.name?.[locale as 'vi' | 'en'],
                  value: i.id,
                }))
              "
              :mode="'multiple'"
              is-required
              :rules="rulesRef.pet_type_ids"
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
          <Col span="24">
            <FormItemInputNumber
              v-model:model-value="formRef.price"
              :name="IPetServiceParams.price"
              :label="$t('pType.S7')"
              style="width: 100%"
            />
          </Col>
          <Col span="24">
            <div class="form_wrap_content-slider" style="padding: 1rem">
              <Slider
                v-model:value="formRef.duration"
                :tooltip-open="false"
                :min="10"
                :max="180"
                :marks="marks"
              >
              </Slider>
              <label class="form_label" style="left: 22px"> {{ $t('pType.S4') }} </label>
            </div>
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
import { Row, Col, Form, Button, Flex, Slider } from 'ant-design-vue'
import FormItemInputNumber from '@/components/FormItem/InputNumber.vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import {
  FieldMultiLangParam,
  IPetServiceParams,
  PetCategoryParams,
  type IPetServiceForm,
} from '@/types/pet-type'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import { usePetCategoryStore, usePetTypesStore, usePetServices } from '@/stores'
import { storeToRefs } from 'pinia'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'

const { t, locale } = useI18n()
const useForm = Form.useForm

const props = defineProps<{
  showForm: boolean
  dataItem?: object | null
}>()
const emit = defineEmits(['onCancel'])

const $category = usePetCategoryStore()
const $petType = usePetTypesStore()
const $store = usePetServices()

const { dataList: categories } = storeToRefs($category)
const { dataList: petTypes } = storeToRefs($petType)
const marks = ref({
  10: '10m',
  20: '20m',
  30: '30m',
  60: '1h',
  90: '1h30m',
  120: '2h',
  150: '2h30m',
  180: '3h',
})
const DEFAULT_FORM: IPetServiceForm = {
  name: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  duration: 0,
  price: 0,
  pet_type_ids: [],
  category_id: '',
}

const formRef = ref<IPetServiceForm>({ ...DEFAULT_FORM })

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
  category_id: [
    {
      required: true,
      message: t('common.required', { name: t('pType.S5') }),
    },
  ],
  pet_type_ids: [
    {
      required: true,
      message: t('common.required', { name: t('pType.S6') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)

const handleOk = () => {
  form
    .validate()
    .then(() => {
      console.log('formRef.value', formRef.value)
      $store.onCreateData(formRef.value)
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

<style scoped>
.form_wrap_content-slider {
  height: 60px;
  border: 1px solid #d9d9d9;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
