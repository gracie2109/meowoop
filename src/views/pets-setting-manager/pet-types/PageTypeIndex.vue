<template>
  <div class="container" id="pet_types" ref="el">
    <Form @finish="handleSubmit" :model="formState">
      <FormInput
        label="user"
        name="username"
        isRequired
        :rules="rulesRef"
        :form="form"
        v-model="formState.username"
      />
      <Button type="submit">Submit</Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { useDynamicTitle } from '@/composables'
import FormInput from '@/components/FormItem/FormInput.vue'
import { Form } from 'ant-design-vue'

useDynamicTitle('menu.menu_6')
const formState = reactive({
  username: '',
})
const useForm = Form.useForm

const rulesRef = reactive({
  username: [
    {
      required: true,
      message: 'Please input Activity name',
    },
    {
      min: 3,
      max: 5,
      message: 'Length should be 3 to 5',
      trigger: 'blur',
    },
  ],
})
const form = useForm(formState, rulesRef)

const handleSubmit = () => {
  form.validate().then(() => {
    console.log('formState', formState)
  })
}

const el = ref()
</script>
