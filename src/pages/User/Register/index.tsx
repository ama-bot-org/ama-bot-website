// 注册页面
// step1. 注册名称以及logo
// step2. 通过输入验证码绑定邮箱，然后设置密码，同意"我已阅读并同意《注册服务协议》和《隐私政策》"，完成注册
// step3. 跳到登录页，通过邮箱密码登录

import styles from './register.less'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useIntl, Link, useLocation } from '@umijs/max'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { history } from '@umijs/max'
import RegisterForm from './RegisterForm'
import EmailPassForm from './EmailPassForm'
import { API } from '@/services/ant-design-pro/typings'
import { registerNewUser } from '@/services/ant-design-pro/register'
import { ActionType } from '@/services/ant-design-pro/enums'

const Register = () => {
  const query = new URLSearchParams(history.location.search)
  const step = query.get('step')

  const intl = useIntl()
  const location = useLocation()

  const [submitting, setSubmitting] = useState(false)
  const [registerStep, setRegisterStep] = useState(step ? Number(step) : 1)
  const [registerParams, setRegisterParams] = useState<API.RegisterParams>({} as API.RegisterParams)

  useEffect(() => {
    const query = new URLSearchParams(history.location.search)
    const step = query.get('step')
    setRegisterStep(step ? Number(step) : 1)
  }, [location])

  const handleSubmit = async (values: API.RegisterParams) => {
    setSubmitting(true)
    try {
      // 注册成功后跳转到登录页
      const registerResult: API.UserRegisterResponse = await registerNewUser(values)
      console.log('registerResult', registerResult)
      console.log('values', values)
      if (registerResult.ActionType === ActionType.OK) {
        history.push('/user/login')
      } else {
        message.error(registerResult.message)
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.register.failure',
        defaultMessage: '注册失败，请重试！',
      })
      console.log(error)
      message.error(defaultLoginFailureMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const onCreateSuccess = (domain: string, logo: string) => {
    setRegisterParams({ ...registerParams, org_id: domain, logo })
    setRegisterStep(2)
  }

  const onCompleteRegister = (email: string, password: string, captcha: string) => {
    const allParams = { ...registerParams, email, name: email, password, email_check: captcha }
    setRegisterParams(allParams)
    handleSubmit(allParams)
  }

  return (
    <div className={styles.main}>
      <Link
        to={registerStep === 1 ? '/landing' : '/user/register?step=1'}
        style={{
          fontFamily: 'AlibabaPuHuiTi-2-65-Medium',
          fontSize: '24px',
          fontWeight: 500,
          color: '#131415',
          textDecoration: 'none',
        }}
      >
        <ArrowLeftOutlined style={{ marginRight: '12px' }} />
        <span>{registerStep === 1 ? intl.formatMessage({ id: 'register.backHome' }) : intl.formatMessage({ id: 'register.create' })}</span>
      </Link>
      <div className={styles.form}>
        <RegisterForm onCreateSuccess={onCreateSuccess} visible={registerStep === 1} />
        <EmailPassForm onCompleteRegister={onCompleteRegister} submitting={submitting} visible={registerStep === 2} />
        {registerStep === 1 ? (
          <div className="w-full text-center">
            <Link to={'/user/login'} style={{ textDecoration: 'none', fontFamily: 'AlibabaPuHuiTi-2-85-Bold', fontSize: '18px' }}>
              <span style={{ color: '#e65c41', marginRight: '12px' }}>{intl.formatMessage({ id: 'register.skip' })}</span>
              <ArrowRightOutlined color="#e65c41" style={{ color: '#e65c41' }} />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Register
