import Footer from '@/components/Footer'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { SelectLang, useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import Link from 'antd/es/typography/Link'

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
        <img src="/logo.svg" alt="logo" />
        <h1 style={{ margin: 0, fontFamily: 'AlibabaPuHuiTi-2-85-Bold', marginLeft: '16px' }}>AMA</h1>
      </Link>
    </div>
  )
}

const Landing: React.FC = () => {
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('/images/back_circle.svg')",
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }
  })

  const headerClassName = useEmotionCss(() => {
    return {
      fontFamily: 'AlibabaPuHuiTi_2_85_',
      fontSize: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#f3f3f3',
    }
  })

  const intl = useIntl()

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
        <div>
          <span className={headerClassName}>
            <h2 style={{ color: '#e65c41' }}>仅需三步</h2>
            <h2>定制你的 AI 问答机器人</h2>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
