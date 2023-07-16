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

    // 文件类型 1为pdf 2为txt 3为文本输入
    type: 1 | 2 | 3

    // 当前页面
    page: number

    // 每页显示的条数
    pageSize: number
  }

  type DocInfo = {
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

  type FileInfo = {
    //编号
    bot_id: string
    content: string
    date: number
    doc_name: string
    id: number
    type: number
  }

  type FileListResponse = {
    ActionType: ActionType
    data: {
      count: number
      content: FileInfo[]
    }
  }

  type DocListResponse = {
    ActionType: ActionType
    data: {
      count: number
      content: DocInfo[]
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

  type FileDownloadResponse = {
    ActionType: ActionType
    downloadUrl: string
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

  type GetDocsListParamsType = {
    // 机器人id
    bot_id: string

    searchWord?: string

    // 当前页面
    page: number

    // 每页显示的条数
    pageSize: number
  }

  type UploadDocParamType = {
    bot_id: string
    file_name: string
    file: any
    file_type: 'docx' | 'pdf'
  }

  type DocDownloadParamsType = {
    bot_id: string
    id: number
    file_name: string
  }

  type GetNotionTableResponseType = {
    ActionType: ActionType
    data: {
      count: number
      content: NotionTableRow[]
    }
  }

  type GetNotionTableParamsType = {
    bot_id: string
    page: number
    pageSize: number
  }

  type CreateNotionParamsType = {
    bot_id: string
    token: string
    pagelink: string
    doc_name: string
    subPage: boolean
  }

  type CreateNotionResponseType = {
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

  type DeleteNotionParamsType = {
    bot_id: string
    id: string
  }

  type DeleteNotionResponseType = {
    ActionType: ActionType
  }
}
