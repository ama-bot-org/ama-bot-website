import { ActionType } from './enums'

declare namespace CorpusAPI {
  type UploadFileParamType = {
    bot_id: string
    type: 1 | 2 // 文件类型 1为pdf 2为txt
    doc_name: string
    content: string //文件内容
  }

  type UploadFileResponseType = {
    ActionType: ActionType
  }

  type GetFileListParamsType = {
    // 机器人id
    bot_id: string

    // 文件类型 1为pdf 2为txt
    type: 1 | 2

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

  type FileDeleteParamsType = {
    id: number //编号
    bot_id: string //机器人id
  }

  type FileDeleteResponse = {
    ActionType: ActionType
  }
}
