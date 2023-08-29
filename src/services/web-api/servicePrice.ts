// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { GetUserLimitParamsType, GetUserLimitResType } from './models/servicePrice'

// 根据bot_id获取用户的套餐使用情况
async function getUserLimit(params: GetUserLimitParamsType) {
  return request<GetUserLimitResType>('/api/app/user/UserLimit', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

export default {
  getUserLimit,
}
