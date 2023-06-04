import api from '@/services/bot-api/api'
import { LoadingOutlined, SendOutlined } from '@ant-design/icons'
// import { useIntl } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import React from 'react'

const QA = ({ corpusLoading }: { corpusLoading: boolean }) => {
  //   const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [question, setQuestion] = React.useState('')
  const [dialogs, setDialogs] = React.useState<{ type: string; content: any }[]>([])

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
    return Promise.resolve(temp)
  }

  const handleTestQuery = async () => {
    if (!currentUser?.bot_id) {
      return
    }
    const temp = await loadQuery()
    try {
      const result = await api.testQuery({
        bot_id: currentUser.bot_id,
        content: question,
      })
      if (result.ActionType === 'OK' && result.ans) {
        temp[temp.length - 1].content = result.ans
      } else {
        temp[temp.length - 1].content = '抱歉，我还不知道怎么回答这个问题'
        console.log(result?.err)
      }
      setDialogs(temp)
      setQuestion('')
    } catch (error) {
      console.log(error)
      temp[temp.length - 1].content = '抱歉，我还不知道怎么回答这个问题'
      setDialogs(temp)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  return corpusLoading ? (
    <div>语料库更新中...</div>
  ) : (
    <div>
      <ul style={{ display: 'flex', flexDirection: 'column', paddingInlineStart: 0 }}>
        <li>
          <p className="p-10 my-4 bg-white rounded-lg float-left">欢迎来到悦问</p>
        </li>
        <li>
          <p className="p-10 my-4 bg-white rounded-lg float-left">
            为你量身定制AI，24小时在线提供问答服务。组织客服AI：以文本形式上传你的组织数据库，8小时后完成AI训练，为你量身定制一个组织客服系统。个人数字孪生：将你的个人知识系统，如notion文档数据库，授权给艾因智能，便可创造一个数字孪生专家，24小时在线为你回答用户提出的现有知识系统内的任何已知问题。
          </p>
        </li>
        {dialogs.map((dialog, index) => {
          return (
            <li key={index} className="my-4">
              <p className={`p-10 m-0 bg-white rounded-lg ${dialog.type === 'question' ? 'float-left' : 'float-right'}`}>
                {dialog.content}
              </p>
            </li>
          )
        })}
      </ul>
      <Input
        prefix={<img style={{ marginRight: '4px' }} width={32} height={32} src="favicon.ico" />}
        suffix={
          <Button type="primary" icon={<SendOutlined />} onClick={handleTestQuery}>
            发送
          </Button>
        }
        value={question}
        onKeyUp={e => {
          if (e.key === '13') {
            handleTestQuery()
          }
        }}
        onChange={handleChange}
        placeholder="请输入问题"
      />
    </div>
  )
}

export default QA
