import { ActionType } from './enums'

declare namespace UserAPI {
  type UploadImageParams = {
    file_name: string
    file: File
  }

  type UploadImageResponseType = {
    ActionType: ActionType
    image_url: string
  }

  type UpdateImageParams = {
    image_url: string
    file: File
  }

  type UpdateImageResponseType = {
    ActionType: ActionType
    image_url: string
  }
}
