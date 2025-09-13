<template>
  <div style="position: relative">
    <PageHeader>
      <FunctionalButton icon="bx:user" width="20" />&nbsp; &gt;&nbsp;
      <span
        v-if="address"
        style="cursor: pointer"
        @click="
          () => {
            $router.push({ name: ROUTE_NAME.CUSTOMERS })
          }
        "
        >{{ address?.[0]?.customer_info?.name }}</span
      >&nbsp; &gt;
      {{ $t('customers.addressBook') }}
    </PageHeader>

    <div style="width: 100%; position: relative">
      <Flex justify="flex-end" id="btn_add_address">
        <Button type="primary" size="large" @click="openAddModal = !openAddModal">
          <Flex align="center"><Icon icon="eva:plus-fill" /> {{ $t('customers.addAddress') }}</Flex>
        </Button>
      </Flex>
      <div style="margin-top: 1rem; background: white; height: 450px">
        <div style="width: 80%; margin: 0 auto">
          <template v-if="address.length > 0">
            <AddressItem
              :data="data"
              v-for="data in address"
              :key="data._id"
              :showLine="true"
              :ref="(el) => addressRefs.set(data._id, el)"
              @afterUpdate="onGetListAddress"
              @setPrimary="onSetPrimary"
              @afterDelete="onGetListAddress"
            />
          </template>
          <div v-else>No address data</div>
        </div>
      </div>
    </div>

    <Modal
      :open="!!openAddModal"
      :title="$t('customers.addAddress')"
      @handle-cancel="openAddModal = false"
      @handle-ok="handleCreate"
      :loading="loading"
    >
      <template #content>
        <AddressForm ref="addressRefModal" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomer } from '@/stores'
import { Button, Flex } from 'ant-design-vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import AddressItem from './AddressItem.vue'
import Modal from '@/components/Modal/Index.vue'
import AddressForm from '@/components/Address/index.vue'
const addressRefModal = ref()

import type { ICustomerAddress } from '@/types/address'
import PageHeader from '@/components/PageHeader.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import { ROUTE_NAME } from '@/router/route'
import { storeToRefs } from 'pinia'

const $store = useCustomer()

const { loading } = storeToRefs($store)

const address = ref<ICustomerAddress[]>([])
const addressRefs = ref(new Map())
const openAddModal = ref(false)
const props = defineProps<{
  userId?: string
}>()

const route = useRoute()
const userId = computed(() => {
  return props.userId || route.params?.user_id || ''
})

const onSetPrimary = async (data: any) => {
  const payload = {
    _id: data?._id,
    new_primary: data?._id,
    old_primary: address.value?.find((i) => i?.is_primary)?._id,
  }
  $store.updateAddress(payload).then(async () => {
    await onGetListAddress()
  })
}

const onGetListAddress = async () => {
  if (userId.value) {
    const res = await $store.getUserAddress(String(userId.value))
    address.value = res || []
  }
}

const deleteAddress = (addressId: string) => {
  const addressRef = addressRefs.value.get(addressId)
  if (addressRef) {
    addressRef.onDelete()
  }
}

const getAddressData = () => {
  const data = toRaw(addressRefModal.value?.formRef)
  if (!data) return null
  return data
}

const handleCreate = async () => {
  if (userId.value) {
    const data = {
      ...getAddressData(),
      userId: userId.value,
    }
    $store.createUserAddress(data).then(async () => {
      openAddModal.value = false
      await onGetListAddress()
    })
  }
}

onMounted(async () => {
  await onGetListAddress()
})

defineExpose({
  onGetListAddress,
  deleteAddress,
  addressRefs,
})

defineOptions({ name: 'CustomerBooks' })
</script>

<style scoped></style>
