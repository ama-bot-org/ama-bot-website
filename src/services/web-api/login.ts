// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { FakeCaptcha, LoginParams, LoginResult } from './models/user'

/** 发送验证码 POST /api/login/captcha */
async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string
  },
  options?: { [key: string]: any },
) {
  return request<FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 登录接口 POST /api/app/user/login */
async function login(body: LoginParams): Promise<LoginResult> {
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

export default {
  getFakeCaptcha,
  login,
}
