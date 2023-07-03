import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
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

  return (
    <div className={`${styles.bg} w-full`}>
      <div className={containerClassName}>
        <Helmet>
          <title>
            {intl.formatMessage({
              id: 'menu.ama',
              defaultMessage: 'DNA的AI小客服',
            })}
            - {Settings.title}
          </title>
        </Helmet>
        <div style={{ flex: 1, padding: '24px 24px 10px 24px', overflow: 'auto', background: '#f0f8ff87' }} className="fcc-between">
          <h2 className="text-center mb-0">DNA 的 AI 小客服</h2>
          <Divider />
          <QA style={{ flex: 1, overflow: 'auto' }} />
          <div style={{ textAlign: 'center', padding: 2 }}>
            <div>
              ©2023
              <span
                style={{
                  color: '#e65c41',
                  marginRight: 8,
                  marginLeft: 8,
                }}
              >
                Askio - 悦问AI
              </span>
              提供技术支持
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DNA
