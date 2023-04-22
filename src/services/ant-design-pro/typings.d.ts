import { CaptchaAvailableResult, DomainAvailable } from './enums'

declare namespace API {
  type CurrentUser = {
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

  type LoginResult = {
    status?: string
    data?: any
    type?: string // account or mobile or email
    currentAuthority?: string
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type RegisterParams = {
    bot_id?: string //机器人id，默认为0

    level?: number //用户的权限，默认为2

    domain: string //用户头注册的ai域名

    logo: string //用户头像地址

    email: string //用户邮箱地址

    password: string //用户密码

    captcha: string //邮箱验证码
  }

  type LoginParams = {
    email: string
    password: string
    type?: string
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMessage?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
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

  type DomainUniqueResponse = {
    actionType: 'OK'
    available: DomainAvailable //1 代表域名可用，0代表域名不可用
  }

  type UserRegisterResponse = {
    actionType: boolean //注册失败
    message: string //验证码错误
  }

  type CaptchaResponse = {
    actionType: 'OK'
    available: CaptchaAvailableResult
  }
}
