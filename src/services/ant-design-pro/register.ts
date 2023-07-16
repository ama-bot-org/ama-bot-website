import { request } from '@umijs/max'
import { API } from './typings'
import { RegisterType } from './enums'
import { UserAPI } from './userAPI'

/** 验证邮箱唯一性 POST /app/user/email */
async function checkEmailUnique(email: string) {
  const res = await request<API.UniqueResponse>('/api/app/user/emailCheck', {
    method: 'POST',
    data: {
      email,
    },
    getResponse: true,
  })
  return res.data
}

/** 验证AI名称唯一性 POST /app/user/ai */
async function checkAIDomainUnique(org_id: string) {
  return request<API.UniqueResponse>('/api/app/user/ai', {
    method: 'POST',
    data: {
      org_id,
    },
  })
}

/** 注册新用户 */
async function registerNewUser(userInfo: API.RegisterParams) {
  return request<API.UserRegisterResponse>('/api/app/user/registerNew', {
    method: 'POST',
    data: {
      ...userInfo,
    },
  })
}

/** 发邮箱验证码 */
async function requestCaptcha(email: string, register: RegisterType) {
  return request<API.CaptchaResponse>('/api/app/user/captcha', {
    method: 'POST',
    data: {
      email,
      register,
    },
  })
}

// 上传头像
async function uploadImage(params: UserAPI.UploadImageParams) {
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('file_name', params.file_name)
  formData.append('file', params.file)
  return request<UserAPI.UploadImageResponseType>('/api/app/user/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    timeout: 180000,
  })
}

// 更新头像
async function updateImage(params: UserAPI.UpdateImageParams) {
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('image_url', params.image_url)
  formData.append('file', params.file)
  return request<UserAPI.UpdateImageResponseType>('/api/app/user/imageUpdate', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    timeout: 180000,
  })
}

export default {
  checkEmailUnique,
  checkAIDomainUnique,
  registerNewUser,
  requestCaptcha,
  uploadImage,
  updateImage,
}
