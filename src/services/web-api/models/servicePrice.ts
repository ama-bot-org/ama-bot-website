import { ErrorResponse } from './common'

export type UserLimitDataType = {
  user_type: number
  yuliao_count: number
  standard_count: number
  answer_count: number
  limit_date: string
}
export interface GetUserLimitResType extends ErrorResponse {
  data: UserLimitDataType
}

export interface GetUserLimitParamsType {
  bot_id: string
}
