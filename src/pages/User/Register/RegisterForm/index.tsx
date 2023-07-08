import { checkAIDomainUnique } from '@/services/ant-design-pro/register'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import CloudUploadOutlined from '@ant-design/icons/CloudUploadOutlined'
import { useIntl } from '@umijs/max'
import Form, { RuleObject } from 'antd/es/form'
import Input from 'antd/es/input'
import Upload, { UploadFile, UploadChangeParam, RcFile } from 'antd/es/upload'
import Button from 'antd/es/button'
import ConfigProvider from 'antd/es/config-provider'
import type { UploadProps } from 'antd/es/upload'
import message from 'antd/es/message'
import { useState } from 'react'
import { ActionType } from '@/services/ant-design-pro/enums'

type RegisterFormProps = {
  onCreateSuccess: (domain: string, logo: string) => void
  visible: boolean
}

const RegisterForm = (props: RegisterFormProps) => {
  const { onCreateSuccess, visible } = props

  const intl = useIntl()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [postImageUrl, setPostImageUrl] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    console.log(values)
    onCreateSuccess(values.domain, postImageUrl)
  }

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <CloudUploadOutlined style={{ fontSize: '50px' }} />}</div>

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setPostImageUrl(info.file.response.data.display_url)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const validIsUnique = async (rules: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(
        new Error(
          intl.formatMessage({
            id: 'register.domain.required',
            defaultMessage: '请输入 AI 名称',
          }),
        ),
      )
    }
    const reg = /^[A-Za-z0-9][A-Za-z0-9-_]*$/
    if (!reg.test(value)) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.domain.wrong-format', defaultMessage: '请输入正确的名称' })))
    }
    if (value.length > 30 || value.length < 3) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.domain.wrong-length', defaultMessage: '名称长度在 3~30 之间' })))
    }
    const res = await checkAIDomainUnique(value)
    if (res.ActionType === ActionType.OK && res.message === 'success') {
      return Promise.resolve()
    }
    return Promise.reject(
      new Error(
        intl.formatMessage({
          id: 'register.requireUnique',
          defaultMessage: '名称已被注册',
        }),
      ),
    )
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{
        flex: 1,
        overflow: 'auto',
        width: '100%',
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        className="w-full flex-1 fcc-center register-step-one"
        style={{
          marginTop: 20,
        }}
      >
        <Form.Item
          name="domain"
          label={intl.formatMessage({ id: 'register.domain.register', defaultMessage: '注册你的 AI 名称' })}
          rules={[{ validator: (rule, value) => validIsUnique(rule, value) }]}
        >
          <Input placeholder="请输入名称" suffix={<span className="mx-2">.AI</span>} />
        </Form.Item>
        <Form.Item
          name="logo"
          label={intl.formatMessage({ id: 'register.logo', defaultMessage: '上传你的 AI Logo' })}
          valuePropName="fileList"
          getValueFromEvent={event => event.fileList}
          rules={[{ required: true, message: '请上传logo' }]}
        >
          <Upload
            name="image"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://api.imgbb.com/1/upload?key=b5a35711fc74b069ae11302366d23b48"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" className="rounded-full" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </div>
      <Form.Item style={{ width: '100%' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button type="primary" style={{ width: '100%', height: '48px', fontSize: 18 }} htmlType="submit">
            {intl.formatMessage({
              id: 'landing.createmyai',
              defaultMessage: '创建我的 AI',
            })}
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
