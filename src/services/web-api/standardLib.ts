import { request } from '@umijs/max'
import {
  AddStandardInfosResponse,
  QATableGetProps,
  GetStandardTableInfoResponse,
  QAFormInfo,
  QAResponse,
  QAInfoDeleteProps,
  QAInfoAddProps,
} from './models/standardLib'

/** 获取机器人的标准问答 */
export async function getStandardTableInfo(params: QATableGetProps) {
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
export async function updateStandardInfo(params: QAFormInfo) {
  return request<QAResponse>('/api/app/bot/updateStandardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 删除一条标准问答 */
export async function deleteStandardInfo(params: QAInfoDeleteProps) {
  return request<QAResponse>('/api/app/bot/deleteStandardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 添加标准问答 */
export async function addStandardInfos(params: QAInfoAddProps[]) {
  return request<AddStandardInfosResponse>('/api/app/bot/addStandardInfos', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}
