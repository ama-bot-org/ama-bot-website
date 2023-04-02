import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'

const VisualProgramming: React.FC = () => {
  const intl = useIntl()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    }
  })

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.robot-config.visual-programming',
            defaultMessage: '可视化编程',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>VisualProgramming</div>
    </div>
  )
}

export default VisualProgramming
