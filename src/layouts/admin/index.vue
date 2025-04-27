<template>
  <Layout style="height: 100%; min-height: 100vh">
    <Sider v-model:collapsed="collapseMenu" :trigger="null" collapsible theme="light" width="265px">
      <Row
        justify="space-between"
        align="middle"
        style="height: 65px; margin: auto 0; padding: 1rem"
      >
        <div style="padding-left: 1rem; cursor: pointer">
          <Menu color="var( --vt-c-primary)" class="trigger" @click="$app.changeCollapse()" />
        </div>
        <Logo v-if="!collapseMenu" style="height: 30px" />
      </Row>
      <Sidebar :state="state" />
    </Sider>
    <Layout>
      <MenuHeader />
      <Content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <slot />
      </Content>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, Row } from 'ant-design-vue'
import { reactive } from 'vue'
import { Menu } from 'lucide-vue-next'
import Sidebar from './Siderbar.vue'
import MenuHeader from './Header.vue'

import Logo from '@/components/app/Logo.vue'
import { useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { Sider, Content } = Layout

const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  preOpenKeys: [],
})

const $app = useGlobalStore()
const { collapseMenu } = storeToRefs($app)
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 62px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  border: 1px solid red;
}

.site-layout .site-layout-background {
  background: #fff;
}

.header_right {
}
</style>
