import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'

type OnlineFAQProps = {
  top?: number
  bottom?: number
  left?: number
  right?: number
  width?: number
  height?: number
}

// 定制悬浮实时客服组件
const OnlineFAQ: React.FC<OnlineFAQProps> = (props: OnlineFAQProps) => {
  const { width = 300, height = 500, bottom = 60, right = 60 } = props
  const [iframeVisible, setIframeVisible] = useState(false)

  const btnWrapClassName = useEmotionCss(() => {
    return {
      position: 'fixed',
      bottom: bottom,
      right: right,
      overflow: 'hidden',
      zIndex: 9999,
      '@media screen and (max-width: 768px)': {
        bottom: '60px',
        right: '10px',
      },
    }
  })

  const btnClassName = useEmotionCss(() => {
    return {
      width: '144px',
      height: '48px',
      margin: '60px 60px 60px 100px',
      borderRadius: '24px',
      boxShadow: 'rgba(0, 0, 0, 0.07) 0px 10px 50px 10px, rgba(0, 0, 0, 0.15) 0px 10px 10px -10px',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingLeft: 20,
      cursor: 'pointer',
      '@media screen and (max-width: 768px)': {
        float: 'right',
        margin: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 2px 10px 2px, rgba(0, 0, 0, 0.15) 0px 2px 2px -2px',
      },
    }
  })

  const iframeClassName = useEmotionCss(() => {
    return {
      '@media screen and (max-width: 768px)': {
        float: 'right',
      },
    }
  })

  return (
    <div className={btnWrapClassName}>
      <iframe
        src={`${REACT_APP_OFFICIAL_SITE}/bot/askio`}
        style={{
          width: width < 320 ? 320 : width,
          height: iframeVisible ? height : 0,
          border: 'none',
          marginBottom: isMobile ? -20 : -60,
          transition: 'height 0.3s',
          overflow: 'hidden',
          borderRadius: '10px',
        }}
        className={iframeClassName}
      ></iframe>
      <div className={btnClassName} onClick={() => setIframeVisible(!iframeVisible)}>
        <span
          style={{
            color: '#e65c41',
            fontSize: '16px',
            width: '100%',
            display: 'inline-block',
          }}
        >
          在线咨询
        </span>
        <div
          style={{
            position: 'absolute',
            width: '52px',
            height: '52px',
            margin: '0 0 0 97px',
            borderRadius: '26px',
            backgroundColor: '#e65b42',
          }}
        >
          <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s1-icon-chat.svg" alt="chat icon" />
        </div>
      </div>
    </div>
  )
}

export default OnlineFAQ
