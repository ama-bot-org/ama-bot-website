import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { message, Form, Select } from 'antd'
// import Input from 'antd/es/input'
import DialogModal from './DialogModal'
import DialogHistoryTable from './DialogHistoryTable'
import { ActionType } from '@/constants/enums'
import logInfo from '@/services/web-api/logInfo'
import { LogInfoTableRow } from '@/services/web-api/models/logInfo'
import { ReactComponent as LikeIcon } from '@/components/EvaluateBtn/icons/like.svg'
import { ReactComponent as UnlikeIcon } from '@/components/EvaluateBtn/icons/unlike.svg'

const { useForm } = Form
const commentTypeOpts = [
  { label: '全部', value: 0 },
  { label: '暂无答案', value: 3 },
  { label: <div className='frc-start'><LikeIcon/><span className='ml-8'>答得不错</span></div>, value: 1 },
  { label: <div className='frc-start'><UnlikeIcon/><span className='ml-8'>差点意思</span></div>, value: 2 },
]

const DialogHistory: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [form] = useForm()

  const [data, setData] = useState<LogInfoTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  const [currentRow, setCurrentRow] = useState<LogInfoTableRow | undefined>()
  const [modalVisible, setModalVisible] = useState(false)

  const initDialogHistoryTable = async (page: number = 1) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const values = form.getFieldsValue()
        const res = await logInfo.getHistoryTable({
          bot_id: currentUser.bot_id,
          page,
          pageSize,
          ...values
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
    initDialogHistoryTable(_page)
  }

  // const handleSearch = (value: string) => {
  //   setSearchValue(value)
  // }

  const onValuesChange = () => {
    setPage(1)
    initDialogHistoryTable(1)
  }

  useEffect(()=>{
    initDialogHistoryTable(1)
  },[])

  return (
    <div className={containerClassName}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Form 
          form={form} 
          layout="inline" 
          initialValues={{
            comment_type: 0
          }}
          className='mb-16'
          onValuesChange={onValuesChange}
        >
          <Form.Item name="comment_type" label='筛选回答'>
            <Select options={commentTypeOpts} style={{width: 180}}/>
          </Form.Item>
        </Form>
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
          refreshTable={() => handlePageChange(page)}
        />
        <DialogModal visible={modalVisible} setVisible={setModalVisible} dialogInfo={currentRow} />
      </div>
    </div>
  )
}

export default DialogHistory
