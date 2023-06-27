import { useEmotionCss } from '@ant-design/use-emotion-css'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import styles from './SectionScene.less'

export default function SectionScene() {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  })

  const sectionClassName = useEmotionCss(() => {
    return {
      height: '100vh',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
        padding: '40px 0',
        background: '#ffffff',
      },
    }
  })

  return (
    <section
      ref={ref}
      className={`relative text-center fcc-center ${sectionClassName}`}
      style={{
        overflow: 'hidden',
        backgroundColor: '#fbfbfb',
      }}
    >
      <p
        style={{
          fontSize: isMobile ? '32px' : '36px',
          fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
        }}
      >
        对接即时沟通工具
      </p>
      <p
        style={{
          fontSize: '20px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
        }}
      >
        支持对接微信公众号、企业微信、抖音等丰富的第三方应用
      </p>
      <div
        className="relative"
        style={{
          width: '320px',
          height: 'auto',
        }}
      >
        <img src="/images/Landing/s4-mobile.png" width="100%" height="100%" alt="scene" className={styles.mobile} />
        <div className={`${styles['scene-wrap']} ${styles.bwechat} ${inView ? styles['bwechat-zoom'] : ''}`}>
          <img src="/images/Landing/s4-icon-business wechat.svg" alt="business wechat" />
          <span style={{ marginLeft: '10px' }}>企业微信</span>
        </div>
        <div className={`${styles['scene-wrap']} ${styles.dingding} ${inView ? styles['dingding-zoom'] : ''}`}>
          <img src="/images/Landing/s4-icon-dingding.svg" alt="dingding" />
          <span style={{ marginLeft: '10px' }}>钉钉</span>
        </div>
        <div className={`${styles['scene-wrap']} ${styles.discord} ${inView ? styles['discord-zoom'] : ''}`}>
          <img src="/images/Landing/s4-icon-discord.svg" alt="discord" />
          <span style={{ marginLeft: '10px' }}>Discord</span>
        </div>
        <div className={`${styles['scene-wrap']} ${styles.douyin} ${inView ? styles['douyin-zoom'] : ''}`}>
          <img src="/images/Landing/s4-icon-douyin.svg" alt="douyin" />
          <span style={{ marginLeft: '10px' }}>抖音</span>
        </div>
        <div className={`${styles['scene-wrap']} ${styles.wechat} ${inView ? styles['wechat-zoom'] : ''}`}>
          <img src="/images/Landing/s4-icon-wechat.svg" alt="wechat" />
          <span style={{ marginLeft: '10px' }}>微信公众号</span>
        </div>
      </div>
    </section>
  )
}
