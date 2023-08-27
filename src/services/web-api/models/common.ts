import { ActionType } from '@/constants/enums'

export interface ErrorResponse {
  ActionType: ActionType
  message?: string
  LogId: number
}
