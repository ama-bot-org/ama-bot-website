import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import styles from './SectionPlugin.less'

export default function SectionPlugin() {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  })

  const sectionClassName = useEmotionCss(() => {
    return {
      height: '100vh',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
      },
    }
  })

  return (
    <section
      ref={ref}
      className={`relative ${sectionClassName}`}
      style={{
        height: 'auto',
        paddingTop: 100,
        backgroundColor: 'aliceblue',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <p className="landing-main-header">以插件形式嵌入网站</p>
      <h1 className="landing-secondary-header">简单复制代码，即可将Askio以插件形式嵌入企业官网</h1>
      <div className={`${styles['image-wrap']} ${inView ? styles['image-wrap-zoom'] : ''}`}>
        <img src="/images/Landing/s5-web.png" alt="plugin" className={styles['image']} />
      </div>
    </section>
  )
}
