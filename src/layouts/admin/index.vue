<template>
  <Layout style="height: 100%; min-height: 100vh">
    <Sider v-model:collapsed="collapseMenu" :trigger="null" collapsible theme="light" width="265px">
      <Row
        justify="space-between"
        align="middle"
        style="height: 55px; margin: auto 0; padding: 1rem"
      >
        <div style="padding-left: 0.5rem; cursor: pointer">
          <Icon
            icon="lucide:align-justify"
            color="var(--vt-c-primary)"
            class="trigger"
            width="30px"
            @click="$app.changeCollapse()"
          />
        </div>
        <Logo v-if="!collapseMenu" style="height: 30px" />
      </Row>
      <Sidebar />
    </Sider>
    <Layout>
      <MenuHeader />
      <Content
        :style="{
          margin: '12px 12px',
          padding: '12px ',
          minHeight: '280px',
          height: '100%',
        }"
      >
        <slot />
      </Content>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, Row } from 'ant-design-vue'
import Sidebar from './AdminSidebar.vue'
import MenuHeader from './AdminHeader.vue'
import Logo from '@/components/app/AppLogo.vue'
import { useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
const { Sider, Content } = Layout

const $app = useGlobalStore()
const { collapseMenu } = storeToRefs($app)
defineOptions({
  name: 'AdminLayout',
})
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

/* #components-layout-demo-custom-trigger .logo {
  height: 62px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  border: 1px solid red;
} */

.site-layout .site-layout-background {
  background: #fff;
}
</style>
