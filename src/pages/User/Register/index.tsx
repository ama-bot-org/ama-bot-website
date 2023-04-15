// 注册页面
// step1. 注册域名以及logo
// step2. 通过输入验证码绑定邮箱，然后设置密码，同意"我已阅读并同意《注册服务协议》和《隐私政策》"，完成注册
// step3. 跳到登录页，通过邮箱密码登录

import styles from './register.less'
import { FormattedMessage } from '@/.umi/plugin-locale'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { message } from 'antd'
import { useState } from 'react'
import { history } from '@/.umi/core/history'
import { register } from '@/services/ant-design-pro/api'

const Register: React.FC = () => {
  const intl = useIntl()

  const [submitting, setSubmitting] = useState(false)
  const [type] = useState<string>('account')

  const handleSubmit = async (values: API.RegisterParams) => {
    setSubmitting(true)

    try {
      // 注册成功后跳转到登录页
      await register({ ...values, type })
      history.push('/user/login')
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      })
      console.log(error)
      message.error(defaultLoginFailureMessage)
    }

    setSubmitting(false)
  }

  return (
    <div className={styles.main}>
      <h3>{intl.formatMessage({ id: 'pages.register.register' })}</h3>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: {
            submitText: intl.formatMessage({ id: 'pages.register.submit' }),
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async values => {
          handleSubmit(values as API.RegisterParams)
        }}
      >
        {type === 'account' && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              placeholder={`${intl.formatMessage({
                id: 'pages.register.email.placeholder',
              })}:`}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.register.email.required" defaultMessage="Please enter your email!" />,
                },
                {
                  type: 'email',
                  message: (
                    <FormattedMessage id="pages.register.email.wrong-format" defaultMessage="The email address is in the wrong format!" />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={`${intl.formatMessage({
                id: 'pages.register.password.placeholder',
              })}:`}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.register.password.required" defaultMessage="Please enter your password!" />,
                },
              ]}
            />
          </>
        )}
      </ProForm>
    </div>
  )
}

export default Register
