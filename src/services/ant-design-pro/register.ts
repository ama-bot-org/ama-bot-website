import { request } from '@umijs/max'
import { API } from './typings'
import { RegisterType } from './enums'

/** 验证邮箱唯一性 POST /app/user/email */
export async function checkEmailUnique(email: string) {
  const res = await request<API.UniqueResponse>('/api/app/user/emailCheck', {
    method: 'POST',
    data: {
      email,
    },
    getResponse: true,
  })
  return res.data
}

/** 验证AI域名唯一性 POST /app/user/ai */
export async function checkAIDomainUnique(org_id: string) {
  return request<API.UniqueResponse>('/api/app/user/ai', {
    method: 'POST',
    data: {
      org_id,
    },
  })
}

/** 注册新用户 */
export async function registerNewUser(userInfo: API.RegisterParams) {
  return request<API.UserRegisterResponse>('/api/app/user/registerNew', {
    method: 'POST',
    data: {
      ...userInfo,
    },
  })
}

/** 发邮箱验证码 */
export async function requestCaptcha(email: string, register: RegisterType) {
  return request<API.CaptchaResponse>('/api/app/user/captcha', {
    method: 'POST',
    data: {
      email,
      register,
    },
  })
}
