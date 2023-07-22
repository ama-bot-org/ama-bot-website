import { ActionType, AuthorityLevel, CheckType, NoticeIconItemType } from '@/constants/enums'

export interface CurrentUser {
  name?: string
  avatar?: string
  userid?: string
  email?: string
  signature?: string
  title?: string
  group?: string
  tags?: { key?: string; label?: string }[]
  notifyCount?: number
  unreadCount?: number
  country?: string
  access?: string
  geographic?: {
    province?: { label?: string; key?: string }
    city?: { label?: string; key?: string }
  }
  address?: string
  phone?: string
}

export interface User {
  name: string
  email: string
  org_id: string // 名称
  bot_id: string
  level: AuthorityLevel
  image_url: string
}

export interface LoginResult {
  ActionType: ActionType
  data: User
}

export interface PageParams {
  current?: number
  pageSize?: number
}

export interface FakeCaptcha {
  code?: number
  status?: string
}

export interface RegisterParams {
  bot_id?: string //机器人id，默认为0

  level?: AuthorityLevel //用户的权限，默认为2

  org_id: string //用户头注册的ai名称

  name: string //用户名

  image_url: string //用户头像地址

  email: string //用户邮箱地址

  password: string //用户密码

  email_check: string //邮箱验证码
}

export interface LoginFormParams {
  email: string
  password: string
  captcha: string
  checkType: CheckType
  interface?: string
}

export interface LoginParams {
  email: string
  password?: string
  email_check?: string
  checkType: CheckType
  interface?: string
}

export interface ErrorResponse {
  /** 业务约定的错误码 */
  errorCode: string
  /** 业务上的错误信息 */
  errorMessage?: string
  /** 业务上的请求是否成功 */
  success?: boolean
}

export interface NoticeIconList {
  data?: NoticeIconItem[]
  /** 列表的内容总数 */
  total?: number
  success?: boolean
}

export interface NoticeIconItem {
  id?: string
  extra?: string
  key?: string
  read?: boolean
  avatar?: string
  title?: string
  status?: string
  datetime?: string
  description?: string
  type?: NoticeIconItemType
}

export interface UniqueResponse {
  ActionType: ActionType.OK
  code?: number
  message?: string
}

export interface UserRegisterResponse {
  ActionType: ActionType.OK
  message?: string //验证码错误
}

export interface CaptchaResponse {
  ActionType: ActionType
  status?: number
  message?: string
}

export interface UploadImageParams {
  file_name: string
  file: File
}

export interface UploadImageResponseType {
  ActionType: ActionType
  image_url: string
}

export interface UpdateImageParams {
  image_url: string
  file: File
}

export interface UpdateImageResponseType {
  ActionType: ActionType
  image_url: string
}
