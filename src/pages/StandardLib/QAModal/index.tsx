import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ActionType } from '@/constants/enums'
import { QAFormInfo } from '@/services/web-api/models/standardLib'
import { addStandardInfos, updateStandardInfo } from '@/services/web-api/standardLib'
import { useModel } from '@umijs/max'
import { Input, Modal, Form, Button, message } from 'antd'

type QAModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  okCallback?: () => void
  QAInfo?: QAFormInfo
  modalType?: 'add' | 'edit'
}

const QAModal = (props: QAModalProps) => {
  const { visible, setVisible, QAInfo, modalType = 'add', okCallback } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  useEffect(() => {
    if (QAInfo && visible) {
      form.setFieldsValue(QAInfo)
    } else {
      form.setFieldsValue({})
    }
  }, [visible, QAInfo])

  const handleCancel = () => {
    form.setFieldsValue({})
    setVisible(false)
  }

  const handleFinished = async (values: QAFormInfo) => {
    setLoading(true)
    try {
      let res: any
      if (modalType === 'add' && currentUser?.bot_id) {
        res = await addStandardInfos([{ ...values, bot_id: currentUser?.bot_id }])
      } else {
        res = await updateStandardInfo({ ...values, bot_id: currentUser?.bot_id, id: QAInfo?.id })
        console.log('editStandardTableInfo', res)
      }
      if (res.ActionType === ActionType.OK) {
        form.resetFields()
        okCallback?.()
        setVisible(false)
      } else {
        message.error(res?.message || '保存失败')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={modalType === 'add' ? '新增问答' : '编辑问答'}
      open={visible}
      footer={null}
      destroyOnClose
      onCancel={() => {
        handleCancel()
      }}
    >
      <Form
        form={modalType === 'add' ? undefined : form}
        initialValues={modalType === 'edit' ? QAInfo : undefined}
        layout="vertical"
        onFinish={handleFinished}
      >
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
