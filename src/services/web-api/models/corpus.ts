import { ActionType } from '@/constants/enums'

export type UploadFileParamType = {
  bot_id: string
  type: 1 | 2 | 3 // 文件类型 1为pdf 2为txt 3为手动
  doc_name: string
  content: string //文件内容
}

export type UploadFileResponseType = {
  ActionType: ActionType
  message?: string
}

export type UpdateFileParamType = {
  id: number
  type: 1 | 2 | 3 // 文件类型 1为pdf 2为txt 3为手动
  doc_name: string
  content: string
}

export type GetFileListParamsType = {
  // 机器人id
  bot_id: string

  // 文件类型 1为pdf 2为txt 3为文本输入
  type: 1 | 2 | 3

  // 当前页面
  page: number

  // 每页显示的条数
  pageSize: number
}

export type DocInfo = {
  //编号
  id: number

  //机器人id
  bot_id: string

  //文件名称
  file_name: string

  //文件类型 1为pdf 2为txt
  file_type: number

  // 下载链接
  file_link: string

  //文件内容
  file_content: string

  //创建时间
  date: number
}

export type FileInfo = {
  //编号
  bot_id: string
  content: string
  date: number
  doc_name: string
  id: number
  type: number
}

export type FileListResponse = {
  ActionType: ActionType
  data: {
    count: number
    content: FileInfo[]
  }
}

export type DocListResponse = {
  ActionType: ActionType
  data: {
    count: number
    content: DocInfo[]
  }
}

export type NotionDeleteParamsType = {
  id: string
}

export type FileDeleteParamsType = {
  id: number //编号
  bot_id: string //机器人id
}

export type FileDeleteResponse = {
  ActionType: ActionType
}

export type FileDownloadResponse = {
  ActionType: ActionType
  downloadUrl: string
}

export type NotionInfoAddProps = {
  bot_id: string
  token: string
  pagelink: string
  doc_name: string
  subPage: boolean
}

export type NotionTableRow = {
  bot_id: string
  id: string
  doc_name: string
  type: number
  content: string
  page_id: string
  doc_hash: string
  token?: string
  pagelink?: string
  subPage?: boolean
}

export type NotionInfoAddResponse = {
  ActionType: ActionType
  data: NotionTableRow
}

export type NotionTableResponse = {
  ActionType: ActionType
  data: {
    count: number
    content: NotionTableRow[]
  }
}

export type GetDocsListParamsType = {
  // 机器人id
  bot_id: string

  searchWord?: string

  // 当前页面
  page: number

  // 每页显示的条数
  pageSize: number
}

export type UploadDocParamType = {
  bot_id: string
  file_name: string
  file: any
  file_type: 'docx' | 'pdf'
}

export type DocDownloadParamsType = {
  bot_id: string
  id: number
  file_name: string
}

export type GetNotionTableResponseType = {
  ActionType: ActionType
  data: {
    count: number
    content: NotionTableRow[]
  }
}

export type GetNotionTableParamsType = {
  bot_id: string
  page: number
  pageSize: number
}

export type CreateNotionParamsType = {
  bot_id: string
  token: string
  pagelink: string
  doc_name: string
  subPage: boolean
}

export type CreateNotionResponseType = {
  ActionType: string
  data: {
    bot_id: string
    doc_name: string
    type: number
    content: string
    page_id: string
    doc_hash: string
  }
}

export type DeleteNotionParamsType = {
  bot_id: string
  id: string
}

export type DeleteNotionResponseType = {
  ActionType: ActionType
}
