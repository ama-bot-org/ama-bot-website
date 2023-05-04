import { ActionType } from './enums'

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

  type User = {
    name: string
    email: string
    org_id: string // 域名
    bot_id: string
    level: AuthorityLevel
  }

  type LoginResult = {
    ActionType: ActionType
    data: User
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

    level?: AuthorityLevel //用户的权限，默认为2

    org_id: string //用户头注册的ai域名

    name: string //用户名

    logo: string //用户头像地址

    email: string //用户邮箱地址

    password: string //用户密码

    email_check: string //邮箱验证码
  }

  type LoginFormParams = {
    email: string
    password: string
    captcha: string
    checkType: CheckType
    type?: string
  }

  type LoginParams = {
    email: string
    password?: string
    email_check?: string
    checkType: CheckType
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

  type UniqueResponse = {
    ActionType: ActionType.OK
    code?: number
    message?: string
  }

  type UserRegisterResponse = {
    ActionType: ActionType.OK
    message?: string //验证码错误
  }

  type CaptchaResponse = {
    ActionType: ActionType
    status?: number
    message?: string
  }

  type AddStandardInfosResponse = {
    ActionType: ActionType
  }

  // 前端给后台
  type QAFormInfo = {
    id?: number
    bot_id?: string
    prompt: string //问题
    completion: string //回答
  }

  type QATableGetProps = {
    bot_id: string
    searchWord?: string
    page: number
    pageSize: number
  }

  // 后台给前端
  type GetStandardTableInfoResponse = {
    ActionType: ActionType
    data: {
      content: QAFormInfo[]
      count: number
    }
  }

  type QAResponse = {
    ActionType: ActionType
    data: QAFormInfo[]
  }

  type QAInfoDeleteProps = {
    id: number //编号

    bot_id: string //机器人id
  }

  type QAInfoAddProps = {
    bot_id: string
    prompt: string
    completion: string
  }
}
