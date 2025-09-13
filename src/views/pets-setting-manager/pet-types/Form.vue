<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('pType.T-02') : $t('pType.T-01')"
    :width="'900px'"
    @handle-ok="handleOk"
    hide-footer
    @handle-cancel="() => $emit('onCancel')"
  >
    <template #content>
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
import { type TPetType, type TPetTypeForm, PetTypeParams } from '@/types/pet-type'
import { reactive, ref, watch } from 'vue'
import IconPicker from '@/components/Icons/IconPicker.vue'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import FormSwitch from '@/components/FormItem/FormSwitch.vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import { usePetTypesStore } from '@/stores'

const { t } = useI18n()
const useForm = Form.useForm
const props = defineProps<{
  showForm: boolean
  dataItem?: TPetType | null
  dataSearch?: object
}>()
const emit = defineEmits(['onCancel'])
defineOptions({ name: 'addAndEditPetType' })

const DEFAULT_FORM: TPetTypeForm = {
  name: '',
  description: '',
  icon: {
    color: DEFAULT_COLOR,
    icon: DEFAULT_ICON,
  },
  status: false,
}

const formRef = ref<TPetTypeForm>({ ...DEFAULT_FORM })

const rulesRef = reactive({
  name: [
    {
      required: true,
      message: t('common.required', { name: t('common.name') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)
const $store = usePetTypesStore()

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
