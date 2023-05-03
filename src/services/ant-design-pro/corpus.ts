// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { CorpusAPI } from './corpusAPI'

/** 上传语料文件，根据文件内容创建文件 */
async function uploadCorpusFile(params: CorpusAPI.UploadFileParamType) {
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

// 根据条件删除文件
async function deleteFile(params: CorpusAPI.FileDeleteParamsType) {
  return request<CorpusAPI.FileDeleteResponse>('/api/app/file/deleteFile', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    data: params,
  })
}

export default { uploadCorpusFile, getFileList, deleteFile, updateCorpusFile }
