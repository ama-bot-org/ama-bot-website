import useBotModel from '@/hooks/useBot'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import Loading from '@/components/Loading'
import QA from '../Bot/QA'

const AskMeAnything: React.FC = () => {
  const intl = useIntl()
  const { loading, botInfo } = useBotModel()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflow: 'auto',
    }
  })

  if (loading) {
    return <Loading />
  }

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.ama',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
        <QA
          withHistory
          disabledAd
          isShowAskioProcess
          welcomes={botInfo.welcomes}
          model_type={botInfo.model_type}
          id={botInfo.id}
          uuid={botInfo.id}
        />
      </div>
    </div>
  )
}

export default AskMeAnything
