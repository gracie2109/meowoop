<template>

    <div>
        <Table :columns="column" :data="data" />
        

    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import Table from "@/components/Table/index.vue"
const data = reactive([])

const column = reactive([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
])
</script>
