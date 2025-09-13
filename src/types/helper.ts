export interface RestParams {
  [key: string]: unknown
}

export interface TreeNode {
  children: TreeNode[]
  title: unknown
  value: unknown
  key: unknown
  [key: string]: unknown
}

export interface BuildTreeOptions {
  idKey?: string
  parentKey?: string
  childrenKey?: string
  replaceTitle?: string
  replaceValue?: string
}
