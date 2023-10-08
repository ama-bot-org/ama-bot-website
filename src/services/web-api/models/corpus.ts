import { ActionType } from '@/constants/enums'
import { ErrorResponse } from './common'

export interface UploadFileParamType {
  bot_id: string
  type: 1 | 2 | 3 // 文件类型 1为pdf 2为txt 3为手动
  doc_name: string
  content: string //文件内容
}

export interface UploadFileResponseType {
  ActionType: ActionType
  message?: string
}

export interface UpdateFileParamType {
  id: number
  type: 1 | 2 | 3 // 文件类型 1为pdf 2为txt 3为手动
  doc_name: string
  content: string
}

export interface GetFileListParamsType {
  // 机器人id
  bot_id: string

  // 文件类型 1为pdf 2为txt 3为文本输入
  type: 1 | 2 | 3

  // 当前页面
  page: number

  // 每页显示的条数
  pageSize: number
}

export interface SearchFileListParamsType {
  // 机器人id
  bot_id: string

  // 文件类型 1为pdf 2为txt 3为文本输入
  type: 1 | 2 | 3

  // 当前页面
  page: number

  // 每页显示的条数
  pageSize: number

  // 关键词
  searchWord?: string
}

export interface DocInfo {
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

export interface FileInfo {
  //编号
  bot_id: string
  content: string
  date: number
  doc_name: string
  id: number
  type: number
}

export interface FileListResponse extends ErrorResponse {
  data: {
    count: number
    content: FileInfo[]
  }
}

export interface DocListResponse extends ErrorResponse {
  data: {
    count: number
    content: DocInfo[]
  }
}

export interface NotionDeleteParamsType {
  id: string
}

export interface FileDeleteParamsType {
  id: number //编号
  bot_id: string //机器人id
}

export interface FileDeleteResponse extends ErrorResponse {
  ActionType: ActionType
}

export interface FileDownloadResponse extends ErrorResponse {
  downloadUrl: string
}

export interface NotionInfoAddProps {
  bot_id: string
  token: string
  pagelink: string
  doc_name: string
  subPage: boolean
}

export interface NotionTableRow {
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

export interface NotionInfoAddResponse extends ErrorResponse {
  data: NotionTableRow
}

export interface NotionTableResponse extends ErrorResponse {
  data: {
    count: number
    content: NotionTableRow[]
  }
}

export interface GetDocsListParamsType {
  // 机器人id
  bot_id: string

  searchWord?: string

  // 当前页面
  page: number

  // 每页显示的条数
  pageSize: number
}

export interface UploadDocParamType {
  bot_id: string
  file_name: string
  file: any
  file_type: 'docx' | 'pdf'
}

export interface DocDownloadParamsType {
  bot_id: string
  id: number
  file_name: string
}

export interface GetNotionTableResponseType extends ErrorResponse {
  data: {
    count: number
    content: NotionTableRow[]
  }
}

export interface GetNotionTableParamsType {
  bot_id: string
  page: number
  pageSize: number
}

export interface CreateNotionParamsType {
  bot_id: string
  token: string
  pagelink: string
  doc_name: string
  subPage: boolean
}

export interface CreateNotionResponseType extends ErrorResponse {
  data: {
    bot_id: string
    doc_name: string
    type: number
    content: string
    page_id: string
    doc_hash: string
  }
}

export interface DeleteNotionParamsType {
  bot_id: string
  id: string
}

export interface DeleteNotionResponseType extends ErrorResponse {
  ActionType: ActionType
}
