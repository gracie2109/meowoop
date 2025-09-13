<template>
  <div id="address_content">
    <Row justify="space-between" align="middle" :gutter="16">

      <Col :span="24" v-if="showLabel">
        <FormItemInput
          :showSearch="true"
          v-model:modelValue="formRef[ADDRESS_PARAMS.label]"
          :name="ADDRESS_PARAMS.label"
          :label="$t('common.displayName')"
        />
      </Col>
      <Col :span="8" v-if="showCity">
        <FormItemSelect
          :showSearch="true"
          v-model:modelValue="formRef[ADDRESS_PARAMS.city]"
          :name="ADDRESS_PARAMS.city"
          :label="$t('common.address_city')"
          :options="cityOptions"
        />
      </Col>
      <Col :span="8" v-if="showDistrict">
        <FormItemSelect
          v-model:modelValue="formRef[ADDRESS_PARAMS.district]"
          :name="ADDRESS_PARAMS.district"
          :label="$t('common.address_district')"
          :options="districtOptions"
          :showSearch="true"
        />
      </Col>
      <Col :span="8" v-if="showWard">
        <FormItemSelect
          v-model:modelValue="formRef[ADDRESS_PARAMS.ward]"
          :name="ADDRESS_PARAMS.ward"
          :label="$t('common.address_ward')"
          :options="wardOptions"
          :showSearch="true"
        />
      </Col>
    </Row>
    <div v-if="showAddressContent">
      <FormItemInput
        v-model:modelValue="formRef[ADDRESS_PARAMS.address]"
        :name="ADDRESS_PARAMS.address"
        :label="$t('common.address_content')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Col, Row } from 'ant-design-vue'
import { onMounted, ref, watch, computed, shallowRef, toRefs } from 'vue'
import { ADDRESS_PARAMS, type AddressResponse } from '@/types/address'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import FormItemInput from '@/components/FormItem/FormInput.vue'
import {
  searchAddressProvider,
  getDistrictsByCityCode,
  getWardsByDistrictCode,
} from '@/services/address.service'

interface Props {
  showCity?: boolean
  showDistrict?: boolean
  showWard?: boolean
  showAddressContent?: boolean
  showLabel?:boolean
  data?: Record<string, string | null> | null
}

const props = withDefaults(defineProps<Props>(), {
  showCity: true,
  showDistrict: true,
  showWard: true,
  showAddressContent: true,
  showLabel: true,
  data: null,
})

const { showCity, showDistrict, showWard, showAddressContent } = toRefs(props)

const emit = defineEmits<{
  'address-change': [value: Record<string, string | null>]
}>()

const citiesData = shallowRef<AddressResponse[]>([])
const districtsData = shallowRef<AddressResponse[]>([])
const wardsData = shallowRef<AddressResponse[]>([])
const isSettingFormData = ref(false)

const districtCache = new Map<string, AddressResponse[]>()
const wardCache = new Map<string, AddressResponse[]>()

const formRef = ref<Record<string, string | null>>({
  [ADDRESS_PARAMS.city]: null,
  [ADDRESS_PARAMS.district]: null,
  [ADDRESS_PARAMS.ward]: null,
  [ADDRESS_PARAMS.cityName]: null,
  [ADDRESS_PARAMS.districtName]: null,
  [ADDRESS_PARAMS.wardName]: null,
  [ADDRESS_PARAMS.address]: null,
   [ADDRESS_PARAMS.label]: null,
})

const cityOptions = computed(() => {
  const codeSet = new Set()
  const options = citiesData.value.map((item) => {
    codeSet.add(item.code)
    return { value: item.code, label: item.name }
  })

  const currentCityCode = formRef.value[ADDRESS_PARAMS.city]
  const currentCityName = formRef.value[ADDRESS_PARAMS.cityName]
  if (currentCityCode && currentCityName && !codeSet.has(currentCityCode)) {
    options.unshift({ value: currentCityCode, label: currentCityName })
  }

  return options
})

const districtOptions = computed(() => {
  const codeSet = new Set()
  const options = districtsData.value.map((item) => {
    codeSet.add(item.code)
    return { value: item.code, label: item.name }
  })
  const currentDistrictCode = formRef.value[ADDRESS_PARAMS.district]
  const currentDistrictName = formRef.value[ADDRESS_PARAMS.districtName]
  if (currentDistrictCode && currentDistrictName && !codeSet.has(currentDistrictCode)) {
    options.unshift({ value: currentDistrictCode, label: currentDistrictName })
  }

  return options
})

const wardOptions = computed(() => {
  const codeSet = new Set()
  const options = wardsData.value.map((item) => {
    codeSet.add(item.code)
    return { value: item.code, label: item.name }
  })

  const currentWardCode = formRef.value[ADDRESS_PARAMS.ward]
  const currentWardName = formRef.value[ADDRESS_PARAMS.wardName]
  if (currentWardCode && currentWardName && !codeSet.has(currentWardCode)) {
    options.unshift({ value: currentWardCode, label: currentWardName })
  }

  return options
})

onMounted(async () => {
  try {
    if (citiesData.value.length === 0) {
      const data = await searchAddressProvider({})
      if (data?.length) {
        citiesData.value = data as AddressResponse[]
      }
    }
  } catch (error) {
    console.error('Error loading cities:', error)
  }
})

watch(
  () => formRef.value[ADDRESS_PARAMS.city],
  async (newCode, oldCode) => {
    if (isSettingFormData.value || !newCode || newCode === oldCode) return

    try {
      const resetFields = {
        [ADDRESS_PARAMS.district]: null,
        [ADDRESS_PARAMS.ward]: null,
        [ADDRESS_PARAMS.districtName]: null,
        [ADDRESS_PARAMS.wardName]: null,
      }
      Object.assign(formRef.value, resetFields)

      const selectedCity = citiesData.value.find((city) => city.code === newCode)
      if (selectedCity) {
        formRef.value[ADDRESS_PARAMS.cityName] = selectedCity.name

        if (districtCache.has(newCode)) {
          districtsData.value = districtCache.get(newCode)!
        } else {
          const districts = await getDistrictsByCityCode(newCode)
          if (districts) {
            const districtList = districts as AddressResponse[]
            districtCache.set(newCode, districtList)
            districtsData.value = districtList
          }
        }
      }
      wardsData.value = []
    } catch (error) {
      console.error('Error loading districts:', error)
      districtsData.value = []
    }
  },
)

watch(
  () => formRef.value[ADDRESS_PARAMS.district],
  async (newCode, oldCode) => {
    if (isSettingFormData.value || !newCode || newCode === oldCode) return

    try {
      formRef.value[ADDRESS_PARAMS.ward] = null
      formRef.value[ADDRESS_PARAMS.wardName] = null

      const selectedDistrict = districtsData.value.find((district) => district.code === newCode)
      if (selectedDistrict) {
        formRef.value[ADDRESS_PARAMS.districtName] = selectedDistrict.name

        if (wardCache.has(newCode)) {
          wardsData.value = wardCache.get(newCode)!
        } else {
          const wards = await getWardsByDistrictCode(newCode)
          if (wards) {
            const wardList = wards as AddressResponse[]
            wardCache.set(newCode, wardList)
            wardsData.value = wardList
          }
        }
      }
    } catch (error) {
      console.error('Error loading wards:', error)
      wardsData.value = []
    }
  },
)

watch(
  () => formRef.value[ADDRESS_PARAMS.ward],
  (newCode) => {
    if (isSettingFormData.value || !newCode) return

    const selectedWard = wardsData.value.find((ward) => ward.code === newCode)
    if (selectedWard) {
      formRef.value[ADDRESS_PARAMS.wardName] = selectedWard.name
    }
  },
)

const setFormData = async (data: Record<string, string | null>) => {
  if (!data) return

  try {
    isSettingFormData.value = true

    const cityCode = data[ADDRESS_PARAMS.city]
    const districtCode = data[ADDRESS_PARAMS.district]

    Object.assign(formRef.value, data)

    const promises: Promise<void>[] = []

    if (cityCode) {
      promises.push(
        (async () => {
          if (districtCache.has(cityCode)) {
            districtsData.value = districtCache.get(cityCode)!
          } else {
            const districts = await getDistrictsByCityCode(cityCode)
            if (districts) {
              const districtList = districts as AddressResponse[]
              districtCache.set(cityCode, districtList)
              districtsData.value = districtList
            }
          }
        })(),
      )
    }

    if (districtCode) {
      promises.push(
        (async () => {
          if (wardCache.has(districtCode)) {
            wardsData.value = wardCache.get(districtCode)!
          } else {
            const wards = await getWardsByDistrictCode(districtCode)
            if (wards) {
              const wardList = wards as AddressResponse[]
              wardCache.set(districtCode, wardList)
              wardsData.value = wardList
            }
          }
        })(),
      )
    }

    await Promise.all(promises)
  } catch (error) {
    console.error('Error setting form data:', error)
  } finally {
    isSettingFormData.value = false
  }
}

watch(
  () => props.data,
  (newData) => {
    if (newData) setFormData(newData)
  },
  { immediate: true },
)

let throttleTimer: ReturnType<typeof setTimeout> | null = null
watch(
  formRef,
  (value) => {
    if (throttleTimer) return

    throttleTimer = setTimeout(() => {
      emit('address-change', value)
      throttleTimer = null
    }, 100)
  },
  { deep: true },
)

defineOptions({ name: 'AddressComponent' })

defineExpose({
  formRef,
  setFormData,
})
</script>
