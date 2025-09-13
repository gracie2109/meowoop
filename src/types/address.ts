export interface IAddress {
  provider_code: string
  district_code: string
  ward_code: string
  provider_name: string
  district_name: string
  ward_name: string
  detail: string
  label: string
}

export interface ICustomerAddress {
  city_name: string
  _id: string
  customer_info?: {
    name: string
    phone_number: string
    [key: string]: unknown
  }
  phone_number: string
  detail: string
  provider_name: string
  district_name: string
  ward_name: string
  is_primary: boolean
  label: string
}
export const ADDRESS_PARAMS = {
  city: 'provider_code',
  district: 'district_code',
  ward: 'ward_code',
  cityName: 'provider_name',
  districtName: 'district_name',
  wardName: 'ward_name',
  address: 'detail',
  label: 'label',
} as const satisfies Record<string, keyof IAddress>

export interface AddressResponse {
  code: string
  name: string
  level: number
}

export interface AddressResponse {
  success: boolean
  data: AddressResponse[]
}
