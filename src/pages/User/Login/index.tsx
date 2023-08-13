import Footer from '@/components/Footer'
import loginAPI from '@/services/web-api/login'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { history, useIntl, useModel, Helmet, Link } from '@umijs/max'
import { Button, ConfigProvider, Form, Input, message } from 'antd'
import Settings from '../../../../config/defaultSettings'
import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import CaptchaForm from '../Register/CaptchaForm'
import { useForm } from 'antd/es/form/Form'
import { ActionType, CheckType, RegisterType } from '@/constants/enums'
import ArrowRightOutlined from '@ant-design/icons/lib/icons/ArrowRightOutlined'
import AgreementFormItem from '../components/AgreementFormItem'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { User, LoginFormParams, LoginParams } from '@/services/web-api/models/user'

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState')
  const [submitting, setSubmitting] = useState(false)
  const [isCheckBuyCaptcha, setIsCheckBuyCaptcha] = useState(false)
  const [checked, setChecked] = useState(false)

  const [form] = useForm()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
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

  const asyncUserInfo = async (data: User) => {
    localStorage.setItem('user', JSON.stringify(data))
    flushSync(() => {
      setInitialState((s: any) => ({
        ...s,
        currentUser: { ...data },
      }))
    })
  }

  const onFinish = async (values: LoginFormParams) => {
    try {
      // 登录
      setSubmitting(true)

      const params: LoginParams = {
        email: values.email,
        checkType: isCheckBuyCaptcha ? CheckType.Captcha : CheckType.Password,
      }
      if (!isCheckBuyCaptcha) {
        Object.assign(params, { password: values.password })
      } else {
        Object.assign(params, { email_check: values.captcha })
      }

      const msg = await loginAPI.login(params)
      if (msg.ActionType === ActionType.OK) {
        asyncUserInfo(msg.data)
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        })
        message.success(defaultLoginSuccessMessage)
        // await fetchUserInfo()
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/database-config/corpus')
        return
      }
      console.log(msg)
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
      })
      console.log(error)
      message.error(defaultLoginFailureMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDynamicFieldChange = (value: string, checkType: CheckType) => {
    if (checkType === CheckType.Password) {
      form.setFieldValue('password', value)
    } else {
      form.setFieldValue('captcha', value)
    }
  }

  const handleCheckboxChange = (e: any) => {
    setChecked(e.target.checked)
  }

  return (
    <div className={`${containerClassName} login-page`}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          width: '365px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
          position: 'relative',
        }}
      >
        <Link
          to={'/landing'}
          style={{
            position: 'absolute',
            top: '32px',
            left: '0px',
            fontFamily: 'AlibabaPuHuiTi-2-65-Medium',
            fontSize: '24px',
            fontWeight: 500,
            color: '#131415',
            textDecoration: 'none',
          }}
        >
          <ArrowLeftOutlined style={{ marginRight: '12px' }} />
          <span>{intl.formatMessage({ id: 'register.backHome' })}</span>
        </Link>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: '#333',
            marginBottom: '20px',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span>{intl.formatMessage({ id: 'pages.login.emailLogin.tab' })}</span>
        </div>
        <Form form={form} name="UserRegister" onFinish={onFinish} style={{ width: '100%', overflow: 'hidden' }} scrollToFirstError>
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
            <Input size="large" style={{ height: '48px' }} placeholder={intl.formatMessage({ id: 'register.email.placeholder' })} />
          </Form.Item>
          {isCheckBuyCaptcha ? (
            <CaptchaForm form={form} registerType={RegisterType.Login} onCaptchaChange={handleDynamicFieldChange} />
          ) : (
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'register.password.required' }),
                },
              ]}
            >
              <Input.Password
                size="large"
                style={{ height: '48px' }}
                placeholder={intl.formatMessage({ id: 'register.password.required' })}
                onChange={e => handleDynamicFieldChange(e.target.value, CheckType.Password)}
              />
            </Form.Item>
          )}
          <div className="w-full frc-between" style={{ marginBottom: '20px', fontSize: 16 }}>
            <Link to={'/user/register?step=1'} style={{ textDecoration: 'none', fontFamily: 'AlibabaPuHuiTi-2-85-Bold' }}>
              <span style={{ color: '#e65c41', marginRight: '12px' }}>{intl.formatMessage({ id: 'register.register' })}</span>
              <ArrowRightOutlined color="#e65c41" style={{ color: '#e65c41' }} />
            </Link>
            <Button
              type="text"
              style={{ display: 'inline', width: 'min-content', fontSize: 16 }}
              onClick={() => {
                setIsCheckBuyCaptcha(!isCheckBuyCaptcha)
              }}
            >
              {isCheckBuyCaptcha
                ? intl.formatMessage({ id: 'pages.login.emailLogin.passwordLogin' })
                : intl.formatMessage({ id: 'pages.login.emailLogin.captchaLogin' })}
            </Button>
          </div>
          <AgreementFormItem handleCheckboxChange={handleCheckboxChange} />
          <Form.Item>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#e65c41',
                },
              }}
            >
              <Button
                type="primary"
                loading={submitting}
                disabled={!checked}
                style={{ width: '100%', height: '48px', fontSize: 18 }}
                htmlType="submit"
              >
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
