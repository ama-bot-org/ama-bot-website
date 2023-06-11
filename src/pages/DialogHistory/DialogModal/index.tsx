import { LogInfoAPI } from '@/services/ant-design-pro/logInfoAPI'
import { Modal, Form } from 'antd'
import { Dispatch, SetStateAction } from 'react'

type DialogModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  // setTableReFresh: () => void
  dialogInfo?: LogInfoAPI.LogInfoTableRow
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

  // const handleFinished = async (values: LogInfoAPI.LogInfoTableRow) => {
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
      <p className="p-10 my-4 bg-white rounded-lg float-left">{dialogInfo?.question}</p>
      <p className="p-10 my-4 bg-white rounded-lg float-right">{dialogInfo?.answer}</p>
    </Modal>
  )
}

export default NotionModal
