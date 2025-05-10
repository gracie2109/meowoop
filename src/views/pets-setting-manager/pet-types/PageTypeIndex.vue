<template>
  <div class="container" id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <Icon icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_6') }}
    </PageHeader>
    <Search
      placeholder="Search data pet types"
      :dataSearch="dataSearch"
      :actionButton="actionButton"
      @onSearch="onSearch"
    />

    <FormCs :show-form="showForm" :data-item="dataItem" @on-cancel="showForm = false" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Search from './Search.vue'
import { h, markRaw, reactive, ref } from 'vue'
import FormCs from './Form.vue'
useDynamicTitle('menu.menu_6')

const dataSearch = ref({})
const showForm = ref(false)
const dataItem = ref(null)
const onSearch = (val: unknown) => {
  console.log('val', val)
}
const actionButton = reactive([
  {
    isShow: true,
    component: markRaw(
      h(Icon, {
        icon: 'eva:plus-fill',
        height: '30px',
        color: 'var(--vt-c-primary-slate)',
        style: 'cursor: pointer',
        onClick: () => {
          showForm.value = true
        },
      }),
    ),
  },
  {
    isShow: true,
    component: markRaw(
      h(Icon, {
        icon: 'tabler:reload',
        height: '30px',
        color: 'var(--vt-c-primary-slate)',
        style: 'cursor: pointer',
        onClick: () => {
          alert('click reload')
        },
      }),
    ),
  },
])
</script>
