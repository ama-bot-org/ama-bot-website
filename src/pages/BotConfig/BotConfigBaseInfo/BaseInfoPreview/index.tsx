import { useEmotionCss } from '@ant-design/use-emotion-css'
import { history } from '@umijs/max'
import Divider from 'antd/es/divider'
import QA from '@/pages/Bot/QA'
import { BotDataType } from '@/models/bot'

const BaseInfoPreview = ({ botInfo }: { botInfo: BotDataType }) => {
  const containerClassName = useEmotionCss(() => {
    return {
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      height: '600px',
      maxWidth: '688px',
      margin: '0 auto',
      background: '#e4ebf2',
    }
  })

  const handleJump = () => {
    history.push('/landing')
  }

  return (
    <div className={containerClassName}>
      <div style={{ flex: 1, padding: '12px 18px 10px 18px', overflow: 'hidden' }} className="fcc-between">
        <h2 className="text-center mb-0 text-black">{botInfo?.name}</h2>
        <Divider style={{ margin: '12px 0 12px 0' }} />
        <QA
          disabledAd
          id=""
          style={{ flex: 1, overflow: 'auto' }}
          contactCode={botInfo.contact}
          FAQContents={botInfo.faq_contents}
          welcomes={botInfo.welcomes}
        />
        <div style={{ textAlign: 'center', padding: 2, color: '#000000', fontSize: 12 }}>
          ©2023 <span onClick={handleJump}>Askio （ 悦问AI ）</span> 提供技术支持
        </div>
      </div>
    </div>
  )
}

export default BaseInfoPreview
