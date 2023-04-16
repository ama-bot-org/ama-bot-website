import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import { Form, Input, Upload, Button, ConfigProvider, UploadFile, UploadProps, message } from 'antd'
import { RuleObject } from 'antd/es/form'
import { UploadChangeParam, RcFile } from 'antd/es/upload'
import { useState } from 'react'

type RegisterFormProps = {
  onCreateSuccess: (domain: string, logo: string) => void
}

const RegisterForm = (props: RegisterFormProps) => {
  const { onCreateSuccess } = props

  const intl = useIntl()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    console.log(values)
    onCreateSuccess(values.domain, imageUrl)
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
            id: 'register.requireDomain',
            defaultMessage: '请输入域名',
          }),
        ),
      )
    }
    const reg = /^[A-Za-z0-9][A-Za-z0-9-_]*$/
    if (!reg.test(value)) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.domain.wrong-format', defaultMessage: '请输入正确的域名' })))
    }
    if (value.length > 30 || value.length < 3) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.domain.wrong-length', defaultMessage: '域名长度在 3~30 之间' })))
    }
    try {
      // const res: any = await getNameOrDomainUnique(value, type, defaultStudio.id)
      // if (res.reason === validResultOfDomain.ReasonOk) {
      //   return Promise.resolve()
      // }
      // switch (res.reason) {
      //   case validResultOfDomain.ReasonExistedValue:
      //     return Promise.reject(new Error(t('register.requireUnique')))
      //   case validResultOfDomain.ReasonInvalidField:
      //     return Promise.reject(new Error(res.reason))
      //   case validResultOfDomain.ReasonNotSupport:
      //     return Promise.reject(new Error(t('register.ruleDomain')))
      //   case validResultOfDomain.ReasonRequired:
      //     return Promise.reject(new Error(type === 'name' ? t('register.requireName') : t('register.ruleDomain')))
      //   default:
      //     return Promise.reject(new Error(t('submiterror')))
      // }
    } catch (error) {
      return Promise.reject(new Error('submiterror'))
    }
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{
        flex: 1,
        overflow: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className="w-full flex-1 fcc-start">
        <Form.Item
          name="domain"
          label={intl.formatMessage({ id: 'register.domain.register', defaultMessage: '注册你的 AI 域名' })}
          rules={[{ required: true }, { validator: (rule, value) => validIsUnique(rule, value) }]}
        >
          <Input placeholder="请输入域名" suffix=".AI" />
        </Form.Item>
        <Form.Item
          name="logo"
          label={intl.formatMessage({ id: 'register.logo', defaultMessage: '上传你的 AI Logo' })}
          valuePropName="fileList"
          getValueFromEvent={event => event.fileList}
          rules={[{ required: true, message: '请上传logo' }]}
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
          <Button type="primary" style={{ width: '100%', height: '100%' }} htmlType="submit">
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
