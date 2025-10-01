<template>
  <div id="app">
    <Form :model="formRef" @finish="handleOk" ref="formInstance" :layout="''">
      <Row :gutter="[20, 12]">
        <Col span="12">
          <FormItemInput
            v-model:model-value="formRef[CUSTOMER_PARAMS.displayName]"
            :name="CUSTOMER_PARAMS.displayName"
            :label="$t('customers.P1')"
            isRequired
          />
        </Col>
        <Col span="12">
          <FormItemInput
            v-model:model-value="formRef[CUSTOMER_PARAMS.password]"
            :name="CUSTOMER_PARAMS.password"
            :label="$t('customers.P6')"
            isRequired
          />
        </Col>

        <Col span="12">
          <FormItemSelect
            v-model:modelValue="formRef.gender"
            :name="CUSTOMER_PARAMS.gender"
            :label="$t('customers.genderTitle')"
            :options="GENDER_ARRAYS(t)"
            :showSearch="true"
          />
        </Col>
      </Row>

      <Col span="24">
        <Flex gap="20" align="center" justify="end">
          <Button size="large" @click="() => $emit('onCancel')">
            {{ $t('common.cancelTitle') }}
          </Button>
          <Button size="large" type="primary" htmlType="submit">
            {{ $t('common.saveTitle') }}
          </Button>
        </Flex>
      </Col>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { CUSTOMER_PARAMS, type ICustomers } from '@/types/customers'
import { Row, Col, Form, Button, Flex } from 'ant-design-vue'
import { ref } from 'vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'

const DEFAULT_FORM: ICustomers = {
  [CUSTOMER_PARAMS.displayName]: '',
  [CUSTOMER_PARAMS.fullName]: '',
  [CUSTOMER_PARAMS.email]: '',
  [CUSTOMER_PARAMS.phoneNumber]: '',
  [CUSTOMER_PARAMS.avartarUrl]: [],
  [CUSTOMER_PARAMS.dob]: '',
  [CUSTOMER_PARAMS.password]: '',
}

const useForm = Form.useForm
const formRef = ref<ICustomers>({ ...DEFAULT_FORM })
const form = useForm(formRef, {})

const handleOk = () => {
  form
    .validate()
    .then(() => {
      console.log(formRef.value)
    })
    .catch((e) => {
      console.log('Validation failed:', e)
    })
}

defineOptions({ name: 'home_page' })
</script>
