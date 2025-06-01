<template>
  <div class="control_header">
    <Row align="center" justify="space-between" :gutter="16">
      <Col lg="4" sm="24" class="right_actions">
        <DashboardSelector />
        <Tooltip placement="top" auto-adjust-overflow>
          <template #title>{{ $t('dashboard.d3') }}</template>
          <div @click="goListDashboard">
            <Icon
              style="cursor: pointer"
              icon="material-symbols:dashboard-outline-rounded"
              height="30"
              color="var(--vt-c-primary)"
            />
          </div>
        </Tooltip>
      </Col>

      <Col lg="8" sm="24" class="right_actions">
        <TimeFilter />
        <DashboardAction>
          <template #content>
            <slot name="content" />
          </template>
        </DashboardAction>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { ROUTE_NAME } from '@/router/route'
import DashboardSelector from './dashboard-selector/Index.vue'
import DashboardAction from '@/views/Dashboard/components/control-header/actions/Index.vue'
import TimeFilter from '@/views/Dashboard/components/control-header/time-filter/Index.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Row, Col, Tooltip } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goListDashboard = () => {
  router.push({ name: ROUTE_NAME.DASHBOARD_LIST })
}

defineOptions({
  name: 'dashboard-control-header',
})
</script>

<style scoped>
.control_header {
  height: 50px;
  width: 100%;
  position: relative;
  top: -1rem;
}

.control_content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.right_actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
