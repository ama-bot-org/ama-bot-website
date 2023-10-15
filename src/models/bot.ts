import { isCuserModifyType } from '@/services/web-api/models/bot'

export interface BotDataType {
  id: string
  name: string
  image_url: string
  bgImg_url: string
  html_url: string
  faq_contents: string[]
  welcomes: string[]
  contact: string
  model_type: number
  is_cuser_modify: isCuserModifyType
}
