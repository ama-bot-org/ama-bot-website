import { ActionType } from '@/constants/enums'

export type TestQueryParams = {
  bot_id: string
  content: string
  uuid: string
  model_type: number
  prompt?: string
}

export type TestQueryResult = {
  ActionType: ActionType
  ans?: string
  err?: string
}

export type UpdateQueryParams = {
  bot_id: string
}

export type UpdateQueryResult = {
  ActionType: ActionType
  ErrorCode?: string
}
