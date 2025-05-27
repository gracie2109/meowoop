import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import dayjs from 'dayjs'
import type { TimeType } from '@/types/lib'
import {
  defaultWidget,
  widgetData1,
  widgetData2,
  widgetData3,
} from '@/views/Dashboard/contants/data'
import { createData, deleteData, searchDataList } from '@/services/dashboard.service'
import type { TDashboard, TDashboardForm } from '@/types/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  const loading = ref(false)
  const totalDashboard = ref(0)
  const editMode = ref(false)
  const timeFilter = ref({
    from_time: dayjs().subtract(1, 'day'),
    to_time: dayjs(),
  })
  const currentDashboard = ref<string | null>(null)
  const currentWidget = ref<unknown>([])

  const dashboardList = ref<unknown>([])

  function toggleEditMode(bool:boolean) {
    editMode.value = bool
  }

  function setTimeFilter(from: TimeType, to: TimeType) {
    Object.assign(timeFilter.value, {
      from_time: from,
      to_time: to,
    })
  }

  function setCurrentDashboard(val: SelectValue) {
    currentDashboard.value = val as string
    switch (val) {
      case '1':
        currentWidget.value = widgetData1
        break
      case '2':
        currentWidget.value = widgetData2
        break
      case '3':
        currentWidget.value = widgetData3
        break
      default:
        currentWidget.value = defaultWidget
    }
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
      totalDashboard.value = res.totalRecord;
      
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
    toggleEditMode,
    setTimeFilter,
    setCurrentDashboard,
    createDashboard,
    searchList,
    deleteDashboard,
  }
})
