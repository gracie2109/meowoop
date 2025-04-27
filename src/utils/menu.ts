import { RouterLink } from 'vue-router'
import { h, markRaw } from 'vue'
import { Icon } from '@iconify/vue'

export function transformMenu(items) {
  return items.map((item) => ({
    ...item,
    icon: item.icon
      ? h(markRaw(Icon), {
          icon: item.icon,
          style: { color: item.color || 'inherit', fontSize: '20px' },
        })
      : h(markRaw(Icon), {
          icon: 'lucide:dot',
          style: { color: item.color || 'inherit', fontSize: '20px' },
        }),
    children: item.children ? transformMenu(item.children) : undefined,
  }))
}

export function transformLabel(path: string, label: string) {
  return h(RouterLink, { to: { name: path } }, label)
}
