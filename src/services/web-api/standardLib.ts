import { request } from '@umijs/max'
import {
  AddStandardInfosResponse,
  QATableGetProps,
  GetStandardTableInfoResponse,
  QAFormInfo,
  QAResponse,
  QAInfoDeleteProps,
  QAInfoAddProps,
  AddStandardWithLogParams,
  AddStandardWithLogResponse,
} from './models/standardLib'

/** 获取机器人的标准问答 */
async function getStandardTableInfo(params: QATableGetProps) {
  return request<GetStandardTableInfoResponse>('/api/app/bot/standardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: {
      ...params,
    },
  })
}

/** 更新一条标准问答 */
async function updateStandardInfo(params: QAFormInfo) {
  return request<QAResponse>('/api/app/bot/updateStandardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 删除一条标准问答 */
async function deleteStandardInfo(params: QAInfoDeleteProps) {
  return request<QAResponse>('/api/app/bot/deleteStandardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 添加标准问答 */
async function addStandardInfos(params: QAInfoAddProps[]) {
  return request<AddStandardInfosResponse>('/api/app/bot/addStandardInfos', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 增加标准问答并进行日志修正记录 */
async function addStandardWithLog(params: AddStandardWithLogParams) {
  return request<AddStandardWithLogResponse>('/api/app/bot/addStandardWithLog', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

export default {
  getStandardTableInfo,
  updateStandardInfo,
  deleteStandardInfo,
  addStandardInfos,
  addStandardWithLog,
}
