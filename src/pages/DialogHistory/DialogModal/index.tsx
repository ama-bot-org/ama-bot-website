import { LogInfoTableRow } from '@/services/web-api/models/logInfo'
import { Modal, Form } from 'antd'
import { Dispatch, SetStateAction } from 'react'

type DialogModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  // setTableReFresh: () => void
  dialogInfo?: LogInfoTableRow
  // modalType?: 'add' | 'edit' | 'preview'
}

const NotionModal = (props: DialogModalProps) => {
  const { visible, setVisible, dialogInfo } = props
  const [form] = Form.useForm()
  // const [loading, setLoading] = useState(false)
  // const { initialState } = useModel('@@initialState')
  // const { currentUser } = initialState || {}

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  // const handleFinished = async (values: LogInfoTableRow) => {
  //   setLoading(true)
  //   if (currentUser?.bot_id && values.token && values.pagelink && values.doc_name) {
  //     try {
  //       let res: any
  //       let params = {
  //         bot_id: currentUser.bot_id,
  //         token: values.token,
  //         pagelink: values.pagelink,
  //         doc_name: values.doc_name,
  //         subPage: false,
  //       }
  //       if (typeof values.subPage === 'boolean') {
  //         Object.assign(params, { subPage: values.subPage })
  //       }
  //       res = await corpus.createNotion(params)

  //       if (res.ActionType === ActionType.OK) {
  //         setTableReFresh()
  //         form.setFieldsValue([])
  //         setVisible(false)
  //       }
  //       else{
  //         message.error(res?.message || '新增 Notion 语料源失败')
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // }

  const modalTitle = {
    // add: '新增 Notion 语料源',
    // edit: '编辑 Notion 语料源',
    preview: 'Notion 语料源预览',
  }

  return (
    <Modal title={modalTitle['preview']} open={visible} footer={null} destroyOnClose onCancel={() => handleCancel()}>
      <div className="w-full relative overflow-hidden" style={{ height: 'auto', maxHeight: '600px' }}>
        <img
          src="/images/back_circle.svg"
          alt="back_circle"
          style={{
            position: 'absolute',
            zIndex: 0,
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            opacity: 0.2,
          }}
        />
        <div
          style={{
            maxHeight: '600px',
            overflowY: 'auto',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <p className="p-10 m-4 bg-white rounded-lg float-left relative" style={{ zIndex: 1, width: '60%' }}>
            {dialogInfo?.question}
          </p>
          <p className="p-10 m-4 bg-white rounded-lg float-right relative" style={{ zIndex: 1, width: '60%' }}>
            {dialogInfo?.answer}
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default NotionModal
