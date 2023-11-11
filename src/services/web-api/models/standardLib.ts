import { ErrorResponse } from './common'
import { LogInfoTableRow } from './logInfo'

// 前端给后台
export interface QAFormInfo {
  id?: number
  bot_id?: string
  prompt: string // 问题
  completion: string // 原回答
  modified_answer?: string // 修正后的回答
}

export interface QATableGetProps {
  bot_id: string
  searchWord?: string
  page: number
  pageSize: number
}

// 后台给前端
export interface GetStandardTableInfoResponse extends ErrorResponse {
  data: {
    content: QAFormInfo[]
    count: number
  }
}

export interface QAResponse extends ErrorResponse {
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

export interface QAInfoAddProps {
  bot_id: string
  prompt: string
  completion: string
}

export interface AddStandardInfosResponse {
  message?: string
}

export interface AddStandardWithLogParams {
  bot_id: string
  prompt: string
  completion: string // 原答案
  log_id: number
}

export interface AddStandardWithLogResponse extends ErrorResponse {
  data: {
    count: number
    content: LogInfoTableRow[]
  }
}
