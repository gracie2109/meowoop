<template>
  <div class="container" id="pet_types" ref="el">
    <FormWrapper :form="form" :hasSubmitted="hasSubmitted">
      <Form @finish="handleSubmit" :model="formState">
        <FormInput
          name="username"
          label="Username"
          isRequired
          :rules="rulesRef.username"
          v-model="formState.username"
        />

        <FormItemSelect
          name="role"
          label="User Role"
          :rules="rulesRef.role"
          :options="[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]"
          isRequired
          v-model="formState.role"
          showSearch
          mode="multiple"
        />
        <Button htmlType="submit" type="primary" @click="hasSubmitted = true">Submit</Button>
        <Button style="margin-left: 10px" @click="reset">Reset</Button>
      </Form>
    </FormWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import { useDynamicTitle } from '@/composables'
import FormInput from '@/components/FormItem/FormInput.vue'
import { Form, Button, type FormInstance } from 'ant-design-vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import FormWrapper from '@/components/FormItem/FormWrapper.vue'
import { useI18n } from 'vue-i18n'

useDynamicTitle('menu.menu_6')
const { t } = useI18n()
const hasSubmitted = ref(false)

const formState = reactive({
  username: '',
  role: [],
})
const useForm = Form.useForm

const rulesRef = computed(() => ({
  username: [
    {
      required: true,
      message: t('common.required', { name: 'Tên đăng nhập' }),
    },
  ],
  role: [
    {
      required: true,
      message: t('common.required', { name: 'Role name' }),
    },
  ],
}))
const form = useForm(formState, rulesRef) as unknown as FormInstance
const el = ref()

provide('form', form)

const handleSubmit = () => {
  form.validate().then(() => {
    hasSubmitted.value = false
  })
}
const reset = () => {
  form.resetFields()
}
</script>
