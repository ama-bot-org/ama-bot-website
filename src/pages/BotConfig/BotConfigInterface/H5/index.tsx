import { ChangeEvent, useEffect, useState } from 'react'
import { useModel } from '@umijs/max'
import { flushSync } from 'react-dom'
import { Button, Input, message } from 'antd'
import CopyLink from '../components/CopyLink'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import BotAPI from '@/services/web-api/bot'

const H5 = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [copied, setCopied] = useState(false)
  const [value, setValue] = useState('') // 你要复制的文本
  const [disabled, setDisabled] = useState(true)
  const [subDomain, setSubDomain] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (currentUser?.bot_id || currentUser?.html_url) {
      setSubDomain(`${currentUser?.html_url || currentUser.bot_id}`)
      setValue(`${REACT_APP_OFFICIAL_SITE}/bot/${currentUser?.html_url || currentUser.bot_id}`)
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSubDomain(value)
    const subdomainRegex: RegExp = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/
    if (!subdomainRegex.test(value)) {
      setErrorMessage('子域名最好是由英文字母，数字组成，不建议特殊字符，不可以以-开头和结尾')
    } else {
      setErrorMessage('')
    }
  }

  const handleSubmit = async () => {
    if (currentUser && currentUser.bot_id) {
      const result = await BotAPI.updateBotSubDomain({
        bot_id: currentUser.bot_id,
        html_url: subDomain,
      })
      if (result.ActionType === 'OK') {
        // 同步全局更新 initialState.currentUser
        const data = { ...initialState?.currentUser, html_url: subDomain }
        localStorage.setItem('user', JSON.stringify(data))
        flushSync(() => {
          setInitialState((s: any) => ({
            ...s,
            currentUser: data,
          }))
        })
        setDisabled(true)
        setValue(`${REACT_APP_OFFICIAL_SITE}/${subDomain}`)
        setErrorMessage('')
      } else if (result.message) {
        setErrorMessage(result.message)
      }
    }
  }

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
      <div
        onDoubleClick={() => {
          setDisabled(false)
        }}
      >
        <Input
          disabled={disabled}
          style={{
            width: 'auto',
          }}
          value={subDomain}
          onChange={e => {
            handleChange(e)
          }}
          allowClear
          prefix={`${REACT_APP_OFFICIAL_SITE}/bot/`}
        />
        {disabled ? (
          <CopyLink linkUrl={value} />
        ) : (
          <Button
            type="text"
            style={{
              color: '#e65c41',
            }}
            icon={<SaveOutlined />}
            onClick={() => {
              handleSubmit()
            }}
          >
            保存
          </Button>
        )}
      </div>
      {errorMessage ? (
        <div
          style={{
            fontSize: '12px',
            marginTop: '8px',
            color: 'red',
          }}
        >
          {errorMessage}
        </div>
      ) : null}
      <div
        style={{
          fontSize: '12px',
          marginTop: '8px',
          color: '#00000066',
        }}
      >
        嫌链接太长？双击<span style={{ color: '#00000077', fontWeight: 'bold' }}>上方输入框</span>修改您的专属域名
      </div>
    </div>
  )
}

export default H5
