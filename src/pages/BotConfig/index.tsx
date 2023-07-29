import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Helmet } from '@umijs/max'
import React from 'react'
import Tabs from 'antd/es/tabs'
import BasicSvg from './Icons/BasicSvg'
import CustomSvg from './Icons/CustomSvg'
import InterfaceSvg from './Icons/InterfaceSvg'
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
      label: (
        <span
          className="frc-center"
          style={{
            fontSize: 16,
          }}
        >
          <BasicSvg />
          <span className="ml-4">基本信息</span>
        </span>
      ),
      children: <BaseInfo />,
    },
    {
      key: '2',
      label: (
        <span
          className="frc-center"
          style={{
            fontSize: 16,
          }}
        >
          <CustomSvg />
          <span className="ml-4">品牌定制</span>
        </span>
      ),
      children: <Custom />,
    },
    {
      key: '3',
      label: (
        <span
          className="frc-center"
          style={{
            fontSize: 16,
          }}
        >
          <InterfaceSvg />
          <span className="ml-4">平台接入</span>
        </span>
      ),
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
