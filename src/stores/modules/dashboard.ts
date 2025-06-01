import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import dayjs from 'dayjs'
import type { TimeType } from '@/types/lib'

import { createData, deleteData, searchDataList } from '@/services/dashboard.service'
import type { TDashboard, TDashboardForm } from '@/types/dashboard'
import { getLocal, setLocal } from '@/utils/utilsLocal'

export const useDashboardStore = defineStore('dashboard', () => {
  const loading = ref(false)
  const totalDashboard = ref(0)
  const editMode = ref(false)
  const showDrawer = ref(false)

  const timeFilter = ref({
    from_time: dayjs().subtract(1, 'day'),
    to_time: dayjs(),
  });
  
  const currentDashboard = ref<string | null>(getLocal('COOKIE', 'current_dashboard') ?? null)
  const currentWidget = ref<unknown>([])

  const dashboardList = ref<unknown>([])

  function toggleEditMode(bool: boolean) {
    editMode.value = bool
  }
 function toggleshowDrawer() {
    showDrawer.value = !showDrawer.value;
  
  }
  function setTimeFilter(from: TimeType, to: TimeType) {
    Object.assign(timeFilter.value, {
      from_time: from,
      to_time: to,
    })
  }

  function setCurrentDashboard(val: SelectValue) {
    currentDashboard.value = val as string;
    setLocal('COOKIE', 'current_dashboard', val)
  }

  async function createDashboard(
    data: TDashboardForm,
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      const result = await createData(data)
        .then((vl: unknown) => {
          if (callback) callback(vl)
        })
        .catch((err) => {
          if (callbackErr) callbackErr(err)
        })
      if (callback) callback(result)
    } catch (error) {
      console.error('Error fecth dashboard:', error)
      if (callbackErr) callbackErr(error)
    } finally {
      loading.value = false
    }
  }

  async function searchList(payload: unknown) {
    try {
      loading.value = true
      const res = (await searchDataList(payload)) as {
        success: boolean
        totalRecord: number
        data: { data: TDashboard[] }
      }

      const data = res.data?.data as TDashboard[]

      dashboardList.value = data
      totalDashboard.value = res.totalRecord
    } catch (err) {
      loading.value = false

      console.log('err', err)
    } finally {
      loading.value = false
    }
  }

  async function deleteDashboard(
    ids: string | string[],
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      const result = await deleteData(ids)
      if (callback) callback(result)
    } catch (error) {
      console.error('Error updating pet type:', error)
      if (callbackErr) callbackErr(error)
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    editMode,
    timeFilter,
    dashboardList,
    currentDashboard,
    currentWidget,
    totalDashboard,
    showDrawer,
    toggleshowDrawer,
    toggleEditMode,
    setTimeFilter,
    setCurrentDashboard,
    createDashboard,
    searchList,
    deleteDashboard,
  }
})
