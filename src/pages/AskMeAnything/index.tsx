import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet, useModel } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import Button from 'antd/es/Button'
import api from '@/services/bot-api/api'
import QA from './QA'

const AskMeAnything: React.FC = () => {
  const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [loading, setLoading] = React.useState(false)

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
    }
  })

  const handleUpdateCorpus = async () => {
    if (!currentUser?.bot_id) {
      return
    }
    setLoading(true)
    try {
      await api.updateQuery({
        bot_id: currentUser.bot_id,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
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
        <Button onClick={handleUpdateCorpus} type="primary" disabled={loading} loading={loading}>
          更新语料库
        </Button>
        <QA corpusLoading={loading} />
      </div>
    </div>
  )
}

export default AskMeAnything
