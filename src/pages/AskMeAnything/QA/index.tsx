import './index.less'
import api from '@/services/bot-api/api'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import Steps from 'antd/es/steps'
import { useModel } from '@umijs/max'
import Divider from 'antd/es/divider'
import React, { useEffect, useRef, useState } from 'react'
import Tooltip from 'antd/es/tooltip'
import Button from 'antd/es/button'
import Dialog from '@/pages/Bot/Dialog'
import Evaluate from '@/components/Evaluate'
import useHistoryDialogs from '../../../hooks/useHistory.hook'
import { Spin } from 'antd'
import { DialogsType } from '@/pages/Bot/QA'
import { CommentType } from '@/services/web-api/models/logInfo'

const QA = ({ welcomes, model_type }: { welcomes: string[]; model_type: number }) => {
  //   const intl = useIntl()
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
      console.log('page', page)

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
    const element = document.getElementById('ama-dialog')
    if (element) {
      setTimeout(() => {
        element.scrollTop = element.scrollHeight
      }, 300)
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
    initHistory()
  }, [])

  const loadQuery = async () => {
    const temp = dialogs.slice()
    temp.push({
      type: 'question',
      content: question,
    })
    temp.push({
      type: 'answer',
      content: <LoadingOutlined />,
    })
    setDialogs(temp)
    updateScroll()
    return Promise.resolve(temp)
  }

  const handleTestQuery = async () => {
    if (!currentUser?.bot_id) {
      return
    }
    if (!question || !question.trim()) {
      setIsShowErrorTip(true)
      return
    }
    setQuestion('')

    const temp = await loadQuery()
    try {
      const result = await api.testQuery({
        bot_id: currentUser.bot_id,
        content: question,
        uuid: currentUser.bot_id,
        model_type,
      })
      if (result.ActionType === 'OK' && result.ans) {
        temp[temp.length - 1].content = result.ans
        temp[temp.length - 1].commentType = CommentType.noAction
        temp[temp.length - 1].fixInfo = 0
        setDialogs(temp.slice())
        updateScroll()
        return
      } else {
        throw result.err
      }
    } catch (error) {
      console.log(error)
      temp[temp.length - 1].content = '哎呀，系统开了会儿小差，请重新提问下'
      setDialogs(temp)
      updateScroll()
      setQuestion('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
    setIsShowErrorTip(false)
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
        {dialog2?.commentType !== undefined && (
          <div className="mx-18">
            <Evaluate
              botId={currentUser?.bot_id}
              show={show}
              prompt={dialog1?.content}
              completion={dialog2?.content}
              commentType={dialog2.commentType}
              hasFix={dialog2?.fixInfo === 1}
              className="mt-12 text-left"
            />
          </div>
        )}
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
      console.log('向上滚动')
      setLocked(true)
      // 滚动到顶部了
      const res = await getPreviousDialogs(total)
      if (res) {
        const { datas, currentPage } = res
        if (datas) {
          datas.forEach(data => {
            Object.assign(data, { selectClass: `dialog-li-${currentPage}` })
          })
          console.log('page', currentPage)
          const temp = datas.concat(dialogs)
          setDialogs(temp)
          setLocked(false)
        }
      }
    }
  }

  return (
    <div className="ama-qa-container h-auto fcc-start">
      {/* <li className="my-4">
          <div className="p-10 bg-white rounded-lg float-left">
            <p className="my-4 mb-16">立即接入Askio，精准定制属于你的企业AI客服，共创AI新纪元！</p>
            <p className="my-4">企业邮箱：askiocontact@gmail.com</p>
            <p className="my-4 mb-8">微信咨询商务负责人Leon：</p>
            <img src={'/images/leon.svg'} alt="leon" />
          </div>
        </li> */}
      {loading ? (
        <div className="w-full text-center">
          <Spin />
          加载更多
        </div>
      ) : null}
      <ul
        ref={ulRef}
        onWheel={(e: any) => {
          handleScrollDebounced(e, total)
        }}
        id="ama-dialog"
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingInlineStart: 0,
          flex: 1,
          width: '100%',
          maxHeight: 'calc(100vh - 240px)',
          overflow: 'auto',
        }}
      >
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
        {dialogs.map((dialog, index) => {
          return (
            <li key={index} className={`my-4 mx-18 ${dialog.selectClass}`}>
              <p
                className={`p-10 m-0 rounded-lg ${
                  dialog.type === 'question' ? 'bg-orange color-white float-right' : 'bg-white float-left'
                }`}
                style={{
                  maxWidth: '70%',
                  wordBreak: 'break-all',
                }}
              >
                {dialog.content}
              </p>
            </li>
          )
        })}
        {renderEvaluate()}
      </ul>
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
      {isShowErrorTip && (
        <div className="w-full text-left" style={{ color: '#e65c41', width: 'calc(100% - 36px)', marginTop: 8, paddingLeft: 28 }}>
          不可发送空消息
        </div>
      )}
    </div>
  )
}

export default QA
