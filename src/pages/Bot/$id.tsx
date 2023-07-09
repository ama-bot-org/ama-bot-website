import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet, history, useParams } from '@umijs/max'
import QA from './QA'
import Divider from 'antd/es/divider'
import styles from './index.less'
import { useEffect, useState } from 'react'
import { checkBotValid } from '@/services/ant-design-pro/api'
import { API } from '@/services/ant-design-pro/typings'
import { ActionType } from '@/services/ant-design-pro/enums'

const Bot: React.FC = () => {
  const intl = useIntl()
  const { id } = useParams()
  const [botInfo, setBotInfo] = useState<API.Bot>({} as API.Bot)

  // const initBotInfo = async (id: string) => {
  //   const res: API.Bot = await fetchBotInfo(id)
  //   if (res?.id) {
  //     setBotInfo(res)
  //   }
  // }
  const checkBot = async (id: string) => {
    const res = await checkBotValid(id)

    if (res?.ActionType === ActionType.False) {
      window.open('https://aiyin.chat/user/register')
    } else {
      setBotInfo({
        id: '1',
        bgImgUrl: '', // 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/ajsq.webp',
        FAQContents: ['你能回答什么问题', '你是谁', '你好'],
        welcomes: ['你好，我是AI小客服', '很高兴为您服务'],
        contact: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/code.jpg',
      })
      if (botInfo.bgImgUrl) {
        document.getElementsByTagName('body')[0].style.backgroundImage =
          "url('https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/ajsq.webp')"
      }
    }
  }

  useEffect(() => {
    if (id) {
      checkBot(id)
    }
  }, [])

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      height: '100vh',
      overflow: 'auto',
      maxWidth: '688px',
      margin: '0 auto',
    }
  })

  const handleJump = () => {
    history.push('/landing')
  }

  return (
    <div className={`${styles.bg} w-full`}>
      <div className={containerClassName}>
        <Helmet>
          <title>
            {intl.formatMessage({
              id: 'menu.dnastaff',
              defaultMessage: 'DNA的AI小客服',
            })}
            - Askio
          </title>
        </Helmet>
        <div style={{ flex: 1, padding: '12px 18px 10px 18px', overflow: 'hidden' }} className="fcc-between">
          <h2 className="text-center mb-0 text-black">Askio 的 AI 小客服</h2>
          <Divider style={{ margin: '12px 0 12px 0' }} />
          <QA
            style={{ flex: 1, overflow: 'auto' }}
            id={botInfo.id}
            contactCode={botInfo.contact}
            FAQContents={botInfo.FAQContents}
            welcomes={botInfo.welcomes}
          />
          <div style={{ textAlign: 'center', padding: 2, color: '#000000', fontSize: 12 }}>
            ©2023 <span onClick={handleJump}>Askio （ 悦问AI ）</span> 提供技术支持
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bot
