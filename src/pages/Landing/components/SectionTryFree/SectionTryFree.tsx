import { useEmotionCss } from '@ant-design/use-emotion-css'
import React from 'react'
import { history, useModel } from '@umijs/max'

export default function SectionTryFree() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const sectionClassName = useEmotionCss(() => {
    return {
      height: '640px',
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
      className={`relative ${sectionClassName}`}
      style={{
        paddingTop: 100,
        paddingBottom: 100,
        backgroundColor: '#4b4b4b1a',
        overflow: 'hidden',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="relative"
        style={{
          padding: '40px 160px 40px 60px',
          borderRadius: '16px',
          boxShadow: '0 11px 55px 10px rgba(0, 0, 0, 0.07), 0 13px 18px -8px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#131415',
          textAlign: 'left',
        }}
      >
        <img
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s8-rocket.png"
          alt="try-free"
          style={{
            position: 'absolute',
            width: 'auto',
            maxWidth: '200px',
            right: '-20px',
            top: '-80px',
          }}
        />
        <h1
          className="landing-main-header"
          style={{
            color: '#fff',
          }}
        >
          加速你的业务，一起开启AI生产力新时代！
        </h1>
        <button
          type="button"
          style={{
            padding: '13px 32.5px 13px 33px',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
          onClick={() => {
            handleTryNow()
          }}
        >
          立即免费试用
        </button>
      </div>
    </section>
  )
}
