import { useState } from 'react'
import BaseInfoForm from './BaseInfoForm'
import BaseInfoPreview from './BaseInfoPreview'
import { BotDataType } from '@/models/bot'

const BaseInfo = () => {
  const [baseInfo, setBaseInfo] = useState<BotDataType>({} as BotDataType)

  const handleBaseInfoChange = (baseInfo: BotDataType) => {
    setBaseInfo(baseInfo)
  }

  return (
    <div className="frs-between flex-wrap">
      <div className="flex-1 overflow-auto p-10">
        <BaseInfoForm onChange={handleBaseInfoChange} />
      </div>
      <div className="flex-1 overflow-auto  p-10">
        <BaseInfoPreview botInfo={baseInfo} />
      </div>
    </div>
  )
}

export default BaseInfo
