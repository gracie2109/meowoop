import type { BuildTreeOptions, RestParams, TreeNode } from '@/types/helper'
import type { TableColumnType } from 'ant-design-vue'

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

export const getIndex = (dataPage: { page: number; page_size: number }, index: number) => {
  const stt = (dataPage.page - 1) * dataPage.page_size + index + 1
  return stt
}

export function buildTree<T extends RestParams>(
  items: T[],
  options: BuildTreeOptions = {},
): TreeNode[] {
  const {
    idKey = 'id',
    parentKey = 'parent_id',
    childrenKey = 'children',
    replaceTitle = 'name',
    replaceValue = 'id',
  } = options

  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const itemMap = new Map<unknown, TreeNode>()
  const roots: TreeNode[] = []

  // First pass: create all nodes
  for (const item of items) {
    const node: TreeNode = {
      ...item,
      children: [],
      title: item[replaceTitle],
      value: item[replaceValue],
      key: item[replaceValue],
      [childrenKey]: [],
    }
    itemMap.set(item[idKey], node)
  }

  // Second pass: build the tree structure
  for (const item of items) {
    const node = itemMap.get(item[idKey])
    const parentId = item[parentKey]

    if (parentId != null && itemMap.has(parentId) && node) {
      const parentNode = itemMap.get(parentId)
      if (parentNode) {
        const childrenArray = parentNode[childrenKey] as TreeNode[]
        if (Array.isArray(childrenArray)) {
          childrenArray.push(node)
        }
      }
    } else if (node) {
      roots.push(node)
    }
  }

  return roots
}
