import { ActionType } from '@/constants/enums'
import { QAFormInfo } from '@/services/web-api/models/standardLib'
import { addStandardWithLog } from '@/services/web-api/standardLib'
import { useModel } from '@umijs/max'
import { Button, Form, Input, message, Modal } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type QAModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  okCallback?: () => void
  QAInfo?: QAFormInfo
  log_id: number
}

const QAModal = (props: QAModalProps) => {
  const { visible, setVisible, QAInfo, okCallback, log_id } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  useEffect(() => {
    if (QAInfo && visible) {
      form?.setFieldsValue(QAInfo)
    } else {
      form?.setFieldsValue({})
    }
  }, [visible, QAInfo])

  const handleCancel = () => {
    form.setFieldsValue({})
    setVisible(false)
  }

  const handleFinished = async (values: QAFormInfo) => {
    setLoading(true)
    try {
      if (currentUser?.bot_id) {
        const res = await addStandardWithLog({ ...values, bot_id: currentUser?.bot_id, log_id })
        if (res.ActionType === ActionType.OK) {
          form.resetFields()
          okCallback?.()
          setVisible(false)
        } else {
          message.error(res?.message || '保存失败')
        }
      } else {
        message.error('请登录后再重试')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={'新增问答'}
      open={visible}
      footer={null}
      destroyOnClose
      onCancel={() => {
        handleCancel()
      }}
    >
      <Form form={form} initialValues={QAInfo} layout="vertical" onFinish={handleFinished}>
        {/* 问题输入已经从关键词升级成句子：请输入问题 */}
        <Form.Item
          label="问题"
          name="prompt"
          rules={[
            {
              required: true,
              message: '请输入问题',
            },
          ]}
        >
          <Input placeholder="请输入问题" />
        </Form.Item>
        {/* 回答 */}
        <Form.Item
          label="回答"
          name="completion"
          rules={[
            {
              required: true,
              message: '请输入回答',
            },
          ]}
        >
          <Input.TextArea rows={10} placeholder="请输入回答" />
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
    </Modal>
  )
}

export default QAModal
