import type { MenuItem } from '@/types/menu'
import { transformLabel } from '@/utils/menu'
import type { Composer } from 'vue-i18n'
import { ROUTE_NAME } from '../router/route'

export const MENU_ADMIN = (t: Composer['t']): MenuItem[] => [
  {
    label: transformLabel(ROUTE_NAME.DASHBOARD_VIEW, t('dashboard.d1')),
    title: t('dashboard.d1'),
    key: ROUTE_NAME.DASHBOARD_VIEW,
    icon: 'pixel:analytics'
  },

  {
    label: t('menu.menu_4'),
    title: t('menu.menu_4'),
    color: 'red',
    icon: 'lucide:paw-print',
    key: '1',
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
        label: transformLabel(ROUTE_NAME.PET_SERVICES, t('menu.menu_8')),
        title: t('menu.menu_8'),
        key: ROUTE_NAME.PET_SERVICES,
      },
    ],
  },
   {
    label: transformLabel(ROUTE_NAME.BOSS, t('pType.B1')),
    title: t('pType.B1'),
    key: ROUTE_NAME.BOSS,
    icon: 'arcticons:pet-first-aid'
  },
  {
    label: transformLabel(ROUTE_NAME.CUSTOMERS, t('pType.B2')),
    title: t('pType.B2'),
    key: ROUTE_NAME.CUSTOMERS,
    icon: 'bx:user'
  },
]
