import { ActionType } from '@/constants/enums'
import ImgCrop from 'antd-img-crop'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined'
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useIntl, useModel, history } from '@umijs/max'
import userAPI from '@/services/web-api/register'
import Form, { RuleObject } from 'antd/es/form'
import Input from 'antd/es/input'
import Upload, { UploadFile, UploadChangeParam, RcFile } from 'antd/es/upload'
import Button from 'antd/es/button'
import type { UploadProps } from 'antd/es/upload'
import message from 'antd/es/message'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { v4 as uuidv4 } from 'uuid'
import BotAPI from '@/services/web-api/bot'
import { BotDataType } from '@/models/bot'
import { BotRequestType } from '@/services/web-api/models/bot'
import { Skeleton, Select, Switch } from 'antd'
import cls from 'classnames'

import styles from './style.less'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const MODEL_TYPE_OPTS = [
  { label: '默认模型（推荐）', value: 0 },
  { label: '文心一言', value: 1 },
  { label: 'ChatGLM', value: 2 },
]

const BaseInfoForm = ({ onSaved }: { onSaved: (botInfo: BotDataType) => void }) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const intl = useIntl()
  const [form] = useForm()
  const [botInfo, setBotInfo] = useState<BotDataType>({ model_type: 0 } as BotDataType)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [postImageUrl, setPostImageUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formLoading, setFormLoading] = useState<boolean>(false)
  const [isInit, setIsInit] = useState<boolean>(true)
  const [spread, setSpread] = useState<boolean>(false) // 是否展开高级配置
  const [cuserModifyChecked, setCuserModifyChecked] = useState<boolean>(false)

  const initForm = (botInfo: BotDataType) => {
    setBotInfo(botInfo)
    setPostImageUrl(botInfo.image_url)
    setImageUrl(botInfo.image_url)
    form.setFieldsValue(botInfo)
  }

  const initBotInfo = async (bot_id: string) => {
    setFormLoading(true)
    try {
      const res = await BotAPI.fetchBotInfo(bot_id)
      if (res?.ActionType === ActionType.OK) {
        const { name, image_url, welcomes, html_url, bgImg_url, contact, faq_contents, model_type, is_cuser_modify } = res
        const botInfo = {
          id: bot_id,
          name,
          image_url,
          bgImg_url,
          html_url,
          welcomes: welcomes ? JSON.parse(welcomes) : [],
          contact: contact ? JSON.parse(contact) : [],
          faq_contents: faq_contents ? JSON.parse(faq_contents) : [],
          is_cuser_modify: is_cuser_modify || 0,
          model_type,
        }
        setCuserModifyChecked(is_cuser_modify === 1)
        initForm(botInfo)
        onSaved(botInfo)
      }
    } finally {
      setFormLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser?.bot_id) {
      initBotInfo(currentUser?.bot_id)
    }
    return () => {
      form.resetFields()
    }
  }, [currentUser])

  const onFinish = async (values: BotDataType) => {
    if (isInit) {
      setIsInit(false)
      return
    }
    if (currentUser?.phone && currentUser?.bot_id) {
      const updateParams: BotRequestType = {
        ...values,
        welcomes: values.welcomes ? JSON.stringify(values.welcomes) : '[]',
        contact: JSON.stringify(values.contact),
        faq_contents: JSON.stringify(values.faq_contents),
        is_cuser_modify: cuserModifyChecked ? 1 : 0,
        email: currentUser?.email,
        phone: currentUser?.phone,
        bot_id: currentUser?.bot_id,
      }
      const result = await BotAPI.updateBotInfo(updateParams)
      if (result.ActionType === ActionType.OK) {
        message.success('保存成功')
        onSaved({ ...values, welcomes: values.welcomes || [] })
      }
    } else {
      message.error('请先登录')
      history.push('/login')
    }
  }

  const uploadButton = (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '8px',
        border: '1px dashed #d9d9d9',
      }}
      className="frc-center"
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        <img
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/upload.png"
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        />
      )}
    </div>
  )

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只支持上传 JPEG/PNG 文件')
    }
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      message.error('图片必须小于 1MB!')
    }
    return isJpgOrPng && isLt1M
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
    }
  }

  const validIsUnique = async (rules: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(
        new Error(
          intl.formatMessage({
            id: 'register.name.required',
          }),
        ),
      )
    }
    const reg = /[^\u4E00-\u9FA5A-Za-z0-9_]/
    if (reg.test(value)) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.name.wrong-format' })))
    }
    if (value.length > 30 || value.length < 2) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.name.wrong-length' })))
    }
    return Promise.resolve()
  }

  const handleUpload = async (options: any) => {
    const { fileContent, filename, onError, onSuccess } = options

    try {
      const res = await userAPI.uploadImage({
        file_name: `${form.getFieldValue('name') || uuidv4()}-${filename}`,
        file: fileContent,
      })
      if (res.ActionType === ActionType.OK) {
        setPostImageUrl(res.image_url)
        setImageUrl(res.image_url)
        form.setFieldValue('image_url', res.image_url)
        onSuccess('上传成功')
      } else {
        onError(new Error(res?.message || '上传失败'))
      }
    } catch (error) {
      onError(new Error('上传失败'))
    }
  }

  const validateImage = () => {
    if (!postImageUrl || postImageUrl.length === 0) {
      return Promise.reject(new Error('请上传客服头像'))
    }
    return Promise.resolve()
  }

  const handleCustomRequest = async ({ file, onSuccess, onError }: any) => {
    await handleUpload({ fileContent: file, filename: file.name, onError, onSuccess })
  }

  useEffect(() => {
    if (postImageUrl) {
      const button = document.getElementById('myButton')
      button?.click()
    }
  }, [postImageUrl])

  const handleSwitchChange = (checked: boolean) => {
    setCuserModifyChecked(checked)
  }

  return formLoading ? (
    <Skeleton
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#ffffff96',
        padding: '24px',
      }}
    />
  ) : (
    <Form
      onFinish={onFinish}
      initialValues={botInfo}
      form={form}
      layout="vertical"
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#ffffff96',
      }}
    >
      <Form.Item
        name="name"
        label={intl.formatMessage({ id: 'register.name.register' })}
        rules={[{ required: true, message: '' }, { validator: (rule, value) => validIsUnique(rule, value) }]}
      >
        <Input placeholder="请输入 AI 客服昵称" style={{ maxWidth: 320 }} />
      </Form.Item>
      <div className="flex flex-wrap">
        <Form.Item
          name="image_url"
          label={intl.formatMessage({ id: 'register.logo' })}
          valuePropName="fileList"
          getValueFromEvent={event => event.fileList}
          rules={[{ validator: validateImage }, { required: true }]}
          style={{ width: 98 }}
        >
          <ImgCrop modalClassName="cursor-pointer" fillColor="rgba(0, 0, 0, 0)" aspect={1} cropShape="round">
            <Upload
              name="image"
              listType="picture"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/app/user/image"
              customRequest={handleCustomRequest}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" className="rounded-full" style={{ width: '64px' }} /> : uploadButton}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <div
          style={{
            marginTop: '45px',
            marginLeft: '0px',
          }}
        >
          <div className="text-left">支持.png .jpeg，</div>
          <div className="text-left">不超过1M</div>
        </div>
      </div>
      <Form.List name="welcomes">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item {...formItemLayout} label={index === 0 ? '欢迎语' : ''} required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入欢迎语或者删除此输入框',
                    },
                  ]}
                  noStyle
                >
                  <Input.TextArea rows={3} placeholder="Hi 你好，请问有什么可以帮您？" />
                </Form.Item>
                {fields.length > 0 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                disabled={fields.length === 3}
                type="dashed"
                onClick={() => {
                  if (fields.length === 3) {
                    return
                  }
                  add()
                }}
                style={{ maxWidth: 320, width: '100%' }}
                icon={<PlusOutlined />}
              >
                添加欢迎语
              </Button>
              {fields.length === 3 && <div style={{ color: '#e65c41', fontSize: 12 }}>最多添加3条欢迎语</div>}
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item name="is_cuser_modify" label="回答修正">
        <div className="frc-start">
          <div className="mr-26 text-#131415 opacity-0.6">
            <p className="mb-0">关闭时，仅在后台可修正，管理员提交的修正结果将无需审核；</p>
            <p className="mt-0 mb-0">
              打开后，在H5、网站、微信公众号这些平台，所有人和AI对话时都可修正，用户提供的修正内容将会被记录到【标准问答库-待处理】内，等待管理员的审核和确认。
            </p>
          </div>
          <Switch checked={cuserModifyChecked} onChange={handleSwitchChange} />
        </div>
      </Form.Item>
      <div className={cls(styles.advance_config, { [styles.spread]: spread })}>
        <div
          className={cls(styles.title, 'frc-start')}
          onClick={() => {
            setSpread(!spread)
          }}
        >
          <CaretRightOutlined className={cls(styles.arrow)} />
          <span>高级配置</span>
        </div>
        <div className={styles.content}>
          <Form.Item label="模型选择" name="model_type" required rules={[{ required: true, message: '请选择模型类型' }]}>
            <Select options={MODEL_TYPE_OPTS} style={{ maxWidth: 300 }} />
          </Form.Item>
        </div>
      </div>
      <Form.Item style={{ textAlign: 'left' }}>
        <Button type="primary" htmlType="submit" id="myButton">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BaseInfoForm
