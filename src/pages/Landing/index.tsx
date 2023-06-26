import React, { useEffect } from 'react'
import Footer from '@/components/Footer'
import Button from 'antd/es/button'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { SelectLang, useIntl, Helmet, Link, useModel } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import LogoWithName from '@/components/LogoWithName'
import { ConfigProvider } from 'antd'
import { AvatarDropdown } from '@/components/RightContent/AvatarDropdown'
import { getInitialState } from '@/app'
import SectionCompare from './components/SectionCompare'
import SectionCorevalue from './components/SectionCorevalue'
import SectionFeedback from './components/SectionFeedback'
import SectionIntro from './components/SectionIntro'
import SectionPlugin from './components/SectionPlugin'
import SectionSafe from './components/SectionSafe'
import SectionScene from './components/SectionScene'
import SectionTryFree from './components/SectionTryFree'

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
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

const LoginButton = () => {
  const intl = useIntl()

  const loginClassName = useEmotionCss(({ token }) => {
    return {
      width: 80,
      height: 40,
      lineHeight: '42px',
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    }
  })

  return (
    <div className={loginClassName}>
      <Link to={'/user/login'} style={{ textDecoration: 'none' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button type="primary" style={{ width: '100%', height: '100%' }}>
            {intl.formatMessage({
              id: 'menu.login',
              defaultMessage: '登录',
            })}
          </Button>
        </ConfigProvider>
      </Link>
    </div>
  )
}

const Landing: React.FC = () => {
  const intl = useIntl()
  const { initialState, setInitialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const initUser = async () => {
    const { fetchUserInfo } = await getInitialState()
    if (fetchUserInfo) {
      setInitialState({
        ...initialState,
        currentUser: await fetchUserInfo(),
      })
    }
  }

  useEffect(() => {
    if (!currentUser?.bot_id) {
      initUser()
    }
  }, [])

  const containerClassName = useEmotionCss(() => {
    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#bfbfbf25',
    }
  })

  // const backimageClassName = useEmotionCss(() => {
  //   return {
  //     backgroundImage: "url('/images/back_circle.webp')",
  //     backgroundRepeat: 'no-repeat',
  //     '@media screen and (max-width: 1440px)': {
  //       backgroundSize: 'auto',
  //     },
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'top center',
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     width: '100%',
  //     height: '100%',
  //     opacity: 0.2,
  //     zIndex: 0,
  //   }
  // })

  return (
    <div className={containerClassName}>
      {/* <div className={backimageClassName}> </div> */}
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
          position: 'relative',
          zIndex: 1,
          flex: '1',
          padding: '16px 0',
        }}
      >
        <LogoWithName />

        <div
          style={{
            width: 'auto',
            height: 40,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            display: 'flex',
          }}
        >
          <Lang />
          {currentUser?.org_id ? (
            <AvatarDropdown menu>
              <span>{currentUser?.org_id}</span>
            </AvatarDropdown>
          ) : (
            <LoginButton />
          )}
        </div>
        <div
          style={{
            height: 'auto',
            marginTop: '50px',
            width: '100%',
          }}
        >
          {/* 第一栏：介绍产品本身 */}
          <SectionIntro />

          {/* 第二栏：与传统客服比较 */}
          <SectionCompare />

          {/* 第三栏：阐述核心价值 */}
          <SectionCorevalue />

          {/* 第四栏：描述应用场景 */}
          <SectionScene />

          {/* 第五栏：支持插件式嵌用 */}
          <SectionPlugin />

          {/* 第六栏：客户反馈意见 */}
          <SectionFeedback />

          {/* 第七栏：全面安全防护 */}
          <SectionSafe />

          {/* 第八栏：鼓励免费试用 */}
          <SectionTryFree />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Landing
