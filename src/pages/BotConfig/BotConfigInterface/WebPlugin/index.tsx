import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import HTMLCode from './HTMLCode'
import ReactCode from './ReactCode'
import VueCode from './VueCode'

const onChange = (key: string) => {
  console.log(key)
}

const WebPlugin = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `HTML`,
      children: <HTMLCode />,
    },
    {
      key: '2',
      label: `React`,
      children: <ReactCode />,
    },
    {
      key: '3',
      label: `Vue`,
      children: <VueCode />,
    },
  ]

  return (
    <div>
      <div
        style={{
          fontSize: '16px',
          fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
          marginBottom: '8px',
        }}
      >
        以插件形式接入网站
      </div>

      <div>
        <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} destroyInactiveTabPane />
      </div>
    </div>
  )
}

export default WebPlugin
