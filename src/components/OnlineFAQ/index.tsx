import { useState } from 'react'

type OnlineFAQProps = {
  top?: number
  bottom?: number
  left?: number
  right?: number
  width?: number
  height?: number
}

// 定制悬浮实时客服组件
const OnlineFAQ: React.FC = (props: OnlineFAQProps) => {
  const { bottom = 60, right = 60, width = 300, height = 500 } = props
  const [iframeVisible, setIframeVisible] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: bottom,
        right: right,
        overflow: 'hidden',
      }}
    >
      <iframe
        // src="https://www.aiyin.chat/ama"
        src="http://localhost:8000/landing"
        style={{
          width: width,
          height: iframeVisible ? height : 0,
          border: 'none',
          marginBottom: -60,
          transition: 'height 0.3s',
          overflow: 'hidden',
        }}
      ></iframe>
      <div
        style={{
          width: '144px',
          height: '48px',
          margin: '60px',
          borderRadius: '24px',
          boxShadow: 'rgba(0, 0, 0, 0.07) 0px 10px 50px 10px, rgba(0, 0, 0, 0.15) 0px 10px 10px -10px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingLeft: 20,
          cursor: 'pointer',
        }}
      >
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
          onClick={() => setIframeVisible(!iframeVisible)}
          style={{
            position: 'absolute',
            width: '52px',
            height: '52px',
            margin: '0 0 0 97px',
            borderRadius: '26px',
            backgroundColor: '#e65b42',
          }}
        >
          <img src="/images/Landing/s1-icon-chat.svg" alt="chat icon" />
        </div>
      </div>
    </div>
  )
}

export default OnlineFAQ
