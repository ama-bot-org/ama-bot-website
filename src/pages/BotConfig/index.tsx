import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Helmet } from '@umijs/max'
import React from 'react'
import Tabs from 'antd/es/tabs'
import type { TabsProps } from 'antd/es/tabs'
import BaseInfo from './BotConfigBaseInfo'
import Custom from './BotConfigCustom'
import Interface from './BotConfigInterface'

const BotConfig: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `基本信息`,
      children: <BaseInfo />,
    },
    {
      key: '2',
      label: `品牌定制`,
      children: <Custom />,
    },
    {
      key: '3',
      label: `平台接入`,
      children: <Interface />,
    },
  ]

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      overflow: 'auto',
    }
  })

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>AI 客服配置</title>
      </Helmet>
      <div style={{ flex: 1, padding: 0, overflow: 'auto' }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} destroyInactiveTabPane />
      </div>
    </div>
  )
}

export default BotConfig
