import { request } from '@umijs/max'
import { API } from './typings'

/** 获取机器人的标准问答 */
export async function getStandardTableInfo(params: API.QATableGetProps) {
  return request<API.GetStandardTableInfoResponse>('/api/app/bot/standardInfo', {
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
export async function updateStandardInfo(params: API.QAFormInfo) {
  return request<API.QAResponse>('/api/app/bot/updateStandardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 删除一条标准问答 */
export async function deleteStandardInfo(params: API.QAInfoDeleteProps) {
  return request<API.QAResponse>('/api/app/bot/deleteStandardInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 添加标准问答 */
export async function addStandardInfos(params: API.QAInfoAddProps[]) {
  return request<API.AddStandardInfosResponse>('/api/app/bot/addStandardInfos', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}
