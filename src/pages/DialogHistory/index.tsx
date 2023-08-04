import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { message } from 'antd'
// import Input from 'antd/es/input'
import DialogModal from './DialogModal'
import DialogHistoryTable from './DialogHistoryTable'
import { ActionType } from '@/constants/enums'
import logInfo from '@/services/web-api/logInfo'
import { LogInfoTableRow } from '@/services/web-api/models/logInfo'

const DialogHistory: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<LogInfoTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  const [currentRow, setCurrentRow] = useState<LogInfoTableRow | undefined>()
  const [modalVisible, setModalVisible] = useState(false)

  const initDialogHistoryTable = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await logInfo.getHistoryTable({
          bot_id: currentUser.bot_id,
          page,
          pageSize,
        })
        if (res.ActionType === ActionType.OK) {
          setData(res.data.content)
          setTotal(res.data.count)
        } else {
          message.error(res?.message || '获取对话历史记录失败')
        }
      } catch (error) {
        message.error('获取对话历史记录失败')
      } finally {
        setLoading(false)
      }
    } else {
      message.error('获取机器人ID失败')
    }
  }

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }
  })

  const handlePreviewRow = (record: LogInfoTableRow) => {
    setCurrentRow(record)
    setModalVisible(true)
  }

  // const handleDeleteRow = async (record: LogInfoTableRow) => {
  //   if (currentUser?.bot_id) {
  //     setLoading(true)
  //     try {
  //       const res = await logInfo.deleteNotion({
  //         bot_id: currentUser.bot_id,
  //         id: record.id!,
  //       })
  //       if (res.ActionType === ActionType.OK) {
  //         await initNotionTable()
  //       }
  //      else {
  //         message.error(res?.message || '删除 Notion 语料表失败')
  //      }
  //     } finally {
  //       setLoading(false)
  //     }
  //   } else {
  //     message.error('获取机器人ID失败')
  //   }
  // }

  const handlePageChange = (_page: number) => {
    setPage(_page)
  }

  // const handleSearch = (value: string) => {
  //   setSearchValue(value)
  // }

  useEffect(() => {
    initDialogHistoryTable()
  }, [page, pageSize])

  return (
    <div className={containerClassName}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <DialogHistoryTable
          pageSize={pageSize}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          loading={loading}
          data={data}
          onPreviewRow={handlePreviewRow}
          // onEditRow={handleEditRow}
          // onDeleteRow={handleDeleteRow}
        />
        <DialogModal visible={modalVisible} setVisible={setModalVisible} dialogInfo={currentRow} />
      </div>
    </div>
  )
}

export default DialogHistory
