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
        <li className="mb-4">
          <p className="p-10 my-4 bg-white rounded-lg float-left">
            你好，我是Askio！一个24小时极速响应的AI。能够为您优化80%以上的客服成本，且回复满意率高达98%。Askio将扮演专业的企业客服专家，为您的顾客带来极好的问答咨询体验。
          </p>
        </li>
        <li className="my-4">
          <div className="p-10 bg-white rounded-lg float-left">
            <p className="my-4 mb-16">立即接入Askio，精准定制属于你的企业AI客服，共创AI新纪元！</p>
            <p className="my-4">企业邮箱：askiocontact@gmail.com</p>
            <p className="my-4 mb-8">微信咨询商务负责人Leon：</p>
            <img src={'/images/leon.svg'} alt="leon" />
          </div>
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
