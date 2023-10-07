import { useEffect, useState } from 'react'
import Image from 'antd/es/image'
import CopyLink from '../components/CopyLink'
import TimeLineStep from './TimeLineStep'
import { useModel } from '@umijs/max'
import Divider from 'antd/es/divider'
import { isMobile } from 'react-device-detect'
import { getOrigin } from '@/utils'

const WeChat = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [value, setValue] = useState('') // 你要复制的文本

  useEffect(() => {
    if (currentUser?.bot_id) {
      setValue(`${getOrigin()}/bot/${currentUser.html_url}`)
    }
    return () => {}
  }, [currentUser])

  const steps1 = [
    <div key="1">
      <div>
        进入
        <a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer" className="orange-a">
          「微信公众号后台」
        </a>
      </div>
      <div>{'路径：内容与互动 > 自定义菜单 > 添加菜单'}</div>
    </div>,
    <div key="2">
      <div>创建菜单</div>
      <div>填写菜单名称，把以下链接复制到菜单里</div>
      <div>
        <span className="mr-8">{value}</span>
        <CopyLink linkUrl={value} />
      </div>
    </div>,
  ]

  const steps2 = [
    <div key="1">
      <div>
        进入
        <a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer" className="orange-a">
          「微信公众号后台」
        </a>
      </div>
      <div>{'路径：内容与互动 > 自动回复 > 收到消息回复'}</div>
    </div>,
    <div key="2">
      <div>创建自动回复</div>
      <div>选择自动回复类型，把以下链接复制到回复里</div>
      <div>
        <span className="mr-8">{value}</span>
        <CopyLink linkUrl={value} />
      </div>
    </div>,
  ]

  return (
    <div className="wechat-container">
      <div className="wechat-left">
        <h3>微信服务号</h3>
        <TimeLineStep steps={steps1} />
        <div className="left-img-wrap">
          <Image
            wrapperStyle={{
              width: '100%',
              height: '100%',
            }}
            style={{ width: '94%', height: 'auto', objectFit: 'cover' }}
            src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/wechat-interface/left.png"
          />
        </div>
      </div>
      <Divider type={isMobile ? 'horizontal' : 'vertical'} />
      <div className="wechat-right">
        <h3>微信订阅号</h3>
        <TimeLineStep steps={steps2} />
        <div className="left-img-wrap">
          <Image
            wrapperStyle={{ width: '100%', height: '100%' }}
            style={{ width: '94%', height: 'auto', objectFit: 'cover' }}
            src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/wechat-interface/right.png"
          />
        </div>
      </div>
    </div>
  )
}

export default WeChat
