import styles from './landing.less'
import Footer from '@/components/Footer'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { SelectLang, useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import Link from 'antd/es/typography/Link'
import { ArrowDownOutlined } from '@ant-design/icons'

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    }
  })

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  )
}

const LogoWithName: React.FC = () => {
  const logoClassName = useEmotionCss(({ token }) => {
    return {
      width: 'auto',
      padding: '0 8px',
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      left: 16,
      display: 'flex',
      alignItems: 'center',
      borderRadius: token.borderRadius,
      ':hover': {
        cursor: 'pointer',
        backgroundColor: token.colorBgTextHover,
      },
    }
  })
  return (
    <div className={`${logoClassName} ant-pro-global-header-logo`}>
      <Link
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src="/logo.svg" alt="logo" style={{ width: '24px', height: '24px' }} />
        <h1 style={{ margin: 0, fontFamily: 'AlibabaPuHuiTi-2-85-Bold', marginLeft: '12px', fontSize: '18px' }}>AMA</h1>
      </Link>
    </div>
  )
}

const Landing: React.FC = () => {
  const intl = useIntl()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('/images/back_circle.svg')",
      backgroundRepeat: 'no-repeat',
      '@media screen and (max-width: 1440px)': {
        backgroundSize: 'auto',
      },
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }
  })

  const headerClassName = useEmotionCss(() => {
    return {
      fontFamily: 'AlibabaPuHuiTi_2_85_Bold, AlibabaSans-Medium',
      '@media screen and (max-width: 1024px)': {
        fontSize: '30px',
      },
      fontSize: '40px',
      marginBottom: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#f3f3f3',
    }
  })

  const stepContainer = useEmotionCss(() => {
    return {
      display: 'flex',
      '@media screen and (min-width: 486px)': {
        width: '54%',
      },
      '@media screen and (min-width: 768px)': {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      },
      width: '70%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }
  })

  /**
   * 1.注册帐号
   * 2.上传文本素材
   * 3.将机器人邀请到IM聊天工具
   */
  const stepsData = [
    {
      id: 1,
      title: intl.formatMessage({
        id: 'landing.steps.register',
        defaultMessage: '注册帐号',
      }),
    },
    {
      id: 2,
      title: intl.formatMessage({
        id: 'landing.steps.upload',
        defaultMessage: '上传文本素材',
      }),
    },
    {
      id: 3,
      title: intl.formatMessage({
        id: 'landing.steps.invite',
        defaultMessage: '注册帐号',
      }),
    },
  ]

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.welcome',
            defaultMessage: '欢迎页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '16px 0',
        }}
      >
        <LogoWithName />
        <Lang />
        <div className="w-full h-full fcc-center" style={{ marginTop: '110px' }}>
          <div className={headerClassName}>
            <h4 style={{ color: '#e65c41', margin: '0px' }}>
              {intl.formatMessage({
                id: 'landing.title1',
              })}
            </h4>
            <h4 style={{ margin: '10px 0px 0px 0px' }}>
              {intl.formatMessage({
                id: 'landing.title2',
              })}
            </h4>
          </div>
          <div className={stepContainer}>
            {stepsData.map(item => (
              <span key={item.id} className={styles.step}>
                <span className={styles['step-id']}>{item.id}</span>
                <span className={styles['step-title']}>{item.title}</span>
              </span>
            ))}
          </div>
          <div className={styles.start}>
            <ArrowDownOutlined />
            <span>
              {intl.formatMessage({
                id: 'landing.create',
              })}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
