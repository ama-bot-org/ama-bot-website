import React, { useMemo } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { useModel } from '@umijs/max'
import CopyLink from '../../components/CopyLink'

export default function ReactCode() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const code = useMemo(() => {
    return `import { useState } from 'react'
    import './style.css'
    
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

  return (
    <div className="askio-btn-wrap">
      <iframe 
        src="${REACT_APP_OFFICIAL_SITE}/bot/${currentUser?.html_url}"
        style={{
          width: \`\${width}px\`,
          height: \`\${iframeVisible ? height : 0}px\`,
          border: 'none',
          marginBottom: -60,
          transition: 'height 0.3s',
          overflow: 'hidden',
          borderRadius: '10px',
        }}
      ></iframe>
      <div className="askio-btn" onClick={() => setIframeVisible(!iframeVisible)}>
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
          <img src="${currentUser?.image_url}" alt="chat icon" style={{
            width: '52px',
            height: '52px',
            borderRadius: '26px',
          }}/>
        </div>
      </div>
    </div>
  )
}

export default OnlineFAQ
    `
  }, [currentUser?.html_url, currentUser?.image_url])

  const code2 = `/* styles.css */

  .askio-btn-wrap {
    position: fixed;
    bottom: 60px;
    right: 60px;
    overflow: hidden;
    z-index: 9999;
  }
  
  @media screen and (max-width: 768px) {
    .askio-btn-wrap {
      bottom: 60px;
      right: 10px;
    }
  }
  
  .askio-btn {
    width: 144px;
    height: 48px;
    margin: 60px 60px 60px 100px;
    border-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 10px 50px 10px, rgba(0, 0, 0, 0.15) 0px 10px 10px -10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
  }
  
  @media screen and (max-width: 768px) {
    .askio-btn{
      margin: 20px;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 10px 2px, rgba(0, 0, 0, 0.15) 0px 2px 2px -2px;
    }
  }
  `

  const options = {
    readOnly: true, //只读
    automaticLayout: true, //自动布局
  }

  return (
    <div className="editor-container">
      <div
        style={{
          fontSize: '14px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
          marginBottom: '8px',
          color: '#131415',
        }}
      >
        <div>请在您的 React 项目中新建一个组件，将下面的代码复制进去，在需要的地方引用即可。</div>
        <div>
          <span>详情请查看代码以及注释，自由调整位置、样式、图片。 </span>
          <CopyLink linkUrl={code} copyText="复制代码" />
        </div>
      </div>

      <MonacoEditor height={'50vh'} language={'typescript'} value={code} options={options} />

      <div
        style={{
          fontSize: '14px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
          marginTop: '16px',
          marginBottom: '16px',
          color: '#131415',
        }}
      >
        <span>样式部分请自己建css文件, 并在上面的组件中引用</span>
        <CopyLink linkUrl={code2} copyText="复制代码" />
      </div>

      <MonacoEditor height={'50vh'} language={'css'} value={code2} options={options} />
    </div>
  )
}
