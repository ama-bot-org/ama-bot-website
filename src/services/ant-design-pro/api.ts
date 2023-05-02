// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { API } from './typings'

/** 登录接口 POST /api/app/user/login */
export async function login(body: API.LoginParams): Promise<API.LoginResult> {
  const res = await request('/api/app/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    getResponse: true,
  })
  localStorage.setItem('token', res.headers.authorization || '')
  return res.data
}
