import { requestCaptcha } from '@/services/ant-design-pro/register'
import styles from './index.less'
import { useIntl } from '@umijs/max'
import { Form, Input, Row, Col, Button, ConfigProvider, message } from 'antd'
import { useState } from 'react'
import { CaptchaAvailableResult } from '@/services/ant-design-pro/enums'

type EmailPassFormProps = {
  onCompleteRegister: (email: string, password: string, captcha: string) => void
  submitting?: boolean
  visible: boolean
}

// 组件：绑定邮箱设置密码以完成注册，绑定邮箱需要接收验证码，设置密码需要再次确认密码，两次密码输入不一致时会有提示，密码长度不足时会有提示
const EmailPassForm: React.FC<EmailPassFormProps> = props => {
  const { onCompleteRegister, submitting, visible } = props
  const intl = useIntl()
  const [form] = Form.useForm()
  const [confirmPassword] = useState('')
  const [count, setCount] = useState(0)

  const compareToFirstPassword = (rule: any, value: any) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(intl.formatMessage({ id: 'register.password.twice' }))
    }
    return Promise.resolve()
  }

  const validateToNextPassword = (rule: any, value: any) => {
    if (value && confirmPassword) {
      form.validateFields(['confirm'])
    }
    return Promise.resolve()
  }

  const onGetCaptcha = async () => {
    // 倒计时
    let count = 59
    setCount(count)
    const timer = setInterval(() => {
      count -= 1
      setCount(count)
      if (count === 0) {
        clearInterval(timer)
      }
    }, 1000)
    // 获取验证码
    const email = form.getFieldValue('email')
    if (email) {
      const res = await requestCaptcha(email)
      if (res.available === CaptchaAvailableResult.Available) {
        message.success(intl.formatMessage({ id: 'register.code.available' }))
      } else if (res.available === CaptchaAvailableResult.Unavailable) {
        message.error(intl.formatMessage({ id: 'register.code.unavailable' }))
      } else {
        message.error(intl.formatMessage({ id: 'register.code.sendFail' }))
      }
    } else {
      form.validateFields(['email'])
    }
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    onCompleteRegister(values.email, values.password, values.captcha)
  }

  return (
    <div
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      <div className={styles.title}>{intl.formatMessage({ id: 'register.account.complete' })}</div>
      <Form form={form} name="UserRegister" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'register.email.required' }),
            },
            {
              type: 'email',
              message: intl.formatMessage({ id: 'register.email.wrong-format' }),
            },
          ]}
        >
          <Input size="large" placeholder={intl.formatMessage({ id: 'register.email.placeholder' })} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'register.password.required' }),
            },
            {
              validator: validateToNextPassword,
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder={intl.formatMessage({ id: 'register.password.required' })} />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'register.password.required' }),
            },
            {
              validator: compareToFirstPassword,
            },
          ]}
        >
          <Input.Password size="large" placeholder={intl.formatMessage({ id: 'register.password.required' })} />
        </Form.Item>
        <Form.Item
          name="captcha"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'register.code.required' }),
            },
          ]}
        >
          <Row gutter={8}>
            <Col span={14}>
              <Input size="large" placeholder={intl.formatMessage({ id: 'register.code.required' })} />
            </Col>
            <Col span={8}>
              <Button size="large" disabled={count > 0} className={styles.getCaptcha} onClick={onGetCaptcha}>
                {count ? `${count} s` : intl.formatMessage({ id: 'register.code.get' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#e65c41',
              },
            }}
          >
            <Button type="primary" loading={submitting} style={{ width: '100%', height: '100%' }} htmlType="submit">
              {intl.formatMessage({ id: 'menu.login' })}
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EmailPassForm