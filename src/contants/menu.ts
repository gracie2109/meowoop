import type { MenuItem } from '@/types/menu'
import { transformLabel } from '@/utils/menu'
import type { Composer } from 'vue-i18n'
import { ROUTE_NAME } from '../router/route'

export const MENU_ADMIN = (t: Composer['t']): MenuItem[] => [
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
        key: '1.1',
      },
      {
        label: transformLabel(ROUTE_NAME.PET_SETTING_SERVICES, t('menu.menu_5')),
        title: t('menu.menu_5'),
        key: '1.2',
      },
    ],
  },
]
