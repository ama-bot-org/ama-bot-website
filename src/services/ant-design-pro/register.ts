// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { API } from './typings'

/** 验证AI域名唯一性 GET /app/user/ai */
export async function getAIDomainUnique(ai_area: string) {
  return request<API.DomainUniqueResponse>('/api/app/user/ai', {
    method: 'GET',
    params: {
      aiInfo: {
        ai_area,
      },
    },
  })
}

/** 注册新用户 */
export async function postUserRegister(userInfo: API.RegisterParams) {
  return request<API.UserRegisterResponse>('/api/app/user/create', {
    method: 'POST',
    params: {
      userInfo,
    },
  })
}

/** 发邮箱验证码 */
export async function requestCaptcha(email: string) {
  return request<API.CaptchaResponse>('/api/app/user/email', {
    method: 'POST',
    params: {
      emailInfo: {
        email,
      },
    },
  })
}
