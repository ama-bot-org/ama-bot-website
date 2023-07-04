import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet, history } from '@umijs/max'
import QA from './QA'
import { Divider } from 'antd'
import styles from './index.less'

const DNA: React.FC = () => {
  const intl = useIntl()

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
        <div style={{ flex: 1, padding: '12px 24px 10px 24px', overflow: 'auto', background: '#ffffff33' }} className="fcc-between">
          <h2 className="text-center mb-0 text-white">DNA 的 AI 小客服</h2>
          <Divider style={{ margin: '12px 0 12px 0' }} />
          <QA style={{ flex: 1, overflow: 'hidden' }} />
          <div style={{ textAlign: 'center', padding: 2, color: '#ffffff', fontSize: 12 }}>
            ©2023 <span onClick={handleJump}>Askio （ 悦问AI ）</span> 提供技术支持
          </div>
        </div>
      </div>
    </div>
  )
}

export default DNA
