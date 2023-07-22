// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { GetLogInfoTableParamsType, LogInfoTableResponseType } from './models/logInfo'

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

export default {
  getHistoryTable,
}
