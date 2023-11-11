import { ActionType } from '@/constants/enums'
import { AddStandardWithLogResponse, QAFormInfo } from '@/services/web-api/models/standardLib'
import { AddCUserModifiedInfoResponse } from '@/services/web-api/models/toBeCheckedLogs'
import standardLibAPI from '@/services/web-api/standardLib'
import toBeCheckedLogsAPI from '@/services/web-api/toBeCheckedLogs'
import { useModel } from '@umijs/max'
import { Button, Form, Input, message, Modal } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type QAModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  okCallback?: () => void
  QAInfo?: QAFormInfo
  log_id: number
  bot_id?: string
  uuid?: string
  isRemodify?: boolean
}

const QAModal = (props: QAModalProps) => {
  const { visible, setVisible, QAInfo, okCallback, log_id, bot_id, uuid, isRemodify } = props
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
    const handleNext = (res: AddCUserModifiedInfoResponse | AddStandardWithLogResponse) => {
      if (res.ActionType === ActionType.OK) {
        form.resetFields()
        okCallback?.()
        setVisible(false)
      } else {
        message.error(res?.message || '保存失败')
      }
    }
    setLoading(true)
    try {
      let result
      // CUser
      if (uuid) {
        result = await toBeCheckedLogsAPI.addCUserModifiedInfo({
          ...values,
          modified_answer: values.modified_answer || '',
          bot_id: (currentUser?.bot_id || bot_id)!,
          log_id,
        })
        handleNext(result)
      }
      // 管理员
      else if (bot_id || currentUser?.bot_id) {
        result = await standardLibAPI.addStandardWithLog({
          ...values,
          completion: isRemodify && values.modified_answer ? values.modified_answer : values.completion,
          bot_id: (currentUser?.bot_id || bot_id)!,
          log_id,
        })
        handleNext(result)
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
      title={isRemodify ? '重新修正' : '新增问答'}
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
        {/* 原回答 */}
        <Form.Item label="原回答" name="completion">
          <Input.TextArea disabled autoSize />
        </Form.Item>
        {/* 回答 */}
        <Form.Item
          label="回答"
          name="modified_answer"
          rules={[
            {
              required: true,
              message: '请输入修正后的回答',
            },
          ]}
        >
          <Input.TextArea rows={10} placeholder="请输入修正后的回答" />
        </Form.Item>
        <Form.Item>
          <div className="frc-end">
            <Button onClick={() => handleCancel()} style={{ marginRight: '20px' }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isRemodify ? '保存并采纳' : '保存'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default QAModal
