import React from 'react'
import Image from 'antd/es/image'
import { useEmotionCss } from '@ant-design/use-emotion-css'

const Steps = [
  {
    icon: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/corpus/up.png',
    title: '文件上传',
    description: [
      '1. 上传约需要花费几十秒到几分钟不等，请耐心等待',
      '2. 文件内容建议不超过5000字，超过请分为多个文件上传',
      '3. 仅支持文本内容的识别，不支持图片和表格数据识别',
      '4. 文件内容按照主题区分，段落结构清晰，AI训练效果会更好',
    ],
  },
  {
    icon: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/corpus/input.png',
    title: '文本输入',
    description: ['1. 单个新增文本内容建议不超过2000字', '2. 主题名称不会进入AI训练资料，只有文本内容会进入训练库'],
  },
  {
    icon: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/corpus/notion.png',
    title: 'Notion同步',
    description: ['1. 当前仅支持通过notion的token和链接获取数据'],
  },
]

export default function CorpusDescription() {
  const descriptionClassname = useEmotionCss(() => {
    return {
      width: '100%',
      '@media screen and (max-width: 768px)': {
        width: '375px',
      },
    }
  })

  return (
    <div style={{ width: '100%', paddingLeft: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <h3 className="mb-0 mt-16 w-full text-left" style={{ fontSize: 16 }}>
        支持三种数据配置方式
      </h3>
      {Steps.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
            <Image preview={false} src={item.icon} style={{ width: '40px', height: '40px' }} />
            <div className={descriptionClassname}>
              <h3 style={{ margin: '0px 10px', width: '100%', textAlign: 'left', fontSize: 16, lineHeight: '40px' }}>{item.title}</h3>
              <ul
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'start',
                  flex: 1,
                  paddingInlineStart: 0,
                  marginTop: 0,
                }}
              >
                {item.description.map((desc, index) => (
                  <li key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start', flex: 1 }}>
                    <p style={{ margin: '0px 10px' }}>{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
