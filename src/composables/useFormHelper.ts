import { Form } from 'ant-design-vue'
import { reactive } from 'vue'

export const useFormHelper = <T extends object>(initialValues: T, rules: any) => {
  const model = reactive({ ...initialValues })
  const { validate, validateInfos, resetFields } = Form.useForm(model, rules)

  const setFieldValue = (field: keyof T, value: any) => {
    model[field] = value
  }

  const getFieldValue = (field: keyof T) => {
    return model[field]
  }

  return {
    form: {
      model,
      validate,
      validateInfos,
      resetFields,
      setFieldValue,
      getFieldValue,
    },
  }
}
