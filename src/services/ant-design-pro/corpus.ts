// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { CorpusAPI } from './corpusAPI'

/**
 * 文件类-start
 */
// 根据机器人id获取相关的语料文件数据
async function getDocsList(params: CorpusAPI.GetDocsListParamsType) {
  return request<CorpusAPI.DocListResponse>('/api/app/file/docsInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

/** 以文件形式上传语料 */
async function uploadCorpusDoc(params: CorpusAPI.UploadDocParamType) {
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('bot_id', params.bot_id)
  formData.append('file_name', params.file_name)
  formData.append('file', params.file)
  formData.append('file_type', params.file_type)
  return request<CorpusAPI.UploadFileResponseType>('/api/app/file/docCreate', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    timeout: 180000,
  })
}

// 根据条件删除文件
async function deleteDoc(params: CorpusAPI.FileDeleteParamsType) {
  return request<CorpusAPI.FileDeleteResponse>('/api/app/file/docDelete', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

// 下载文件
async function downloadDoc(params: CorpusAPI.DocDownloadParamsType) {
  return request<CorpusAPI.FileDownloadResponse>('/api/app/file/docDownload', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

// 搜索文件
async function searchDoc(params: CorpusAPI.FileDeleteParamsType) {
  return request<CorpusAPI.FileDeleteResponse>('/api/app/file/searchDocsInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}
/**
 * 文件类-end
 */

/**
 * 手动类-start
 */
/** 手动上传语料文件，根据文件内容创建文件 */
async function uploadCorpusByManual(params: CorpusAPI.UploadFileParamType) {
  return request<CorpusAPI.UploadFileResponseType>('/api/app/file/create', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
    timeout: 180000,
  })
}

/** 更新语料内容 */
async function updateCorpusFile(params: CorpusAPI.UpdateFileParamType) {
  return request<CorpusAPI.UploadFileResponseType>('/api/app/file/update', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
    timeout: 180000,
  })
}

// 根据机器人id获取文件相关的语料数据
async function getFileList(params: CorpusAPI.GetFileListParamsType) {
  return request<CorpusAPI.FileListResponse>('/api/app/file/fileInfo', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

// 根据条件删除手动上传的语料文件
async function deleteFile(params: CorpusAPI.FileDeleteParamsType) {
  return request<CorpusAPI.FileDeleteResponse>('/api/app/file/deleteFile', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}
/**
 * 手动类-end
 */

/**
 * notion类-start
 */
// 获取notion表格数据
async function getNotionTable(params: CorpusAPI.GetNotionTableParamsType) {
  return request<CorpusAPI.GetNotionTableResponseType>('/api/app/notion/notions', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

// 创建notion表格数据
async function createNotion(params: CorpusAPI.CreateNotionParamsType) {
  return request<CorpusAPI.CreateNotionResponseType>('/api/app/notion/create', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

// 删除notion表格数据
async function deleteNotion(params: CorpusAPI.DeleteNotionParamsType) {
  return request<CorpusAPI.DeleteNotionResponseType>('/api/app/notion/deleteNotion', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}
/**
 * notion类-end
 */

export default {
  // 文件自动
  uploadCorpusDoc,
  getDocsList,
  deleteDoc,
  downloadDoc,
  searchDoc,
  // 手动
  uploadCorpusByManual,
  getFileList,
  deleteFile,
  updateCorpusFile,
  // notion
  getNotionTable,
  createNotion,
  deleteNotion,
}
