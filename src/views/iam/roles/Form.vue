<template>
  <ModalCs
    :open="showForm"
    :title="dataItem ? $t('pType.C_edit') : $t('pType.C_add')"
    @handle-cancel="() => $emit('onCancel')"
    :width="'900px'"
    @handle-ok="handleOk"
  >
    <template #content>
      <Form :model="formRef" @finish="handleOk">
        <Row :gutter="[20, 12]">
          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.name"
              :name="PetCategoryParams.name"
              :label="$t('pType.C-01-1')"
              isRequired
              :rules="rulesRef.name"
            />
          </Col>

          <Col span="12">
            <FormItemInput
              v-model:model-value="formRef.description"
              :name="PetCategoryParams.desc"
              :label="$t('pType.C-02-2')"
            />
          </Col>
          <Col
            span="24"
            style="width: 100%; height: auto; max-height: 500px; overflow-y: auto"
            v-if="resources && resources.length > 0"
          >
            <Row :gutter="16">
              <Col v-for="item in resources" :key="item?.key" :span="6">
                <Tree
                  checkable
                  :tree-data="[item]"
                  :expandedKeys="expandedKeys[item.key] || []"
                  :selectedKeys="selectedKeys[item.key] || []"
                  :checkedKeys="checkedKeys[item.key] || []"
                  @update:expandedKeys="(val) => (expandedKeys[item.key] = val)"
                  @update:selectedKeys="(val) => (selectedKeys[item.key] = val)"
                  @update:checkedKeys="(val) => (checkedKeys[item.key] = val)"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </template>
  </ModalCs>
</template>

<script lang="ts" setup>
import { Row, Col, Form, Tree } from 'ant-design-vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import { PetCategoryParams } from '@/types/pet-type'
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalCs from '@/components/Modal/Index.vue'
import { useRoles } from '@/stores'
import { convertResourceMap, getListResource } from '@/services/modules/iam/resource.service'
import type { TreeProps } from 'ant-design-vue/es/vc-tree'
import type { Key } from 'ant-design-vue/es/_util/type'
import { toRaw } from 'vue'

const { t } = useI18n()
const useForm = Form.useForm

const props = defineProps<{
  showForm: boolean
  dataItem?: object | null
  dataSearch?: object
}>()

const emit = defineEmits(['onCancel'])
const $store = useRoles()
const loadingResource = ref(false)
const resources = ref<TreeProps['treeData']>([])
const DEFAULT_FORM = {
  name: '',
  description: '',
}

const formRef = ref({ ...DEFAULT_FORM })
const expandedKeys = ref<Record<string, Key[]>>({})
const selectedKeys = ref<Record<string, Key[]>>({})
const checkedKeys = ref<Record<string, Key[]>>({})

const rulesRef = reactive({
  name: [
    {
      required: true,
      message: t('common.required', { name: t('pType.C-01-1') }),
    },
  ],
  description: [
    {
      required: true,
      message: t('common.required', { name: t('pType.C-01-2') }),
    },
  ],
})
const form = useForm(formRef, rulesRef)

const handleOk = () => {
  form
    .validate()
    .then(() => {
      if (!props.dataItem) {
        const resourceKeys = resources.value?.map((i) => i.key)
        console.log('resourceKeys', resourceKeys)
        const payload = {
          ...formRef.value,
          resource_actions: Object.values(checkedKeys.value).flat(),
        }
        $store.createRole(payload, () => {
          expandedKeys.value = {}
          selectedKeys.value = {}
          checkedKeys.value = {}
          form.resetFields()
          emit('onCancel')
          $store.searchList({ ...(props.dataSearch || {}) })
        })
      } else {
        // $store.onUpdateData({ ...formRef.value, id: props.dataItem?.id }, () => {
        //   $store.searchList({ ...(props.dataSearch || {}) })
        //   emit('onCancel')
        // })
      }
    })
    .catch((e) => {
      console.log('eeee', e)
    })
}

onMounted(() => {
  const getResources = async () => {
    try {
      loadingResource.value = true
      const data = (await getListResource({}, true)) as TreeProps['treeData']
      resources.value = data || []
    } catch (error: unknown) {
      console.log('err', error)
    } finally {
      loadingResource.value = false
    }
  }
  getResources()
})

watch(
  () => [props.dataItem, resources.value],
  (newVal) => {
    if (newVal) {
      formRef.value = Object.assign({}, DEFAULT_FORM, newVal[0] || {})
      const data = convertResourceMap(toRaw(newVal[0]?.resource_actions), toRaw(newVal[1] || []))
      checkedKeys.value = data
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
</style>
