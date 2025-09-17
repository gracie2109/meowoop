<template>
  <div id="medical_books" ref="el" style="position: relative">
    <PageHeader>
      <FunctionalButton icon="bx:user" width="20" />
      <div
        style="cursor: pointer"
        @click="
          () => {
            $router.push({ name: ROUTE_NAME.BOSS })
          }
        "
        v-if="params?.pet_id"
      >
        &nbsp; &gt; {{ $t('customers.bossList') }}
      </div>

      <span>&nbsp; &gt; {{ $t('customers.medicalBooks') }}</span>
    </PageHeader>
    <div class="content">
      <Flex justify="flex-end" id="btn_add_address">
      <Button type="primary" size="large">
        <Flex align="center"> <Icon icon="eva:plus-fill" /> {{ $t('customers.addAddress') }} </Flex>
      </Button>
    </Flex>
    <p>Sổ khám bệnh của thú cưng</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import type { IMedicalParams } from '@/types/pet-boss'
import { Button, Flex } from 'ant-design-vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

import { computed, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { ROUTE_NAME } from '@/router/route'

const route = useRoute();
console.log('medical-books', toRaw(route));

const params = computed((): IMedicalParams => route.params as IMedicalParams)

defineOptions({ name: 'medical-books' })
</script>

<style scoped></style>
