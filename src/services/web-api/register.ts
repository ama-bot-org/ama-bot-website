import { request } from '@umijs/max'
import { RegisterType } from '@/constants/enums'
import {
  UniqueResponse,
  RegisterParams,
  UserRegisterResponse,
  CaptchaResponse,
  UploadImageParams,
  UpdateImageParams,
  UpdateImageResponseType,
  UploadImageResponseType,
} from './models/user'

/** 验证邮箱唯一性 POST /app/user/email */
async function checkEmailUnique(email: string) {
  const res = await request<UniqueResponse>('/api/app/user/emailCheck', {
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
  return request<UniqueResponse>('/api/app/user/ai', {
    method: 'POST',
    data: {
      org_id,
    },
  })
}

/** 注册新用户 */
async function registerNewUser(userInfo: RegisterParams) {
  return request<UserRegisterResponse>('/api/app/user/registerNew', {
    method: 'POST',
    data: {
      ...userInfo,
    },
  })
}

/** 发邮箱验证码 */
async function requestCaptcha(email: string, register: RegisterType) {
  return request<CaptchaResponse>('/api/app/user/captcha', {
    method: 'POST',
    data: {
      email,
      register,
    },
  })
}

// 上传头像
async function uploadImage(params: UploadImageParams) {
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('file_name', params.file_name)
  formData.append('file', params.file)
  return request<UploadImageResponseType>('/api/app/user/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    timeout: 180000,
  })
}

// 更新头像
async function updateImage(params: UpdateImageParams) {
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('image_url', params.image_url)
  formData.append('file', params.file)
  return request<UpdateImageResponseType>('/api/app/user/imageUpdate', {
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
