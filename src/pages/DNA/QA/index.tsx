import api from '@/services/bot-api/api'
import { Link } from '@umijs/max'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
// import { useIntl } from '@ant-design/pro-components'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React, { useEffect } from 'react'
import Dialog from '../Dialog'
import { ConfigProvider, Tag } from 'antd'
import {v5 as uuidv5 } from 'uuid'

const UUID = uuidv5(window.navigator.userAgent, uuidv5.URL)

const FAQContents = [
  '如何预定？',
  'DNA的WiFi密码是多少？',
  'DNA的班车信息？',
  'DNA周边好玩的有哪些？',
  '如何解决吃饭问题？',
  'DNA可以带宠物吗？',
  'DNA的床位价格是多少？',
  'ACDC是什么？',
]

const QA = ({ style }: { style: React.CSSProperties }) => {
  //   const intl = useIntl()
  const [question, setQuestion] = React.useState('')
  const [dialogs, setDialogs] = React.useState<{ type: string; content: any }[]>([])

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
        bot_id: 'suosuo1221@126.com',
        content: text || question,
        uuid: UUID,
        model_type: 0
      })
      if (result.ActionType === 'OK' && result.ans) {
        temp[temp.length - 1].content = result.ans
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
    if (!question) {
      return
    }
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
        {FAQContents.map((item, index) => {
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
        src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/code.jpg"
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
    const element = document.getElementById('dna-dialog')
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  useEffect(() => {
    updateScroll()
  }, [dialogs])

  return (
    <div style={style} className="fcc-between mb-8">
      <ul style={{ display: 'flex', flexDirection: 'column', paddingInlineStart: 0, overflow: 'auto' }} id="dna-dialog">
        <li className="mb-2">
          <Dialog position={'left-bottom'}>Hi 小伙伴，欢迎来到 DNA-安吉数字游民社区。</Dialog>
        </li>
        <li className="my-2">
          <Dialog position={'left-bottom'}>
            <p className="my-2 mb-16">
              我是 Askio，是由游民社区孵化出来的 AI 客服。有关于 DNA 的问题，你可以先问问我看，我对 DNA 的入住价格，班车时刻表，Wi-Fi
              密码等问题很在行的!
            </p>
            <p className="my-2">欢迎在线调戏，但若发现我张口胡说，还请多多担待🥰</p>
            {/* <img src={'/images/leon.svg'} alt="leon" /> */}
          </Dialog>
        </li>
        {dialogs.map((dialog, index) => {
          return (
            <li key={index} className="my-2">
              <Dialog position={dialog.type === 'question' ? 'right-bottom' : 'left-bottom'}>{dialog.content}</Dialog>
            </li>
          )
        })}
      </ul>
      <div
        style={{
          width: '100%',
          height: '90px',
        }}
      >
        <div className="mb-8 frc-between">
          <Tag
            color="#ffffff"
            style={{ fontSize: 14, padding: 3, flex: 1, color: 'black', textAlign: 'center', cursor: 'pointer' }}
            onClick={showFAQ}
          >
            ❓常见问题
          </Tag>
          <Tag
            color="#ffffff"
            style={{ fontSize: 14, padding: 3, flex: 1, color: 'black', textAlign: 'center', cursor: 'pointer' }}
            onClick={showCode}
          >
            🔍人类小伙伴
          </Tag>
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
            prefix={
              <img
                style={{ marginRight: '4px', borderRadius: 20 }}
                width={30}
                height={30}
                src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/User-chat%20icon.svg"
              />
            }
            suffix={<Button type="primary" shape="circle" icon={<SendOutlined />} onClick={handleTestQuery}></Button>}
            value={question}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleTestQuery()
              }
            }}
            onChange={handleChange}
            placeholder="请输入问题"
            style={{
              height: 48,
              lineHeight: '48px',
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default QA
