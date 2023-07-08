import React from 'react'
import { Button, Upload, message } from 'antd'
import corpus from '@/services/ant-design-pro/corpus'
import { ActionType } from '@/services/ant-design-pro/enums'
import { useModel } from '@umijs/max'
import { RcFile } from 'antd/es/upload'
import { CloudUploadOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB

type CustomUploadProps = {
  onSuccessUpload: () => void
}

const CustomUploadComponent: React.FC<CustomUploadProps> = ({ onSuccessUpload }) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const handleUpload = async (options: any) => {
    const { fileContent, filename, onError, onSuccess } = options
    let fileType = filename.split('.').pop().toLowerCase()
    if (fileType === 'doc') fileType = 'docx'
    if (currentUser?.bot_id) {
      try {
        const res = await corpus.uploadCorpusDoc({
          bot_id: currentUser?.bot_id,
          file_name: filename,
          file: fileContent,
          file_type: fileType,
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
    const isDoc =
      file.type === 'application/msword' || file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.pdf') // 后缀名检查
    if (!isDoc) {
      message.error('只能上传 doc, docx 或者 pdf 文件！')
    }
    const isLt5M = file.size < MAX_UPLOAD_SIZE
    if (!isLt5M) {
      message.error('上传文件不能超过 5MB！')
    }
    return isDoc && isLt5M
  }

  const uploadWrapClassname = useEmotionCss(() => ({
    width: '310px',
    textAlign: 'center',
  }))

  const uploadBtnClassname = useEmotionCss(() => ({
    width: '310px',
    height: '435px',
    background: '#ffffff55',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: '1px',
    borderColor: '#000000aa',
    '@media screen and (max-width: 768px)': {
      width: '280px',
      height: '360px',
    },
  }))

  return (
    <Upload customRequest={handleCustomRequest} beforeUpload={beforeUpload} className={uploadWrapClassname}>
      <Button className={uploadBtnClassname}>
        <CloudUploadOutlined style={{ fontSize: 100 }} />
        <h3>上传语料文件</h3>
        <p className="mb-0">支持 doc/docx/pdf 格式</p>
        <p>文件大小不超过 5MB</p>
      </Button>
    </Upload>
  )
}

export default CustomUploadComponent
