import toBeCheckedLogs from '@/services/web-api/toBeCheckedLogs'
import { ActionType } from '@/constants/enums'
import { message } from 'antd'
import { useState } from 'react'
import { useModel } from '@umijs/max'
import { ToBeCheckedLogInfoTableRow } from '@/services/web-api/models/toBeCheckedLogs'

export default function useModifiedInfo() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<ToBeCheckedLogInfoTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [pageSize] = useState(40)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getToBeCheckedLogsTotal = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await toBeCheckedLogs.getCUserModifiedInfoTable({
          bot_id: currentUser.bot_id,
          page: 1,
          pageSize: 1,
          uuid: currentUser.bot_id,
        })
        if (res.ActionType === ActionType.OK) {
          setTotal(res.data.count)
          setLoading(false)
        } else {
          message.error(res?.message || '获取待处理记录失败')
          setLoading(false)
        }
      } catch (error) {
        message.error('获取待处理记录失败')
        setLoading(false)
      }
    }
  }

  const transferTableData = (rows: ToBeCheckedLogInfoTableRow[]) => {
    let dialogs: { type: string; content: string; fixInfo?: number }[] = []
    rows.forEach(row => {
      dialogs.push({
        type: 'prompt',
        content: row.prompt,
      })
      dialogs.push({
        type: 'answer',
        fixInfo: row.fix_info,
        content: row.modified_answer,
      })
    })
    return dialogs
  }

  const getToBeCheckedLogsTable = async (_page: number = 1) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await toBeCheckedLogs.getCUserModifiedInfoTable({
          bot_id: currentUser.bot_id,
          page: _page,
          pageSize,
          uuid: currentUser.bot_id,
        })
        if (res.ActionType === ActionType.OK) {
          const sortedData = res.data.content.sort((a, b) => new Date(a.create_date).getTime() - new Date(b.create_date).getTime())
          sortedData.concat(data)
          setData(sortedData)
          setTotal(res.data.count)
          setLoading(false)
          return transferTableData(sortedData)
        } else {
          message.error(res?.message || '获取对话历史记录失败')
          setLoading(false)
          return transferTableData(data)
        }
      } catch (error) {
        message.error('获取对话历史记录失败')
        setLoading(false)
        return transferTableData(data)
      }
    } else {
      return transferTableData(data)
    }
  }

  const getPreviousDialogs = async (_total: number) => {
    if (_total <= page * pageSize) {
      return
    }
    console.log('hook.page', page)
    setPage(page + 1)
    const rows = await getToBeCheckedLogsTable(page + 1)
    return { datas: rows, currentPage: page + 1 }
  }

  const setCurrentPage = (_page: number) => {
    setPage(_page)
  }

  return {
    total,
    data,
    page,
    pageSize,
    loading,
    setTotal,
    setCurrentPage,
    getToBeCheckedLogsTotal,
    getToBeCheckedLogsTable,
    getPreviousDialogs,
  }
}
