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
}

export interface BotRequestType extends Bot {
  email: string
  bot_id: string
}

export interface BotResult extends Bot {
  ActionType: ActionType
  message?: string
  bot_id: string
}

export interface BotSubDomainRequestType {
  bot_id: string
  html_url: string
}
