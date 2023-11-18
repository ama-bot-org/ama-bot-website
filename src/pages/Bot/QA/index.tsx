import api from '@/services/bot-api/api'
import { Link, useModel } from '@umijs/max'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
// import { useIntl } from '@ant-design/pro-components'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React, { useEffect, useRef, useState } from 'react'
import Dialog from '../Dialog'
import ConfigProvider from 'antd/es/config-provider'
import Tag from 'antd/es/tag'
import Evaluate from '@/components/Evaluate'
import { Divider, Spin, Steps, Tooltip } from 'antd'
import useHistoryDialogs from '@/hooks/useHistory.hook'

type QAProps = {
  id: string
  uuid: string
  model_type: number
  welcomes: string[]
  style?: React.CSSProperties
  isShowAskioProcess?: boolean //是否在顶部展示 askio 用法
  withHistory?: boolean // 对于管理员来说可以看到预览的对话历史，对于公开的bot,暂时不支持展示历史对话
  FAQContents?: string[]
  contactCode?: string
  notShowFastEntrance?: boolean // 默认 undefined 显示快捷入口
  disabledAd?: boolean // 默认 undefined 不显示 Askio 广告
}

export type DialogsType = {
  type: string
  content: any
  id?: number // log_id
  commentType?: number
  fixInfo?: number
  selectClass?: string
}[]

const QA = ({
  withHistory = false,
  isShowAskioProcess = false,
  style,
  id,
  uuid,
  model_type,
  FAQContents,
  contactCode,
  welcomes,
  notShowFastEntrance,
  disabledAd,
}: QAProps) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [question, setQuestion] = React.useState('')
  const [isShowErrorTip, setIsShowErrorTip] = React.useState(false)
  const [dialogs, setDialogs] = React.useState<DialogsType>([])
  const { page, total, loading, getPreviousDialogs, getHistoryTable } = useHistoryDialogs()
  const ulRef = useRef<HTMLUListElement | null>(null)
  const [locked, setLocked] = useState(false)

  const handleScrollTop = () => {
    setTimeout(() => {
      const liItems = document.querySelectorAll(`.dialog-li-${page}`)

      let totalHeight = 0
      liItems.forEach(item => {
        totalHeight += item.clientHeight + 8 // height of each list item
      })
      // 如果是最后一个page, 需要算上欢迎语的高度
      if (total * 2 <= dialogs.length) {
        const liItems = document.querySelectorAll(`.dialog-li-welcome`)
        let welcomesHeight = 0
        liItems.forEach(item => {
          welcomesHeight += item.clientHeight + 8 // height of each list item
        })
        totalHeight += welcomesHeight
      }
      ulRef.current!.scrollTop = totalHeight
    }, 300)
  }

  useEffect(() => {
    handleScrollTop()
  }, [dialogs])

  const updateScroll = () => {
    const element = document.getElementById('bot-dialog')
    if (element) {
      setTimeout(() => {
        element.scrollTop = element.scrollHeight
      }, 500)
    }
  }

  const initHistory = async () => {
    const datas = await getHistoryTable(1)
    datas.forEach(data => {
      Object.assign(data, { selectClass: `dialog-li-${page}` })
    })
    setDialogs(datas)
    updateScroll()
  }

  useEffect(() => {
    if (withHistory) {
      initHistory()
    }
  }, [withHistory])

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
    updateScroll()
    return Promise.resolve(temp)
  }

  const requestQuery = async (_temp: any, text?: string) => {
    const temp = _temp.slice()
    try {
      const result = await api.testQuery({
        bot_id: id,
        content: text || question,
        uuid,
        model_type,
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
    } finally {
      updateScroll()
    }
  }

  const handleTestQuery = async () => {
    if (withHistory && !currentUser?.bot_id) {
      return
    }
    if (!question || !question.trim()) {
      setIsShowErrorTip(true)
      return
    }
    setQuestion('')
    const temp = await loadQuery()
    await requestQuery(temp)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
    setIsShowErrorTip(false)
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
    updateScroll()
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
    updateScroll()
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
    updateScroll()
  }

  const renderEvaluate = () => {
    const [dialog1, dialog2] = dialogs.slice(-2)
    let show = false
    if (dialog1 && dialog2 && dialog2?.type === 'answer') {
      show = true
    }
    return (
      <>
        <div className="clearfix"></div>
        <div className="mx-18">
          <Evaluate
            botId={id}
            show={show}
            prompt={dialog1?.content}
            completion={dialog2?.content}
            commentType={dialog2?.commentType}
            hasFix={dialog2?.fixInfo === 1}
            logId={dialog2?.id}
            className="mt-12"
          />
        </div>
      </>
    )
  }

  // 设置防抖间隔时间，单位毫秒
  const handleScrollDebounced = async (event: React.WheelEvent<HTMLDivElement>, total: number) => {
    if (locked) {
      return
    }

    // 判断滚轮方向
    if (event.deltaY < 0 && ulRef.current && ulRef.current.scrollTop === 0) {
      setLocked(true)
      // 滚动到顶部了
      const res = await getPreviousDialogs(total)
      if (res) {
        const { datas, currentPage } = res
        if (datas) {
          datas.forEach(data => {
            Object.assign(data, { selectClass: `dialog-li-${currentPage}` })
          })
          const temp = datas.concat(dialogs)
          setDialogs(temp)
          setLocked(false)
        }
      }
    }
  }

  return (
    <div style={style} className="w-full flex flex-column overflow-hidden mb-8">
      {loading ? (
        <div className="w-full text-center">
          <Spin />
          加载更多
        </div>
      ) : null}
      <ul
        id={isShowAskioProcess ? 'ama-dialog' : 'bot-dialog'}
        ref={ulRef}
        onWheel={(e: any) => {
          handleScrollDebounced(e, total)
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingInlineStart: 0,
          flex: 1,
          width: '100%',
          maxHeight: isShowAskioProcess ? 'calc(100vh - 240px)' : 'none',
          overflow: 'auto',
        }}
      >
        {isShowAskioProcess ? (
          <>
            {!loading && total * 2 <= dialogs.length ? (
              <>
                <div className="mb-4 mx-18 dialog-li-welcome">
                  <div
                    className="p-16 my-4 bg-white rounded-lg float-left"
                    style={{
                      whiteSpace: 'pre-line',
                      maxWidth: '90%',
                    }}
                  >
                    <div>
                      {`嗨，你已经配置完训练资料了吗？欢迎使用 AI 问答预览功能！在这里，你可以: 
                1. 先随意提问，测试 Askio AI 的回复效果; 
                2. 测试完成后将 Askio 接入你的企业客服渠道，如微信，公众号，企业官网等。对接后，Askio 将扮演一个24小时极速响应的企业客服专家，为您的顾客带来极好的问答咨询体验。`}
                    </div>
                    <Divider />
                    <h4>Askio AI客服部署流程👇</h4>
                    <Steps
                      responsive
                      size="small"
                      current={1}
                      items={[
                        {
                          disabled: true,
                          title: 'AI 训练资料',
                          description: <span style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 14 }}>定制问答库</span>,
                          status: 'process',
                        },
                        {
                          disabled: true,
                          title: 'AI问答预览',
                          status: 'process',
                          description: <span style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 14 }}>测试 AI 问答效果</span>,
                        },
                        {
                          disabled: true,
                          status: 'process',
                          title: 'AI客服配置',
                          description: <span style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 14 }}>接入企业客服渠道</span>,
                        },
                      ]}
                    />
                  </div>
                </div>
                <li className="my-4 mx-18 text-center">
                  {dialogs.length > 0 && total * 2 <= dialogs.length && dialogs.length > 40 ? '—— 没有更多历史信息了 ——' : ''}
                </li>
                {welcomes && welcomes.length > 0 && !loading && total * 2 <= dialogs.length
                  ? welcomes.map((welcome, index) => {
                      return (
                        <li key={index} className="my-2 mx-18 h-auto dialog-li-welcome">
                          <Dialog position="left-bottom">{welcome}</Dialog>
                        </li>
                      )
                    })
                  : null}
              </>
            ) : null}
          </>
        ) : (
          <>
            <li className="my-4 mx-18 text-center">
              {!loading && total * 2 <= dialogs.length && dialogs.length > 40 ? '—— 没有更多历史信息了 ——' : null}
            </li>
            {welcomes && welcomes.length > 0
              ? welcomes.map((welcome, index) => {
                  return (
                    <li key={index} className="my-2 mx-18 h-auto dialog-li-welcome">
                      <Dialog position="left-bottom">{welcome}</Dialog>
                    </li>
                  )
                })
              : null}
          </>
        )}
        {dialogs.map((dialog, index) => {
          return (
            <li key={index} className={`my-4 mx-18 h-auto ${dialog.selectClass}`}>
              <Dialog position={dialog.type === 'question' ? 'right-bottom' : 'left-bottom'}>{dialog.content}</Dialog>
            </li>
          )
        })}
        {renderEvaluate()}
      </ul>
      <div
        style={{
          position: 'relative',
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
        {isShowAskioProcess ? (
          <>
            <div
              className="frc-between relative"
              style={{
                borderRadius: 20,
                backgroundColor: '#ffffffa6',
                padding: '8px',
                width: 'calc(100% - 36px)',
              }}
            >
              <input
                style={{
                  backgroundColor: '#f1eded',
                  border: 'none',
                  fontSize: '14px',
                  flex: 1,
                  height: '40px',
                  borderRadius: '20px',
                  padding: '0px 20px',
                }}
                placeholder="请在此输入您的问题"
                value={question}
                onChange={handleChange}
                onKeyUp={e => {
                  if (e.key === 'Enter') {
                    handleTestQuery()
                  }
                }}
              />
              <Tooltip title="发送">
                <Button
                  style={{
                    position: 'absolute',
                    right: '10px',
                    width: '40px',
                    height: '40px',
                  }}
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  onClick={handleTestQuery}
                />
              </Tooltip>
            </div>
          </>
        ) : (
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
        )}
        {isShowErrorTip && (
          <div
            className="w-full text-left"
            style={{
              color: '#e65c41',
              width: 'auto',
              marginTop: 8,
              paddingLeft: 28,
              position: 'absolute',
              top: -30,
              zIndex: 10,
            }}
          >
            问题不可以为空
          </div>
        )}
      </div>
    </div>
  )
}

export default QA
