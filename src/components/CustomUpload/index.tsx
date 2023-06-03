import React from 'react'
import { Button, Upload, message } from 'antd'
import corpus from '@/services/ant-design-pro/corpus'
import { ActionType } from '@/services/ant-design-pro/enums'
import { useModel } from '@umijs/max'
import { RcFile } from 'antd/es/upload'
import { CloudUploadOutlined } from '@ant-design/icons'

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB

type CustomUploadProps = {
  onSuccessUpload: () => void
}

const CustomUploadComponent: React.FC<CustomUploadProps> = ({ onSuccessUpload }) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const handleUpload = async (options: any) => {
    const { fileContent, filename, onError, onSuccess } = options
    if (currentUser?.bot_id) {
      try {
        // eslint-disable-next-line no-debugger
        debugger
        const res = await corpus.uploadCorpusDoc({
          bot_id: currentUser?.bot_id,
          file_name: filename,
          file: fileContent,
        })
        if (res.ActionType === ActionType.OK) {
          onSuccess('上传成功')
          onSuccessUpload()
        } else {
          onError(new Error('上传失败'))
        }
      } catch (error) {
        onError(new Error('上传失败'))
      }
    } else {
      onError(new Error('未登录'))
    }
  }

  const handleCustomRequest = async ({ file, onSuccess, onError }: any) => {
    await handleUpload({ fileContent: file, filename: file.name, onError, onSuccess })
  }

  const beforeUpload = (file: RcFile) => {
    const isDoc = file.type === 'application/msword' || file.name.endsWith('.doc') || file.name.endsWith('.docx') // 后缀名检查
    if (!isDoc) {
      message.error('只能上传 doc 文件！')
    }
    const isLt10M = file.size < MAX_UPLOAD_SIZE
    if (!isLt10M) {
      message.error('上传文件不能超过 5MB！')
    }
    return isDoc && isLt10M
  }

  return (
    <Upload beforeUpload={beforeUpload} customRequest={handleCustomRequest}>
      <Button
        style={{
          width: '360px',
          height: '435px',
          background: '#ffffff55',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: '#000000aa',
        }}
      >
        <CloudUploadOutlined style={{ fontSize: 100 }} />
        <h3>上传语料文件</h3>
        <p>支持 doc 格式，文件大小不超过 5MB</p>
      </Button>
    </Upload>
  )
}

export default CustomUploadComponent
