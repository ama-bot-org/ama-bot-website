import { ActionType } from '@/constants/enums'

// 前端给后台
export interface QAFormInfo {
  id?: number
  bot_id?: string
  prompt: string //问题
  completion: string //回答
}

export interface QATableGetProps {
  bot_id: string
  searchWord?: string
  page: number
  pageSize: number
}

// 后台给前端
export interface GetStandardTableInfoResponse {
  ActionType: ActionType
  data: {
    content: QAFormInfo[]
    count: number
  }
}

export interface QAResponse {
  ActionType: ActionType
  data: QAFormInfo[]
}

export interface QAInfoDeleteProps {
  id: number //编号

  bot_id: string //机器人id
}

export interface QAInfoAddProps {
  bot_id: string
  prompt: string
  completion: string
}

export interface AddStandardInfosResponse {
  ActionType: ActionType
}
