import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Discord from './Discord'
import H5 from './H5'
import WebPlugin from './WebPlugin'
import WeChat from './WeChat'

const onChange = (key: string) => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `H5`,
    children: <H5 />,
  },
  {
    key: '2',
    label: `网站`,
    children: <WebPlugin />,
  },
  {
    key: '3',
    label: `微信公众号`,
    children: <WeChat />,
  },
  {
    key: '4',
    label: `Discord`,
    children: <Discord />,
  },
]

const Interface = () => {
  return <Tabs defaultActiveKey="1" id="bot-config-interface" items={items} onChange={onChange} />
}

export default Interface
