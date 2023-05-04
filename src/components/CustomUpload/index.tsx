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
    if (currentUser?.bot_id) {
      try {
        const res = await corpus.uploadCorpusFile({
          bot_id: currentUser?.bot_id,
          type: 2,
          doc_name: filename,
          content: fileContent,
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
    const reader = new FileReader()
    reader.onload = async (event: any) => {
      const fileContent = event.target.result
      await handleUpload({ fileContent: fileContent, filename: file.name, onSuccess, onError })
    }
    reader.readAsText(file)
  }

  const beforeUpload = (file: RcFile) => {
    const isTxt = file.type === 'text/plain'
    if (!isTxt) {
      message.error('只能上传 txt 文件！')
    }
    const isLt10M = file.size < MAX_UPLOAD_SIZE
    if (!isLt10M) {
      message.error('上传文件不能超过 5MB！')
    }
    return isTxt && isLt10M
  }

  const uploadBtnClassname = useEmotionCss(() => ({
    width: '320px',
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
    <Upload customRequest={handleCustomRequest} beforeUpload={beforeUpload}>
      <Button className={uploadBtnClassname}>
        <CloudUploadOutlined style={{ fontSize: 100 }} />
        <h3>上传语料文件</h3>
        <p>支持 txt 格式，文件大小不超过 5MB</p>
      </Button>
    </Upload>
  )
}

export default CustomUploadComponent
