import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { message } from 'antd'
// import Input from 'antd/es/input'
import DialogModal from './DialogModal'
import DialogHistoryTable from './DialogHistoryTable'
import { LogInfoAPI } from '@/services/ant-design-pro/logInfoAPI'
import { ActionType } from '@/services/ant-design-pro/enums'
import logInfo from '@/services/ant-design-pro/logInfo'

const DialogHistory: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<LogInfoAPI.LogInfoTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  const [currentRow, setCurrentRow] = useState<LogInfoAPI.LogInfoTableRow | undefined>()
  const [modalVisible, setModalVisible] = useState(false)

  const initNotionTable = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await logInfo.getHistoryTable({
          bot_id: currentUser.bot_id,
          // searchWord: searchValue,
          page,
          pageSize,
        })
        if (res.ActionType === ActionType.OK) {
          setData(res.data.content)
          setTotal(res.data.count)
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

  const handlePreviewRow = (record: LogInfoAPI.LogInfoTableRow) => {
    setCurrentRow(record)
    setModalVisible(true)
  }

  // const handleDeleteRow = async (record: LogInfoAPI.LogInfoTableRow) => {
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
    initNotionTable()
  }, [page, searchValue])

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
