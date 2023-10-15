import { ActionType } from '@/constants/enums'

export interface BotValid {
  ActionType: ActionType
  message: string
}

export interface Bot {
  image_url: string
  name: string
  bgImg_url: string
  html_url: string
  contact: string
  faq_contents: string
  welcomes: string
  model_type: number
}

/**
 * C端用户是否有修改回答的权限
 */
export enum isCuserModifyType {
  /**
   * 没权限
   */
  disabled = 0,
  /**
   * 有权限
   */
  enabled = 1,
}

export interface BotRequestType extends Bot {
  email?: string
  phone: string

  bot_id: string
  is_cuser_modify: isCuserModifyType
}

export interface BotResult extends Bot {
  ActionType: ActionType
  message?: string
  bot_id: string
  is_cuser_modify: isCuserModifyType
}

export interface BotSubDomainRequestType {
  bot_id: string
  html_url: string
}
