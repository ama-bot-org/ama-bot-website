import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import CorpusFromFile from './CorpusFromFile'
import CorpusFromManual from './CorpusFromManual'
import CorpusFromNotion from './CorpusFromNotion'

const Corpus: React.FC = () => {
  const intl = useIntl()

  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Notion`,
      children: <CorpusFromNotion />,
    },
    {
      key: '2',
      label: `文件上传`,
      children: <CorpusFromFile />,
    },
    {
      key: '3',
      label: `手动更新`,
      children: <CorpusFromManual />,
    },
  ]

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
    }
  })

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.robot-config.corpus',
            defaultMessage: '语料库',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: 0, overflow: 'auto' }}>
        <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
      </div>
    </div>
  )
}

export default Corpus
