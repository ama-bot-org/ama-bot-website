import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import React from 'react'
import Tabs from 'antd/es/tabs'
import FileSvg from './Icons/FileSvg'
import ManualSvg from './Icons/ManualSvg'
import NotionSvg from './Icons/NotionSvg'
import type { TabsProps } from 'antd/es/tabs'
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
      label: (
        <span
          className="frc-center"
          style={{
            fontSize: 16,
          }}
        >
          <FileSvg />
          <span className="ml-4">文件上传</span>
        </span>
      ),
      children: <CorpusFromFile />,
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
          <ManualSvg />
          <span className="ml-4">文本输入</span>
        </span>
      ),
      children: <CorpusFromManual />,
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
          <NotionSvg />
          <span className="ml-4">Notion</span>
        </span>
      ),
      children: <CorpusFromNotion />,
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
            id: 'menu.robot-config.corpus',
            defaultMessage: '语料库',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: 0, overflow: 'auto' }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} destroyInactiveTabPane />
      </div>
    </div>
  )
}

export default Corpus
