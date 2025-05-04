<template>
  <div class="container" id="pet_types" ref="el">
    <FormWrapper :form="form" :hasSubmitted="hasSubmitted">
      <Form @finish="handleSubmit" :model="formState">
        <DatePickerCs name="time" isRequired label="Choose date" v-model="formState.time" />
        <Button htmlType="submit" type="primary" @click="hasSubmitted = true">Submit</Button>
        <Button style="margin-left: 10px" @click="reset">Reset</Button>
      </Form>
    </FormWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import { useDynamicTitle } from '@/composables'
import { Form, Button, type FormInstance } from 'ant-design-vue'
import FormWrapper from '@/components/FormItem/FormWrapper.vue'
import { useI18n } from 'vue-i18n'
import DatePickerCs from '@/components/DatePicker/Index.vue'
useDynamicTitle('menu.menu_6')
const { t } = useI18n()
const hasSubmitted = ref(false)

const formState = reactive({
  time: undefined,
})
const useForm = Form.useForm

const rulesRef = computed(() => ({
  time: [
    {
      required: true,
      message: t('common.required', { name: 'Time' }),
    },
  ],
}))
const form = useForm(formState, rulesRef) as unknown as FormInstance
const el = ref()

provide('form', form)

const handleSubmit = () => {
  form.validate().then(() => {
    hasSubmitted.value = false
    console.log(formState)
  })
}
const reset = () => {
  form.resetFields()
}
</script>
