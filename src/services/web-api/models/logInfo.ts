import { ErrorResponse } from './common'

export interface GetLogInfoTableParamsType {
  bot_id: string
  page: number
  pageSize: number
  answer_type?: number
  comment_type?: CommentType
  uuid?: string
}

/**
 * 枚举定义评论类型
 */
export enum CommentType {
  /**
   * 没有交互
   */
  noAction = 0,

  /**
   * 点赞
   */
  like = 1,

  /**
   * 点踩
   */
  unlike = 2,
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
  uuid: string
  comment_type: CommentType
  answer_type: number
}

export interface LogInfoTableResponseType extends ErrorResponse {
  data: {
    count: number
    content: LogInfoTableRow[]
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
    content: LogInfoTableRow[]
  }
}
