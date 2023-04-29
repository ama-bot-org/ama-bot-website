import Footer from '@/components/Footer'
import { login } from '@/services/ant-design-pro/api'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { history, useIntl, useModel, Helmet } from '@umijs/max'
import { Button, ConfigProvider, Form, Input, message } from 'antd'
import Settings from '../../../../config/defaultSettings'
import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import { API } from '@/services/ant-design-pro/typings'
import CaptchaForm from '../Register/CaptchaForm'
import { useForm } from 'antd/es/form/Form'
import { ActionType, CheckType, RegisterType } from '@/services/ant-design-pro/enums'

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState')
  const [submitting, setSubmitting] = useState(false)
  const [isCheckBuyCaptcha, setIsCheckBuyCaptcha] = useState(false)

  const [form] = useForm()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      // backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      // backgroundSize: '100% 100%',
    }
  })

  const intl = useIntl()

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.()
  //   if (userInfo) {
  //     flushSync(() => {
  //       setInitialState((s: any) => ({
  //         ...s,
  //         currentUser: userInfo,
  //       }))
  //     })
  //   }
  // }

  const asyncUserInfo = async (data: API.User) => {
    flushSync(() => {
      setInitialState((s: any) => ({
        ...s,
        currentUser: { ...data },
        ...data
      }))
    })
  }

  const onFinish = async (values: API.LoginFormParams) => {
    try {
      // 登录
      setSubmitting(true)

      const params: API.LoginParams = {
        email: values.email,
        checkType: isCheckBuyCaptcha ? CheckType.Captcha : CheckType.Password,
      }
      if (!isCheckBuyCaptcha) {
        Object.assign(params, { password: values.password })
      }
      else {
        Object.assign(params, { email_check: values.captcha })
      }

      const msg = await login(params)
      if (msg.ActionType === ActionType.OK) {
        asyncUserInfo(msg.data)
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        })
        message.success(defaultLoginSuccessMessage)
        // await fetchUserInfo()
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/ama')
        return
      }
      console.log(msg)
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      })
      console.log(error)
      message.error(defaultLoginFailureMessage)
    }
    finally {
      setSubmitting(false)
    }
  }

  const handleDynamicFieldChange = (value: string, checkType: CheckType) => {
    if (checkType === CheckType.Password) {
      console.log(value);
      form.setFieldValue("password", value)
    } else {
      form.setFieldValue("captcha", value)
    }
  };

  return (
    <div className={`${containerClassName} login-page`}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          width: '375px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 0',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#333',
            marginBottom: '20px',
          }}
        >
          <span>{intl.formatMessage({ id: 'pages.login.emailLogin.tab' })}</span>
        </div>
        <Form form={form} name="UserRegister" onFinish={onFinish} style={{ width: "100%", overflow: "hidden" }} scrollToFirstError>
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
          {isCheckBuyCaptcha ? <CaptchaForm form={form} registerType={RegisterType.Login} onCaptchaChange={handleDynamicFieldChange} />
            : <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'register.password.required' }),
                },
              ]}
            >
              <Input.Password size="large" placeholder={intl.formatMessage({ id: 'register.password.required' })} onChange={(e) => handleDynamicFieldChange(e.target.value, CheckType.Password)} />
            </Form.Item>}
          <div className='w-full text-right' style={{ marginBottom: "20px" }}>
            <Button type="text" style={{ display: "inline", width: 'min-content' }} onClick={() => {
              setIsCheckBuyCaptcha(!isCheckBuyCaptcha)
            }}>
              {isCheckBuyCaptcha ?
                intl.formatMessage({ id: 'pages.login.emailLogin.passwordLogin' }) :
                intl.formatMessage({ id: 'pages.login.emailLogin.captchaLogin' })}
            </Button>
          </div>
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
      <Footer />
    </div>
  )
}

export default Login
