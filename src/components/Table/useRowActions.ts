// useRowActions.ts
export type BaseActionType = 'edit' | 'delete' | 'view' | 'custom'

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
}

const DEFAULT_ICONS: Record<BaseActionType, string> = {
  edit: 'nimbus:edit',
  delete: 'mdi:delete-outline',
  view: 'icon-park-outline:doc-detail',
  custom: 'mdi:gesture-tap-button',
}

const DEFAULT_TOOLTIPS: Record<BaseActionType, string> = {
  edit: 'Chỉnh sửa',
  delete: 'Xoá',
  view: 'Xem chi tiết',
  custom: 'Hành động',
}

export const DEFAULT_ICON_COLOR: Record<BaseActionType, string> = {
  edit: 'var(--vt-c-primary)',
  delete: 'var(--vt-c-primary)',
  view: 'var(--vt-c-primary)',
  custom: 'var(--vt-c-primary)',
}
export function normalizeActions(actions: RowAction[]): Required<RowAction>[] {
  return actions
    .filter((a) => a.show !== false)
    .map((a) => {
      const type = a.type as BaseActionType
      return {
        ...a,
        icon: a.icon || DEFAULT_ICONS[type] || DEFAULT_ICONS.custom,
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
      }
    })
}
