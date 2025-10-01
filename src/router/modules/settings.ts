import { LAYOUT_TYPE } from '@/contants/app'
import { ROUTE_NAME, ROUTER_PATH } from '../route'
import SettingWebInterface from '@/views/settings/interface/Index.vue'
import SettingBannerView from '@/views/settings/banners/Index.vue'
import SettingBannerCreateView from '@/views/settings/banners/Form.vue'

const a = [
  {
    path: ROUTER_PATH.SETTING_INTERFACE,
    name: ROUTE_NAME.SETTING_INTERFACE,
    component: SettingWebInterface,
  },
  {
    path: ROUTER_PATH.SETTING_BANNER,
    name: ROUTE_NAME.SETTING_BANNER,
    component: SettingBannerView,
  },
  {
    path: ROUTER_PATH.SETTING_BANNER_CREATE,
    name: ROUTE_NAME.SETTING_BANNER_CREATE,
    component: SettingBannerCreateView,
  },
  {
    path: ROUTER_PATH.SETTING_BANNER_EDIT,
    name: ROUTE_NAME.SETTING_BANNER_EDIT,
    component: SettingBannerCreateView,
  },
]

const SettingRoute = a.map((i) => ({
  ...i,
  meta: {
    layout: LAYOUT_TYPE.ADMIN,
    auth: true,
  },
}))

export default SettingRoute
