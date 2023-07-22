import { useEffect, useState } from 'react'
import { useModel } from '@umijs/max'
import { Input, message } from 'antd'
import CopyLink from './components/CopyLink'

const H5 = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [copied, setCopied] = useState(false)
  const [value, setValue] = useState('') // 你要复制的文本

  useEffect(() => {
    if (currentUser?.bot_id) {
      setValue(`${REACT_APP_OFFICIAL_SITE}/bot/${currentUser.bot_id}`)
    }
    return () => {}
  }, [currentUser])

  useEffect(() => {
    if (copied) {
      message.success('复制成功')
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
    return () => {}
  }, [copied])

  return (
    <div>
      <div
        style={{
          fontSize: '16px',
          fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
          marginBottom: '8px',
        }}
      >
        H5访问链接
      </div>
      <div
        style={{
          fontSize: '14px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
          marginBottom: '8px',
          color: '#131415',
        }}
      >
        将H5链接复制并分享到你的企业客服渠道
      </div>
      <Input
        style={{
          width: 'auto',
        }}
        value={currentUser?.bot_id}
        prefix={`${REACT_APP_OFFICIAL_SITE}/`}
      />
      <CopyLink linkUrl={value} />
    </div>
  )
}

export default H5
