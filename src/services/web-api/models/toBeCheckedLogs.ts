import { ErrorResponse } from './common'
import { AddStandardWithLogParams } from './standardLib'

export interface GetCUserModifiedInfoTableParams {
  bot_id: string
  page: number
  pageSize: number
  uuid?: string
}

export interface DeleteModifiedInfoParamsType {
  bot_id: string
  log_id: number
}

export interface CommentInfoResponse extends ErrorResponse {
  LogId: number
}

export interface ToBeCheckedLogInfoTableRow {
  id: number //编号
  bot_id: string //机器人id
  prompt: string // 原来的问题
  completion: string // 原来的答案
  modified_answer: string // 修正后的答案
  create_date: number //创建时间
  fix_info: 0 | 1 // 是否已修正
  uuid: string
  answer_type: number
}

export interface CUserModifiedInfoTableResponseType extends ErrorResponse {
  data: {
    count: number
    content: ToBeCheckedLogInfoTableRow[]
  }
}

export interface GetlogInfoByIdParamsType {
  bot_id: string
  uuid: string
  page?: number
  pageSize?: number
  id: number
}

export interface GetlogInfoByIdResponse extends ErrorResponse {
  data: {
    count: number
    content: ToBeCheckedLogInfoTableRow[]
  }
}

export interface AddCUserModifiedInfoParams extends AddStandardWithLogParams {
  modified_answer: string // 修正后的答案
}

export interface AddCUserModifiedInfoResponse extends ErrorResponse {
  data: {
    count: number
    content: ToBeCheckedLogInfoTableRow[]
  }
}
