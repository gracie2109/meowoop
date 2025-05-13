import type { TableColumnType } from 'ant-design-vue'

type RestParams = {
  [key: string]: unknown
}
export const renderTableField = (
  name: string,
  dataIndex: string,
  render?: (params: { text?: unknown; record: unknown; index: number }) => unknown,
  rest?: RestParams,
): TableColumnType => {
  return {
    title: name,
    dataIndex,
    key: dataIndex,
    customRender: (params) => {
      return render ? render(params) : (params.text ?? null)
    },
    ...rest,
  }
}
