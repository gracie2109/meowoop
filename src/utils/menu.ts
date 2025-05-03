import { RouterLink } from 'vue-router'
import { h, markRaw } from 'vue'
import { Icon } from '@iconify/vue'
import type { MenuItem, TransformedMenuItem } from '@/types/menu'

export function transformMenu(items: MenuItem[]): TransformedMenuItem[] {
  return items.map((item) => ({
    ...item,
    icon: h(markRaw(Icon), {
      icon: String(item.icon || 'lucide:dot'),
      style: { color: item.color || 'inherit', fontSize: '20px' },
    }),
    children: item.children ? transformMenu(item.children) : undefined,
  }))
}

export function transformLabel(path: string, label: string) {
  return h(RouterLink, { to: { name: path } }, label)
}
