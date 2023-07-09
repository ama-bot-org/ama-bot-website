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

export async function fetchBotInfo(id: string): Promise<API.Bot> {
  const res = await request('/api/app/user/idcheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id },
    getResponse: true,
  })
  return res.data
}

export async function checkBotValid(id: string): Promise<API.BotValid> {
  const res: any = await request('/api/app/user/idCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('askio_token') || '',
    },
    data: { id },
    getResponse: true,
  })
  return res
}
