import React from 'react'
import styles from './SectionIntro.less'
import OnlineFAQ from '@/components/OnlineFAQ'
import { Button, ConfigProvider } from 'antd'
import { useInView } from 'react-intersection-observer'

export default function SectionIntro() {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
    triggerOnce: true,
  })
  return (
    <section
      ref={ref}
      style={{
        paddingTop: 100,
        backgroundColor: 'aliceblue',
        height: 'calc(100vh - 100px)',
        overflow: 'hidden',
      }}
    >
      <div className="relative text-center" style={{ height: 240 }}>
        <div className="absolute text-center w-full" style={{ bottom: 0, left: 0 }}>
          <img
            src="/images/Landing/s1-logo-Askio.svg"
            style={{
              width: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <h1
          className="text-#e65c41"
          style={{
            fontSize: '40px',
            fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
          }}
        >
          问一下，都解决！
        </h1>
        <h1
          style={{
            fontSize: '40px',
            fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
          }}
        >
          悦问 AI, 行业领先的 AI 客服专家
        </h1>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button type="primary">立即体验</Button>
        </ConfigProvider>
      </div>
      <div className="relative text-center w-full">
        <img
          className={`${styles['landing-animate']} ${inView ? styles['landing-animate-scale'] : ''}`}
          src="/images/Landing/s1-ui.png"
          style={{
            width: '100%',
            marginTop: '-4.2%',
          }}
        />
      </div>
      <OnlineFAQ />
    </section>
  )
}
