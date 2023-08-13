import api from '@/services/bot-api/api'
import { Link } from '@umijs/max'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
// import { useIntl } from '@ant-design/pro-components'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React, { useEffect } from 'react'
import Dialog from '../Dialog'
import ConfigProvider from 'antd/es/config-provider'
import Tag from 'antd/es/tag'
import Evaluate from '@/components/Evaluate'

type QAProps = {
  style: React.CSSProperties
  id: string
  FAQContents?: string[]
  welcomes: string[]
  contactCode?: string
  notShowFastEntrance?: boolean // 默认 undefined 显示快捷入口
  disabledAd?: boolean // 默认 undefined 不显示 Askio 广告
  hasEvaluateFix?: boolean // 是否有评论修复
}

const QA = ({ style, id, FAQContents, contactCode, welcomes, notShowFastEntrance, disabledAd, hasEvaluateFix = true }: QAProps) => {
  const [question, setQuestion] = React.useState('')
  const [dialogs, setDialogs] = React.useState<{ type: string; content: any, isApiAwnser?: boolean }[]>([])

  const loadQuery = async (text?: string | React.ReactNode) => {
    const temp = dialogs.slice()
    temp.push({
      type: 'question',
      content: text || question,
    })
    temp.push({
      type: 'answer',
      content: <LoadingOutlined />,
    })
    setDialogs(temp)
    setQuestion('')
    return Promise.resolve(temp)
  }

  const requestQuery = async (_temp: any, text?: string) => {
    const temp = _temp.slice()
    try {
      const result = await api.testQuery({
        bot_id: id,
        content: text || question,
      })
      if (result.ActionType === 'OK' && result.ans) {
        temp[temp.length - 1].content = result.ans
        temp[temp.length - 1].isApiAwnser = true
      } else {
        temp[temp.length - 1].content = '哎呀，系统开了会儿小差，请重新提问下'
        console.log(result?.err)
      }
      setDialogs(temp)
      setQuestion('')
    } catch (error) {
      console.log(error)
      temp[temp.length - 1].content = '哎呀，系统开了会儿小差，请重新提问下'
      setDialogs(temp)
      setQuestion('')
    }
  }

  const handleTestQuery = async () => {
    const temp = await loadQuery()
    await requestQuery(temp)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  // 点击已经设定好的问题
  const handleAsk = async (text: string) => {
    const temp = await loadQuery(text)
    await requestQuery(temp, text)
  }

  const showFAQ = async () => {
    const temp = dialogs.slice()
    const content = (
      <div>
        {FAQContents!.map((item, index) => {
          return (
            <div key={index}>
              <p
                style={{
                  textDecoration: 'underline',
                  marginBottom: 8,
                  color: '#e65c41',
                }}
                onClick={() => {
                  handleAsk(item)
                }}
              >
                {index + 1}.{item}
              </p>
            </div>
          )
        })}
      </div>
    )
    temp.push({
      type: 'question',
      content: '有哪些常见问题？',
    })
    temp.push({
      type: 'answer',
      content: content,
    })
    setDialogs(temp)
  }

  const showCode = () => {
    const temp = dialogs.slice()
    const content = (
      <img
        style={{
          aspectRatio: '220/303',
        }}
        src={contactCode}
        width="100%"
        height="auto"
      />
    )
    temp.push({
      type: 'question',
      content: '召唤人类小伙伴',
    })
    temp.push({
      type: 'answer',
      content: content,
    })
    setDialogs(temp)
  }

  const showAskio = () => {
    const temp = dialogs.slice()
    const content = (
      <Link to="/landing" target="_blank" rel="noreferrer">
        <span
          style={{
            color: '#e65c41',
          }}
        >
          Askio官网介绍
        </span>
      </Link>
    )
    temp.push({
      type: 'question',
      content: '我想了解一下Askio',
    })
    temp.push({
      type: 'answer',
      content: content,
    })
    setDialogs(temp)
  }

  const updateScroll = () => {
    const element = document.getElementById('bot-dialog')
    if (element) {
      setTimeout(() => {
        element.scrollTop = element.scrollHeight
      }, 300)
    }
  }

  const renderEvaluate = () => {
    const [ dialog1, dialog2 ] = dialogs.slice(-2)
    let show = false
    if(dialog1 && dialog2 && dialog2?.type === 'answer' && dialog2?.isApiAwnser ){
      show = true
    }
    return (
      <>
        <div className="clearfix"></div>
        <div className="mx-18">
          <Evaluate hasFix={hasEvaluateFix} show={show} prompt={dialog1?.content} completion={dialog2?.content} className="mt-12" />
        </div>
      </>
    )
  }

  useEffect(() => {
    updateScroll()
  }, [dialogs])

  return (
    <div style={style} className="w-full flex flex-column overflow-hidden mb-8">
      <ul style={{ display: 'flex', flexDirection: 'column', paddingInlineStart: 0, overflow: 'auto' }} className="flex-1" id="bot-dialog">
        {welcomes && welcomes.length > 0
          ? welcomes.map((welcome, index) => {
              return (
                <li key={index} className="my-2 mx-18 h-auto">
                  <Dialog position="left-bottom">{welcome}</Dialog>
                </li>
              )
            })
          : null}
        {dialogs.map((dialog, index) => {
          return (
            <li key={index} className="my-2 mx-18 h-auto">
              <Dialog position={dialog.type === 'question' ? 'right-bottom' : 'left-bottom'}>{dialog.content}</Dialog>
            </li>
          )
        })}
        {renderEvaluate()}
      </ul>
      <div
        style={{
          width: 'auto',
          height: disabledAd ? '54px' : '90px',
          textAlign: 'center',
        }}
      >
        <div
          className="mb-8 frc-between"
          style={{
            display: notShowFastEntrance || disabledAd ? 'none' : 'inherit',
          }}
        >
          {FAQContents && FAQContents.length > 0 ? (
            <Tag
              color="#ffffff"
              style={{ fontSize: 14, padding: 3, flex: 1, color: 'black', textAlign: 'center', cursor: 'pointer' }}
              onClick={showFAQ}
            >
              ❓常见问题
            </Tag>
          ) : null}
          {contactCode ? (
            <Tag
              color="#ffffff"
              style={{ fontSize: 14, padding: 3, flex: 1, color: 'black', textAlign: 'center', cursor: 'pointer' }}
              onClick={showCode}
            >
              🔍人类小伙伴
            </Tag>
          ) : null}
          <Tag
            color="#ffffff"
            style={{ fontSize: 14, padding: 3, marginRight: 0, flex: 1, color: 'black', textAlign: 'center', cursor: 'pointer' }}
            onClick={showAskio}
          >
            👉了解Askio
          </Tag>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Input
            suffix={
              <Button
                style={{
                  width: 48,
                  height: 48,
                  transform: 'translateX(12px)',
                }}
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleTestQuery}
              ></Button>
            }
            value={question}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleTestQuery()
              }
            }}
            onChange={handleChange}
            placeholder={'请输入问题'}
            style={{
              width: '94%',
              height: 48,
              lineHeight: '48px',
              borderRadius: 24,
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default QA
