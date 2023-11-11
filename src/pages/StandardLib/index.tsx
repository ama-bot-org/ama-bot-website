import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Helmet, useIntl } from '@umijs/max'
import React, { useEffect, useState } from 'react'
import Tabs from 'antd/es/tabs'
import HomeSvg from './Icons/HomeSvg'
import TobeCheckedSvg from './Icons/TobeCheckedSvg'
import type { TabsProps } from 'antd/es/tabs'
import StandardLibTab from './StandardLibTab'
import ToBeProcessedTab from './ToBeProcessedTab'
import Settings from '../../../config/defaultSettings'
import { Badge } from 'antd'
import useModifiedInfo from '@/hooks/useModifiedInfo.hook'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'

const LibTabs: React.FC = () => {
  const intl = useIntl()

  const { getToBeCheckedLogsTotal, total: initialTotal, loading } = useModifiedInfo()
  const [total, setTotal] = useState(initialTotal)

  useEffect(() => {
    getToBeCheckedLogsTotal()
  }, [])

  useEffect(() => {
    setTotal(initialTotal)
  }, [initialTotal])

  const handleToBeProcessedTabUpdate = (newTotal: number) => {
    setTotal(newTotal)
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
          <HomeSvg />
          <span className="ml-4">问答库</span>
        </span>
      ),
      children: <StandardLibTab />,
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
          <TobeCheckedSvg />
          <span
            className="relative ml-4 text-16"
            style={{
              color: 'current-color',
            }}
          >
            待处理
            <Badge
              count={loading ? <LoadingOutlined /> : total}
              showZero={false}
              style={{
                position: 'absolute',
                top: -20,
                right: 0,
              }}
            ></Badge>
          </span>
        </span>
      ),
      children: <ToBeProcessedTab onUpdate={handleToBeProcessedTabUpdate} />,
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
        <title>
          {intl.formatMessage({
            id: 'menu.database-config.standard-lib',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: 0, overflow: 'auto' }}>
        <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
      </div>
    </div>
  )
}

export default LibTabs
