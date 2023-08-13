import { useEmotionCss } from '@ant-design/use-emotion-css'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './SectionScene.less'

export default function SectionScene() {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  })

  const sectionClassName = useEmotionCss(() => {
    return {
      minHeight: '100vh',
      padding: '40px 0',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
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
      <p className="landing-main-header">对接即时沟通工具</p>
      <p className="landing-secondary-header">支持对接微信公众号、企业微信、抖音等丰富的第三方应用</p>
      <div
        className="relative"
        style={{
          width: '320px',
          height: 'auto',
        }}
      >
        <img
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s4-mobile.png"
          width="100%"
          height="100%"
          alt="scene"
          className={styles.mobile}
        />
        <div className={`${styles['scene-wrap']} ${styles.bwechat} ${inView ? styles['bwechat-zoom'] : ''}`}>
          <img
            src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s4-icon-business wechat.svg"
            alt="business wechat"
          />
          <span style={{ marginLeft: '10px' }}>企业微信</span>
        </div>
        {/* <div className={`${styles['scene-wrap']} ${styles.dingding} ${inView ? styles['dingding-zoom'] : ''}`}>
          <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s4-icon-dingding.svg" alt="dingding" />
          <span style={{ marginLeft: '10px' }}>钉钉</span>
        </div> */}
        <div className={`${styles['scene-wrap']} ${styles.discord} ${inView ? styles['discord-zoom'] : ''}`}>
          <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s4-icon-discord.svg" alt="discord" />
          <span style={{ marginLeft: '10px' }}>Discord</span>
        </div>
        {/* <div className={`${styles['scene-wrap']} ${styles.douyin} ${inView ? styles['douyin-zoom'] : ''}`}>
          <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s4-icon-douyin.svg" alt="douyin" />
          <span style={{ marginLeft: '10px' }}>抖音</span>
        </div> */}
        <div className={`${styles['scene-wrap']} ${styles.wechat} ${inView ? styles['wechat-zoom'] : ''}`}>
          <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s4-icon-wechat.svg" alt="wechat" />
          <span style={{ marginLeft: '10px' }}>微信公众号</span>
        </div>
      </div>
    </section>
  )
}
