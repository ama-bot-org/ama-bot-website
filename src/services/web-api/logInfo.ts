// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import {
  CommentInfoParamsType,
  CommentInfoResponse,
  GetlogInfoByIdParamsType,
  GetlogInfoByIdResponse,
  GetLogInfoTableParamsType,
  LogInfoTableResponseType,
} from './models/logInfo'
import { ErrorResponse } from './models/common'

// 根据机器人id获取对话的历史记录
async function getHistoryTable(params: GetLogInfoTableParamsType) {
  return request<LogInfoTableResponseType>('/api/app/log/logInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

// 根据机器人id和问答信息点赞或点踩
async function commentInfo(params: CommentInfoParamsType) {
  return request<CommentInfoResponse>('/api/app/log/commentInfo', {
    method: 'POST',
    data: params,
  })
}

// 根据机器人id和uuid获取历史问答信息
async function getlogInfoById(params: GetlogInfoByIdParamsType) {
  return request<GetlogInfoByIdResponse>('/api/app/log/logInfoById', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

export default {
  getHistoryTable,
  commentInfo,
  getlogInfoById
}
