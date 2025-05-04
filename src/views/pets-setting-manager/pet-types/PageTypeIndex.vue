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

        <FormInputInline
          name="test"
          label="test"
          isRequired
          :rules="rulesRef.test"
          v-model="formState.test"
        />

        <!-- <CusTomModal
          :open="open"
          @handle-cancel="() => (open = false)"
          title="Gửi lời yêu"
          content="Bạn có muốn yêu lại từ đầu?"
          :name1st-btn="btnName.a"
          :name2ndt-btn="btnName.b"
          :name3ndt-btn="btnName.c"
          @handle1st-btn="btnActions.a.onClick"
          @handle2nd-btn="btnActions.b.onClick"
          @handle3nd-btn="btnActions.c.onClick"
          :hide3ndBtn="step === 1"
        /> -->

        <CusTomModal
          :open="open"
          @handle-cancel="() => (open = false)"
          title="Gửi lời yêu"
          content="Bạn có muốn yêu lại từ đầu?"
          @handle1st-btn="() => (open = false)"
          @handle2nd-btn="
            () => {
              console.log('submit')
            }
          "
          hide3ndBtn
        />

        <Button style="margin-left: 10px" @click="open = true">OPEN</Button>
        <Button style="margin-left: 10px" @click="step = step + 1">STEP</Button>

        <Button htmlType="submit" type="primary" @click="hasSubmitted = true">Submit</Button>
        <Button style="margin-left: 10px" @click="reset">Reset</Button>
      </Form>
    </FormWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, useAttrs } from 'vue'
import { useDynamicTitle } from '@/composables'
import FormInput from '@/components/FormItem/FormInput.vue'
import { Form, Button, type FormInstance } from 'ant-design-vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import FormWrapper from '@/components/FormItem/FormWrapper.vue'
import { useI18n } from 'vue-i18n'
import FormInputInline from '@/components/FormItem/FormInputInline.vue'
import CusTomModal from '@/components/Modal/Index.vue'
useDynamicTitle('menu.menu_6')
const { t } = useI18n()
const hasSubmitted = ref(false)

const formState = reactive({
  username: '',
  role: [],
  test: '',
})
const useForm = Form.useForm
const open = ref(false)
const attrs = useAttrs()
const step = ref(0)

const btnName = computed(() => {
  switch (step.value) {
    case 0:
      return {
        a: 'hủy bỏ',
        b: 'lưu & đóng',
        c: 'next',
      }
    case 1:
      return {
        a: 'quay lại',
        b: 'đóng',
        c: '',
      }
    default:
      return {
        a: 'mặc định A',
        b: 'mặc định B',
        c: 'mặc định C',
      }
  }
})

const btnActions = computed(() => {
  switch (step.value) {
    case 0:
      return {
        a: {
          onClick: () => {
            open.value = false
          },
        },
        b: {
          onClick: () => {
            alert('Lưu và đóng ở bước 0')
          },
        },
        c: {
          onClick: () => {
            step.value = 1
          },
        },
      }

    case 1:
      return {
        a: {
          onClick: () => {
            step.value = 0
          },
        },
        b: {
          onClick: () => {
            open.value = false
          },
        },
        c: {
          onClick: () => {},
        },
      }

    default:
      return {
        a: {
          onClick: () => console.log('Click A mặc định'),
        },
        b: {
          onClick: () => console.log('Click B mặc định'),
        },
        c: {
          onClick: () => console.log('Click C mặc định'),
        },
      }
  }
})

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
  test: [
    {
      required: true,
      message: t('common.required', { name: 'Test' }),
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
