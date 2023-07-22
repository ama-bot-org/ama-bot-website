import React from 'react'
import { Timeline } from 'antd'

/**
 * @description 自定义时间轴组件
 * @props steps：React.ReactNode[]
 * @returns
 */
const TimeLineStep = ({ steps }: { steps: React.ReactNode[] }) => {
  return (
    <Timeline
      className="ml-4"
      items={steps.map((step, index) => {
        return {
          dot: <span className="timeline-dot">{index + 1}</span>,
          children: step,
        }
      })}
    />
  )
}

export default TimeLineStep
