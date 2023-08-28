import { ErrorResponse } from './common'

export interface GetLogInfoTableParamsType {
  bot_id: string
  page: number
  pageSize: number
}

export enum CommentType {
  like = 1, //点赞
  unlike = 2, //点踩
}
export interface CommentInfoParamsType {
  bot_id: string
  question: string
  comment_type: CommentType
}

export interface CommentInfoResponse extends ErrorResponse {
  LogId: number
}

export interface LogInfoTableRow {
  id: number //编号
  bot_id: string //机器人id
  question: string //问题
  answer: string //答案
  create_date: number //创建时间
  fix_info: 0 | 1 // 是否已修正
}

export interface LogInfoTableResponseType extends ErrorResponse {
  data: {
    count: number
    content: LogInfoTableRow[]
  }
}
