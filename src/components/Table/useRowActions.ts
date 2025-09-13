import type { VNode } from 'vue'

// useRowActions.ts
export type BaseActionType = 'edit' | 'delete' | 'view'

export interface RowAction {
  type: BaseActionType | string
  icon?: string
  tooltip?: string
  event?: string
  payload?: unknown
  show?: boolean
  disabled?: boolean
  loading?: boolean
  confirm?: boolean
  confirmMessage?: string
  color?: string
  size?: string
  customRender?: () => VNode | null
}

const DEFAULT_ICONS: Record<BaseActionType, string> = {
  edit: 'nimbus:edit',
  delete: 'mdi:delete-outline',
  view: 'icon-park-outline:doc-detail',
}

const DEFAULT_TOOLTIPS: Record<BaseActionType, string> = {
  edit: 'Chỉnh sửa',
  delete: 'Xoá',
  view: 'Xem chi tiết',
}

export const DEFAULT_ICON_COLOR: Record<BaseActionType, string> = {
  edit: 'var(--vt-c-primary)',
  delete: 'var(--vt-c-primary)',
  view: 'var(--vt-c-primary)',
}
export function normalizeActions(actions: RowAction[]): RowAction[] {
  return actions
    .filter((a) => a.show !== false)
    .map((a) => {
      const type = a.type as BaseActionType
      return {
        ...a,
        icon: a.icon || DEFAULT_ICONS[type],
        tooltip: a.tooltip || DEFAULT_TOOLTIPS[type] || a.type,
        event: a.event || type,
        size: a.size || '20px',
        color: DEFAULT_ICON_COLOR[type] || 'var(--vt-c-primary)',
        confirm: a.confirm || false,
        disabled: a.disabled || false,
        loading: a.loading || false,
        payload: a.payload || null,
        show: a.show || true,
        confirmMessage: a.confirmMessage || '',
        customRender: a.customRender || (() => null),
      }
    })
}

export const ACTION_PRESETS: Record<string, Partial<RowAction>> = {
  edit: {
    icon: 'nimbus:edit',
    tooltip: 'Sửa',
    event: 'edit',
    color: '#409EFF',
  },
  view: {
    icon: 'mingcute:eye-line',
    tooltip: 'Xem chi tiết',
    event: 'view',
    color: '#67C23A',
  },
  delete: {
    icon: 'mdi:trash-can-outline',
    tooltip: 'Xóa',
    event: 'delete',
    color: '#F56C6C',
    confirm: true,
    confirmMessage: 'Bạn có chắc chắn muốn xóa?',
  },
  // Thêm preset khác nếu cần
}
