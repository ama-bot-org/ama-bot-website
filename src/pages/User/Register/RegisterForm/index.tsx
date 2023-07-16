// import { checkAIDomainUnique } from '@/services/ant-design-pro/register'
import { ActionType } from '@/services/ant-design-pro/enums'
import ImgCrop from 'antd-img-crop'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import { useIntl } from '@umijs/max'
import userAPI from '@/services/ant-design-pro/register'
import Form, { RuleObject } from 'antd/es/form'
import Input from 'antd/es/input'
import Upload, { UploadFile, UploadChangeParam, RcFile } from 'antd/es/upload'
import Button from 'antd/es/button'
import ConfigProvider from 'antd/es/config-provider'
import type { UploadProps } from 'antd/es/upload'
import message from 'antd/es/message'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { v4 as uuidv4 } from 'uuid'

type RegisterFormProps = {
  onCreateSuccess: (name: string, image_url: string) => void
  visible: boolean
}

const RegisterForm = (props: RegisterFormProps) => {
  const { onCreateSuccess, visible } = props

  const intl = useIntl()
  const [form] = useForm()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [postImageUrl, setPostImageUrl] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    onCreateSuccess(values.name, postImageUrl)
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
      message.error('You can only upload JPEG/PNG file!')
    }
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      message.error('Image must smaller than 2MB!')
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
            defaultMessage: '请输入 AI 客服名称',
          }),
        ),
      )
    }
    const reg = /[^\u4E00-\u9FA5A-Za-z0-9_]/
    if (reg.test(value)) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.name.wrong-format', defaultMessage: '请输入正确的名称' })))
    }
    if (value.length > 30 || value.length < 3) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'register.name.wrong-length', defaultMessage: '名称长度在 3~30 之间' })))
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
        onError(new Error('上传失败'))
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

  return (
    <Form
      onFinish={onFinish}
      form={form}
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
        className="w-full flex-1 fcs-center register-step-one"
        style={{
          marginTop: 20,
        }}
      >
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'register.name.register', defaultMessage: 'AI 客服昵称' })}
          rules={[{ validator: (rule, value) => validIsUnique(rule, value) }]}
        >
          <Input placeholder="请输入 AI 客服昵称" />
        </Form.Item>
        <div className="flex flex-wrap">
          <Form.Item
            name="image_url"
            label={intl.formatMessage({ id: 'register.logo', defaultMessage: '头像' })}
            valuePropName="fileList"
            getValueFromEvent={event => event.fileList}
            rules={[{ validator: validateImage }]}
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
              marginLeft: '16px',
            }}
          >
            <div className="text-left" style={{ color: '#e65c41' }}>
              上传头像
            </div>
            <div className="text-left">支持.png .jpeg，不超过1M</div>
          </div>
        </div>
      </div>
      <Form.Item style={{ width: '100%' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button type="primary" style={{ width: '100%', height: '48px', fontSize: 18 }} htmlType="submit" id="myButton">
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
