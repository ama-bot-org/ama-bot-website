import corpus from '@/services/ant-design-pro/corpus'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import { ActionType } from '@/services/ant-design-pro/enums'
import { useModel } from '@umijs/max'
import { Input, Modal, Form, Button, message } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'

type ThemeModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  setTableReFresh: Dispatch<React.SetStateAction<number>>
}

const ThemeModal = (props: ThemeModalProps) => {
  const { visible, setVisible, setTableReFresh } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const handleCancel = () => {
    form.setFieldsValue([])
    setVisible(false)
  }

  const handleFinished = async (values: CorpusAPI.FileInfo) => {
    console.log('values', values)
    setLoading(true)
    if (currentUser?.bot_id) {
      try {
        const res = await corpus.uploadCorpusByManual({
          bot_id: currentUser?.bot_id,
          type: 2,
          doc_name: values.doc_name,
          content: values.content,
        })
        if (res.ActionType === ActionType.OK) {
          setTableReFresh(new Date().getTime())
          form.setFieldsValue([])
          setVisible(false)
        } else {
          message.error('上传失败')
        }
      } catch (error) {
        message.error('上传失败')
      } finally {
        setLoading(false)
      }
    } else {
    }
  }

  return (
    <Modal title="新增主题" open={visible} footer={null} destroyOnClose onCancel={() => handleCancel()}>
      {visible ? (
        <Form form={form} layout="vertical" onFinish={handleFinished}>
          <Form.Item
            label="主题名称"
            name="doc_name"
            rules={[
              {
                required: true,
                message: '请输入主题名称',
              },
              {
                validator: (_, value) => {
                  if (/[`~!#$%^&*()_\-+=<>?:"{}|,，。？“”./;'\\[\]]/im.test(value)) {
                    return Promise.reject('不可以输入特殊字符')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input placeholder="请输入主题名称" />
          </Form.Item>
          {/* 回答 */}
          <Form.Item
            label="语料内容"
            name="content"
            rules={[
              {
                required: true,
                message: '请输入语料内容',
              },
            ]}
          >
            <Input.TextArea rows={10} placeholder="请输入语料内容" />
          </Form.Item>
          <Form.Item>
            <div className="frc-end">
              <Button onClick={() => handleCancel()} style={{ marginRight: '20px' }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                创建
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : null}
    </Modal>
  )
}

export default ThemeModal
