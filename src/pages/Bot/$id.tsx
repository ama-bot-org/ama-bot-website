import { useEmotionCss } from '@ant-design/use-emotion-css'
import { history } from '@umijs/max'
import useBotModel from '@/hooks/useBot'
import QA from './QA'
import Divider from 'antd/es/divider'
import styles from './index.less'
import Loading from '@/components/Loading'
import { v5 as uuidv5 } from 'uuid'

const UUID = uuidv5(window.navigator.userAgent, uuidv5.URL)

const Bot: React.FC = () => {
  const { loading, botInfo } = useBotModel()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      height: 'calc(100vh - 16px)',
      overflow: 'auto',
      maxWidth: '688px',
      width: '80%',
      padding: '8px 0px',
      '@media screen and (max-width: 768px)': {
        width: '100%',
      },
      margin: '0 auto',
    }
  })

  const handleJump = () => {
    history.push('/landing')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className={`${styles.bg} w-full`}>
      <div className={containerClassName}>
        <div className="overflow-auto w-full frc-center">
          <img src={botInfo?.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 20 }} />
          <h3 className="text-center my-0 ml-8 text-black">{botInfo?.name}</h3>
        </div>
        <Divider style={{ margin: '12px 0 12px 0' }} />
        <QA
          style={{ flex: 1, overflow: 'auto' }}
          id={botInfo.id}
          contactCode={botInfo.contact}
          FAQContents={botInfo.faq_contents}
          welcomes={botInfo.welcomes}
          model_type={botInfo.model_type}
          uuid={UUID}
          disabledAd={true}
          hasEvaluateFix={false}
        />
        <div style={{ textAlign: 'center', padding: 2, color: '#000000', fontSize: 12 }}>
          ©2023 <span onClick={handleJump}>Askio （ 悦问AI ）</span> 提供技术支持
        </div>
      </div>
    </div>
  )
}

export default Bot
