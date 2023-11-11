// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import {
  DeleteModifiedInfoParamsType,
  GetCUserModifiedInfoTableParams,
  CUserModifiedInfoTableResponseType,
  AddCUserModifiedInfoParams,
  AddCUserModifiedInfoResponse,
} from './models/toBeCheckedLogs'

// 获取C端用户提交的修正的历史记录
async function getCUserModifiedInfoTable(params: GetCUserModifiedInfoTableParams) {
  return request<CUserModifiedInfoTableResponseType>('/api/app/bot/cuserModifiedInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** */
export async function deleteModifiedInfo(params: DeleteModifiedInfoParamsType) {
  return request<any>(`/api/app/bot/modifiedInfo`, {
    method: 'DELETE',
    headers: { Authorization: localStorage.getItem('token') || '' },
    data: { ...params },
  })
}

export async function addCUserModifiedInfo(params: AddCUserModifiedInfoParams) {
  return request<AddCUserModifiedInfoResponse>('/api/app/bot/modifiedInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

export default {
  getCUserModifiedInfoTable,
  deleteModifiedInfo,
  addCUserModifiedInfo,
}
