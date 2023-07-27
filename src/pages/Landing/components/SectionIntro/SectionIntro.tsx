import React from 'react'
import { history, useModel } from '@umijs/max'
import styles from './SectionIntro.less'
import { Button, ConfigProvider } from 'antd'
import { useInView } from 'react-intersection-observer'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { isMobile } from 'react-device-detect'

export default function SectionIntro() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
    triggerOnce: true,
  })

  const sectionClassName = useEmotionCss(() => {
    return {
      height: 'calc(100vh - 100px)',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
      },
    }
  })

  // 没登录就跳转注册页
  const handleTryNow = () => {
    if (currentUser && currentUser.bot_id) {
      history.push(`/database-config/corpus`)
    } else {
      history.push('/user/register')
    }
  }

  return (
    <section
      ref={ref}
      className={`relative ${sectionClassName}`}
      style={{
        paddingTop: 100,
        backgroundColor: 'aliceblue',
        overflow: 'hidden',
      }}
    >
      <div className="relative text-center" style={{ height: 240, zIndex: 1 }}>
        <div className="absolute text-center w-full" style={{ bottom: 0, left: 0 }}>
          <img
            src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s1-logo-Askio.svg"
            style={{
              width: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <h1 className="text-#e65c41 landing-main-header">问一下，都解决！</h1>
        <h1 className="landing-main-header">
          {isMobile ? (
            <div>
              <div>悦问 AI</div>
              <div>行业领先的 AI 客服专家</div>
            </div>
          ) : (
            '悦问 AI, 行业领先的 AI 客服专家'
          )}
        </h1>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              zIndex: 1,
            }}
            onClick={handleTryNow}
          >
            立即体验
          </Button>
        </ConfigProvider>
      </div>
      <div className="relative text-center w-full">
        <img
          className={`${styles['landing-animate']} ${inView ? styles['landing-animate-scale'] : ''}`}
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s1-ui.png"
          style={{
            width: '100%',
          }}
        />
      </div>
    </section>
  )
}
