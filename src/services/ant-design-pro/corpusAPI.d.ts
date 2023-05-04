import { ActionType } from './enums'

declare namespace CorpusAPI {
  type UploadFileParamType = {
    bot_id: string
    type: 1 | 2 | 3 // 文件类型 1为pdf 2为txt 3为手动
    doc_name: string
    content: string //文件内容
  }

  type UploadFileResponseType = {
    ActionType: ActionType
  }

  type UpdateFileParamType = {
    id: number
    type: 1 | 2 | 3 // 文件类型 1为pdf 2为txt 3为手动
    doc_name: string
    content: string
  }

  type GetFileListParamsType = {
    // 机器人id
    bot_id: string

    // 文件类型 1为pdf 2为txt 3为手动更新
    type: 1 | 2 | 3

    // 当前页面
    page: number

    // 每页显示的条数
    pageSize: number
  }

  type FileInfo = {
    //编号
    id: number

    //机器人id
    bot_id: string

    //文件名称
    doc_name: string

    //文件类型 1为pdf 2为txt
    type: number

    //文件内容
    content: string

    //创建时间
    date: number
  }

  type FileListResponse = {
    ActionType: ActionType
    data: {
      count: number
      content: FileInfo[]
    }
  }

  type NotionDeleteParamsType = {
    id: string
  }

  type FileDeleteParamsType = {
    id: number //编号
    bot_id: string //机器人id
  }

  type FileDeleteResponse = {
    ActionType: ActionType
  }

  type NotionInfoAddProps = {
    bot_id: string
    token: string
    pagelink: string
    doc_name: string
    subPage: boolean
  }

  type NotionTableRow = {
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

  type NotionInfoAddResponse = {
    ActionType: ActionType
    data: NotionTableRow
  }

  type GetNotionTableParamsType = {
    bot_id: string
    page: number
    pageSize: number
  }

  type NotionTableResponse = {
    ActionType: ActionType
    data: {
      count: number
      content: NotionTableRow[]
    }
  }
}
