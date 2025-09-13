<template>
  <Flex
    v-if="data"
    style="border-bottom: 1px solid var(--border-line); padding: 0.5rem 1rem; width: 100%"
    justify="space-between"
    wrap="wrap"
  >
    <div>
      <div class="contact-card">
        <p style="margin: 0.5rem 0">{{ data?.label }}</p>
        <span class="contact-name">{{ data?.customer_info?.name }}</span>
        <span class="contact-phone">{{ data?.customer_info?.phone_number }}</span>

        <div style="margin: 0.5rem 0">
          <div class="contact-address">{{ data?.detail }}</div>
          <div class="contact-address">
            {{ mergeString([data?.city_name, data?.district_name, data?.ward_name]) }}
          </div>
        </div>
        <div style="margin: 0.5rem 0" v-if="data?.is_primary">
          <span
            style="
              color: var(--vt-c-primary);
              border: 1px solid var(--vt-c-primary);
              padding: 2px 5px;
              display: inline-block;
            "
            >{{ $t('common.default') }}</span
          >
        </div>
      </div>
    </div>
    <Flex vertical :gap="16">
      <Flex gap="8" justify="flex-end" style="color: var(--vt-c-link); cursor: pointer">
        <div @click="onUpdate">{{ $t('common.update') }}</div>
        <div v-if="!data?.is_primary" @click="onDelete">{{ $t('common.delete') }}</div>
      </Flex>
      <Button
        style="background-color: transparent"
        :disabled="data?.is_primary"
        @click="onSetPrimary"
      >
        {{ $t('customers.setIsPrimaryAddress') }}
      </Button>
    </Flex>
  </Flex>

  <Modal
    :open="!!openDelete"
    :title="$t('customers.deleteAddressTitle')"
    @handle-cancel="openDelete = false"
    @handle-ok="handleDelete"
    :loading="loading"
  >
    <template #content>
      {{
        $t('pType.T-04', {
          name: data?.detail || '',
        })
      }}
    </template>
  </Modal>

  <Modal
    :open="!!openUpdate"
    :title="$t('customers.updateAddress')"
    @handle-cancel="openUpdate = false"
    @handle-ok="handleUpdate"
    :loading="loading"
  >
    <template #content>
      <AddressForm ref="addressRef" :data="props.data" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useCustomer } from '@/stores'
import { mergeString } from '@/utils/stringUtil'
import { Button, Flex } from 'ant-design-vue'
import type { ICustomerAddress } from '@/types/address'
import { ref, toRaw } from 'vue'
import Modal from '@/components/Modal/Index.vue'
import AddressForm from '@/components/Address/index.vue'
import { storeToRefs } from 'pinia'
const addressRef = ref()

const props = defineProps<{
  data: ICustomerAddress
  showLine?: boolean
}>()

// Define emits for custom events
const emit = defineEmits(['afterUpdate', 'setPrimary', 'afterDelete'])

const $store = useCustomer();
const {loading} = storeToRefs($store)
const openDelete = ref(false)
const openUpdate = ref(false)

const onDelete = async () => {
  openDelete.value = !openDelete.value
}
const handleDelete = async () => {
  try {
    await $store.deleteUserAddress(props.data._id).then(() => {
      emit('afterDelete', props.data._id)
    })
  } catch (error) {
    console.error('Delete failed:', error)
  }
}
const getAddressData = () => {
  const data = toRaw(addressRef.value?.formRef)
  if (!data) return null
  return data
}
const onUpdate = () => {
  // emit('update', props.data._id, props.data);
  openUpdate.value = !openUpdate.value
}

const handleUpdate = async () => {
  const data = getAddressData()
  openUpdate.value = false
  $store.updateAddress(data).then(() => {
    emit('afterUpdate')
  })
}
const onSetPrimary = async () => {
  if (props.data.is_primary) return
  emit('setPrimary', props.data)
}

defineExpose({
  onDelete,
  onUpdate,
  onSetPrimary,
  data: props.data,
})

defineOptions({ name: 'AddressItem' })
</script>

<style scoped>
.contact-card {
  padding: 8px 0;
  font-family: Arial, sans-serif;
}

.contact-name {
  font-weight: bold;
  position: relative;
  padding-right: 12px;
  margin-right: 12px;
}

.contact-name::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 16px;
  background-color: #aaa;
}

.contact-phone {
  color: #666;
}

.contact-address {
  margin-top: 4px;
  color: #666;
  font-size: 14px;
}
</style>
