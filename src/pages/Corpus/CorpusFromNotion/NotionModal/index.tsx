import corpus from '@/services/ant-design-pro/corpus'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import { ActionType } from '@/services/ant-design-pro/enums'
import { useModel } from '@umijs/max'
import { Input, Modal, Form, Button, Checkbox } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type NotionModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  setTableReFresh: () => void
  notionInfo?: CorpusAPI.NotionTableRow
  modalType?: 'add' | 'edit' | 'preview'
}

const NotionModal = (props: NotionModalProps) => {
  const { visible, setVisible, notionInfo, modalType = 'add', setTableReFresh } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const [subPage, setSubPage] = useState(false) // 是否允许子页面，默认为false
  const { currentUser } = initialState || {}

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  const handleFinished = async (values: CorpusAPI.NotionTableRow) => {
    setLoading(true)
    if (currentUser?.bot_id && values.token && values.pagelink && values.doc_name) {
      try {
        let res: any
        let params = {
          bot_id: currentUser.bot_id,
          token: values.token,
          pagelink: values.pagelink,
          doc_name: values.doc_name,
          subPage: subPage || false,
        }
        res = await corpus.createNotion(params)

        if (res.ActionType === ActionType.OK) {
          setTableReFresh()
          form.setFieldsValue([])
          setVisible(false)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const modalTitle = {
    add: '新增 Notion 语料源',
    edit: '编辑 Notion 语料源',
    preview: 'Notion 语料源预览',
  }

  useEffect(() => {
    if (modalType === 'add') {
      form.resetFields()
    }
  }, [modalType])

  const handleChange = (e: any) => {
    setSubPage(e.target.checked)
  }

  return (
    <Modal title={modalTitle[modalType]} open={visible} footer={null} destroyOnClose onCancel={() => handleCancel()}>
      <div style={visible && modalType === 'add' ? {} : { display: 'none' }}>
        <Form form={form} layout="vertical" onFinish={handleFinished}>
          <Form.Item
            label={
              <div>
                <span>Notion token</span>
                <a
                  style={{ color: '#e74c3c', fontSize: 12, marginLeft: 20, cursor: 'pointer' }}
                  href="https://free-be.notion.site/Notion-token-9f792dfa9fec4ab288441d2b58e1549e"
                  target="_blank"
                  rel="noreferrer"
                >
                  如何获取 Notion token？
                </a>
              </div>
            }
            name="token"
            rules={[
              {
                required: true,
                message: '请输入 Notion token',
              },
            ]}
          >
            <Input placeholder="请输入 Notion token" />
          </Form.Item>
          <Form.Item
            label="自定义文档标题"
            name="doc_name"
            rules={[
              {
                required: true,
                message: '请输入文档标题',
              },
            ]}
          >
            <Input placeholder="请输入文档标题" />
          </Form.Item>
          <Form.Item
            label="Notion 文档链接"
            name="pagelink"
            rules={[
              {
                required: true,
                message: '请输入 Notion 文档链接',
              },
            ]}
          >
            <Input placeholder="请输入 Notion 文档链接" />
          </Form.Item>
          <Form.Item
            label="是否获取子链接"
            name="subPage"
            rules={[
              {
                required: false, // 选填
              },
            ]}
          >
            <Checkbox onChange={handleChange}>
              <span style={{ marginLeft: 10 }}>勾选代表同意获取子链接内容</span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <div className="frc-end">
              <Button onClick={() => handleCancel()} style={{ marginRight: '20px' }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {visible && modalType === 'preview' ? <p style={{ whiteSpace: 'pre-wrap' }}>{notionInfo?.content}</p> : null}
    </Modal>
  )
}

export default NotionModal
