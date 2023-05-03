import { ActionType } from '@/services/ant-design-pro/enums'
import { addStandardInfos, updateStandardInfo } from '@/services/ant-design-pro/standardLib'
import { API } from '@/services/ant-design-pro/typings'
import { useModel } from '@umijs/max'
import { Input, Modal, Form, Button } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type QAModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  setTableReFresh: () => void
  QAInfo?: API.QAFormInfo
  modalType?: 'add' | 'edit'
}

const QAModal = (props: QAModalProps) => {
  const { visible, setVisible, QAInfo, modalType = 'add', setTableReFresh } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  useEffect(() => {
    if (QAInfo) {
      form.setFieldsValue(QAInfo)
    }
  }, [QAInfo])

  const handleCancel = () => {
    form.setFieldsValue([])
    setVisible(false)
  }

  const handleFinished = async (values: API.QAFormInfo) => {
    console.log('values', values)
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

  return (
    <Modal
      title={modalType === 'add' ? '新增问答' : '编辑问答'}
      open={visible}
      footer={null}
      destroyOnClose
      onCancel={() => handleCancel()}
    >
      {visible ? (
        <Form form={form} initialValues={QAInfo || undefined} layout="vertical" onFinish={handleFinished}>
          {/* 问题关键词：设置问题的触发关键词，上限3个 ，以逗号隔开 */}
          <Form.Item
            label="问题关键词"
            name="prompt"
            rules={[
              {
                required: true,
                message: '设置问题的触发关键词，上限3个，以中文逗号隔开',
              },
              {
                validator: (_, value) => {
                  if(value.includes(",")){
                    return Promise.reject('请以中文逗号隔开')
                  }
                  const keywords = value
                    .split('，')
                    .map((kw: string) => kw.trim())
                  if (keywords.length > 3) {
                    return Promise.reject('触发关键词不能超过三个，句末不要标点符号')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input placeholder="设置问题的触发关键词，上限3个，以逗号隔开" />
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
      ) : null}
    </Modal>
  )
}

export default QAModal
