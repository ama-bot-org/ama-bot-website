import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import QA from './QA'
import CorpusUpdateButton from '@/components/CorpusUpdateButton'

const AskMeAnything: React.FC = () => {
  const intl = useIntl()
  const [loading, setLoading] = React.useState(false)

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
    }
  })

  const handleLoading = (loading: boolean) => {
    setLoading(loading)
  }

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.ama',
            defaultMessage: 'AI问答',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
        <CorpusUpdateButton onLoading={handleLoading} />
        <QA corpusLoading={loading} />
      </div>
    </div>
  )
}

export default AskMeAnything
