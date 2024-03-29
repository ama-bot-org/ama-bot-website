import { useState } from 'react'
import BaseInfoForm from './BaseInfoForm'
import BaseInfoPreview from './BaseInfoPreview'
import { BotDataType } from '@/models/bot'
import Divider from 'antd/es/divider'
import { isMobile } from 'react-device-detect'

const BaseInfo = () => {
  const [baseInfo, setBaseInfo] = useState<BotDataType>({} as BotDataType)

  const handleBaseInfoChange = (baseInfo: BotDataType) => {
    setBaseInfo(baseInfo)
  }

  return (
    <div className={`${isMobile ? 'fcs-between' : 'frs-between'}`}>
      <div className="flex-1 overflow-auto p-10">
        <h3>机器人配置：</h3>
        <BaseInfoForm onSaved={handleBaseInfoChange} />
      </div>
      <Divider type={isMobile ? 'horizontal' : 'vertical'} />
      <div className="flex-1 overflow-auto p-10">
        <h3
          style={{
            maxWidth: '688px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          效果预览：
        </h3>
        <BaseInfoPreview botInfo={baseInfo} />
      </div>
    </div>
  )
}

export default BaseInfo
