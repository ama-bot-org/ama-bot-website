import { EmptyProps } from 'antd'
import type { FC } from 'react'

const Empty: FC<EmptyProps> = props => {
  return (
    <div className="fcc-center">
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        {...props}
        description={
          <div>
            <h2>暂无内容</h2>
            <h4>再看看其他的吧</h4>
          </div>
        }
      />
    </div>
  )
}

export default Empty
