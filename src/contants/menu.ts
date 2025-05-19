import type { MenuItem } from '@/types/menu'
import { transformLabel } from '@/utils/menu'
import type { Composer } from 'vue-i18n'
import { ROUTE_NAME } from '../router/route'
import { h } from 'vue'
import { RouterLink } from 'vue-router'


export const MENU_ASSET = {
  menu_1: {
    icon:'lucide:paw-print',
    color: 'red'
  },
  [ROUTE_NAME.PET_SERVICE_PACK]:{
    icon:'streamline:medical-cross-symbol-solid',
    color: 'var(--vt-c-primary)'
  }
}


export const MENU_ADMIN = (t: Composer['t']): MenuItem[] => [
  {
    label: t('menu.menu_4'),
    title: t('menu.menu_4'),
    color: MENU_ASSET.menu_1.color,
    icon: MENU_ASSET.menu_1.icon,
    key: 'menu_1',
    children: [
      {
        label: transformLabel(ROUTE_NAME.PET_SETTING_PET_TYPE, t('menu.menu_6')),
        title: t('menu.menu_6'),
        key: ROUTE_NAME.PET_SETTING_PET_TYPE,
      },

      {
        label: transformLabel(ROUTE_NAME.PET_CATEGORY, t('menu.menu_7')),
        title: t('menu.menu_7'),
        key: ROUTE_NAME.PET_CATEGORY,
      },
      {
        label: transformLabel(ROUTE_NAME.PET_RETAIL_SERVICES, t('menu.menu_8')),
        title: t('menu.menu_8'),
        key: ROUTE_NAME.PET_RETAIL_SERVICES,
      },
    ],
  },
  {
    label: h(
      RouterLink,
      { to: { name: ROUTE_NAME.PET_SERVICE_PACK } },
      { default: () => t('menu.menu_9') },
    ),
    title: t('menu.menu_9'),
    color: MENU_ASSET[ROUTE_NAME.PET_SERVICE_PACK].color,
    icon: MENU_ASSET[ROUTE_NAME.PET_SERVICE_PACK].icon,
    key: ROUTE_NAME.PET_SERVICE_PACK,
  },
]
