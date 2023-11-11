import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import QAModal from '@/components/QAModal'
import ModifiedInfoTable, { OperateType } from './ModifiedInfoTable'
import { ActionType } from '@/constants/enums'
import { ToBeCheckedLogInfoTableRow } from '@/services/web-api/models/toBeCheckedLogs'
import useModifiedInfo from '@/hooks/useModifiedInfo.hook'
import toBeCheckedLogs from '@/services/web-api/toBeCheckedLogs'
import standardLibAPI from '@/services/web-api/standardLib'

interface ToBeProcessedTabProps {
  onUpdate: (total: number) => void
}

const ToBeProcessedTab: React.FC<ToBeProcessedTabProps> = ({ onUpdate }: ToBeProcessedTabProps) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const { total, data, page, pageSize, loading, setCurrentPage, getToBeCheckedLogsTable } = useModifiedInfo()
  const [currentRow, setCurrentRow] = useState<ToBeCheckedLogInfoTableRow | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const [operateLoading, setOperateLoading] = useState<OperateType>(OperateType.undefined)
  const [operateRowId, setOperateRowId] = useState<number | undefined>()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }
  })

  const handleEditRow = (record: ToBeCheckedLogInfoTableRow) => {
    setCurrentRow(record)
    setModalVisible(true)
  }

  const handleDeleteRow = async (record: ToBeCheckedLogInfoTableRow) => {
    if (currentUser?.bot_id) {
      setOperateLoading(OperateType.delete)
      setOperateRowId(record.id)
      try {
        const res = await toBeCheckedLogs.deleteModifiedInfo({
          bot_id: currentUser.bot_id,
          log_id: record.id!,
        })
        if (res.ActionType === ActionType.OK) {
          await getToBeCheckedLogsTable()
          onUpdate(total - 1 > 0 ? total - 1 : 0)
        } else {
          message.error(res?.message || '删除失败')
        }
      } finally {
        setOperateLoading(OperateType.undefined)
        setOperateRowId(undefined)
      }
    } else {
      message.error('获取机器人ID失败')
    }
  }

  const handlePageChange = (_page: number) => {
    setCurrentPage(_page)
    getToBeCheckedLogsTable(_page)
  }

  const handleAccept = async (rowData: ToBeCheckedLogInfoTableRow, logId?: number) => {
    setOperateLoading(OperateType.accept)
    try {
      if (currentUser?.bot_id) {
        const res = await standardLibAPI.addStandardWithLog({
          ...rowData,
          completion: rowData.modified_answer,
          bot_id: currentUser?.bot_id,
          log_id: logId || rowData.id,
        })
        if (res.ActionType === ActionType.OK) {
          await handleDeleteRow(rowData)
          await getToBeCheckedLogsTable()
        } else {
          message.error(res?.message || '采纳失败')
        }
      } else {
        message.error('请登录后再重试')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setOperateLoading(OperateType.undefined)
    }
  }

  const handleCallback = async () => {
    if (currentRow) {
      await handleDeleteRow(currentRow)
    }
    getToBeCheckedLogsTable()
  }

  useEffect(() => {
    getToBeCheckedLogsTable(1)
  }, [])

  return (
    <div className={containerClassName}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <ModifiedInfoTable
          pageSize={pageSize}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          loading={loading}
          operateLoading={operateLoading}
          operateRowId={operateRowId}
          data={data}
          onAcceptRow={handleAccept}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          refreshTable={() => handlePageChange(page)}
        />
        {currentRow && (
          <QAModal
            visible={modalVisible}
            setVisible={setModalVisible}
            QAInfo={currentRow}
            okCallback={handleCallback}
            log_id={currentRow?.id}
            isRemodify
          />
        )}
      </div>
    </div>
  )
}

export default ToBeProcessedTab
