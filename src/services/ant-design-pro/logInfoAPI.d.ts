import { ActionType } from './enums'

declare namespace LogInfoAPI {
  type GetLogInfoTableParamsType = {
    bot_id: string
    page: number
    pageSize: number
  }

  type LogInfoTableRow = {
    id: number //编号
    bot_id: string //机器人id
    question: string //问题
    answer: string //答案
    create_date: number //创建时间
  }

  type LogInfoTableResponseType = {
    ActionType: ActionType
    data: {
      count: number
      content: LogInfoTableRow[]
    }
  }
}
