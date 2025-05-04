import type { Key } from 'ant-design-vue/es/_util/type'
import type { VNodeChild } from 'vue'
import type { VNode } from 'vue'

export type MenuItem = {
  label: string | VNodeChild | VNode
  title: string
  color?: string
  icon?: string | VNodeChild | VNode
  children?: MenuItem[]
  key: string
}

export interface MenuStateType {
  openKeys: Key[]
  selectedKeys: Key[]
  collapsed: boolean
}

export type TransformedMenuItem = Omit<MenuItem, 'icon' | 'children'> & {
  icon: VNode
  children?: TransformedMenuItem[]
}
