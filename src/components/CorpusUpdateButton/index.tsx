import api from '@/services/bot-api/api'
import { useModel } from '@umijs/max'
import Button from 'antd/es/button'
import { useEffect, useState } from 'react'

type CorpusUpdateButtonProps = {
  onLoading?: (loading: boolean) => void
}

const CorpusUpdateButton = ({ onLoading }: CorpusUpdateButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

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

  useEffect(() => {
    if (onLoading) {
      onLoading(loading)
    }
  }, [loading])

  return (
    <Button onClick={handleUpdateCorpus} type="primary" disabled={loading} loading={loading}>
      更新数据到机器人
    </Button>
  )
}

export default CorpusUpdateButton
