<template>
  <Flex wrap="wrap" gap="16" v-if="data">
    <Col
      :lg="2"
      :md="8"
      :sm="12"
      :xs="24"
      v-for="i in data"
      :key="i._id"
      class="card"
      @click="handleClick(i)"
    >
      <Flex :justify="'center'" :align="'center'" wrap="wrap" gap="16" class="content">
        <PreviewIcon :svg-id="i.icon.icon" :color="i.icon.color" />
        <Typography.Title :level="5">{{ i.name }}</Typography.Title>
      </Flex>
    </Col>
  </Flex>

  <div v-if="dataSelected">
    <Modal
      :open="!!dataSelected"
      @handleCancel="() => (dataSelected = null)"
      :width="'900px'"
      :hide-footer="true"
      :title="dataSelected.name"
    >
      <template #content>
        <Flex wrap="wrap" gap="16">
          <Col :lg="4" :md="8" :sm="12" :xs="24" class="card card_modal">
            <Icon style="text-align: center" :height="'30px'" :icon="'grommet-icons:overview'" />
            <p>Overview</p>
          </Col>
        </Flex>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import PreviewIcon from '@/components/Icons/PreviewIcon.vue'
import Modal from '@/components/Modal/Index.vue'
import type { TPetType } from '@/types/pet-type'
import { Col, Flex, Typography } from 'ant-design-vue'
import { usePetServicePrice } from '@/stores'
import { ref } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
const $store = usePetServicePrice()

const dataSelected = ref<TPetType | null>(null)
defineOptions({ name: 'pet-service-list' })
defineProps<{
  data: TPetType[]
}>()

function handleClick(item) {
  dataSelected.value = item
}
</script>

<style scoped>
.card {
  padding: 1rem;
  height: 120px;
  max-height: 120px;
  border-radius: 15px;
  cursor: pointer;
  background-color: white;
  border: 1px solid var(--vt-c-primary);
}
.card_modal {
  display: grid;
  place-content: center;
  justify-items: center;
}
.content {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
}
</style>
