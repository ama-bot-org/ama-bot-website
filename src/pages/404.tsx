import { history } from '@umijs/max'
import Button from 'antd/es/button'
import React from 'react'
import styles from './404.less'
import { useInView } from 'react-intersection-observer'
import { ConfigProvider } from 'antd'

const NoFoundPage: React.FC = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
  })

  return (
    <div className="h-full w-auto fcc-center">
      <div className="relative" style={{ marginBottom: 60 }} ref={ref}>
        <img alt="UFO" src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/404/UFO.svg" />
        <img
          style={{
            position: 'absolute',
            left: 70,
          }}
          alt="redhat"
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/404/redhat.svg"
          className={`${styles['redhat-animate']} ${inView ? styles['redhat-animate-top'] : ''}`}
        />
        <img
          className="absolute right-0 bottom-0"
          alt="greyhat"
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/404/greyhat.svg"
        />
      </div>
      <h1
        style={{
          fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
          fontSize: 64,
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: 'AlibabaPuHuiTi-2-65-Medium',
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        Oops，你的页面好像飞到了外太空…
      </p>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#e65c41',
          },
        }}
      >
        <Button type="primary" onClick={() => history.push('/')}>
          返回主页
        </Button>
      </ConfigProvider>
    </div>
  )
}

export default NoFoundPage
