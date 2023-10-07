import React, { useState } from 'react'
import Button from 'antd/es/button'
import Upload from 'antd/es/upload'
import message from 'antd/es/message'
import Image from 'antd/es/image'
import { useModel } from '@umijs/max'
import { RcFile } from 'antd/es/upload'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import corpus from '@/services/web-api/corpus'
import { ActionType } from '@/constants/enums'

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024 // 5MB

type CustomUploadProps = {
  onSuccessUpload: () => void
}

const CustomUploadComponent: React.FC<CustomUploadProps> = ({ onSuccessUpload }) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [validFiles, setValidFiles] = useState<any>([])

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
          setValidFiles((prevFiles: any) =>
            prevFiles.map((file: any) => {
              file.status = 'done'
              return file
            }),
          )
          onSuccessUpload()
        } else {
          setValidFiles((prevFiles: any) => prevFiles.filter((file: any) => file?.uid !== fileContent?.uid))
          message.error(res?.message || '上传失败')
          // 过滤掉上面上传失败的这个文件
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
    const isLt10M = file.size < MAX_UPLOAD_SIZE
    if (!isLt10M) {
      message.error('上传文件不能超过 10MB！')
    }
    if (isDoc && isLt10M) {
      if (file) {
        Object.assign(file, { status: 'uploading' })

        // 设置状态为 uploading
        setValidFiles((prevFiles: any) => {
          return [...prevFiles, file]
        })
      }

      return true
    }

    return false
  }

  const handleRemove = (file: any) => {
    setValidFiles((prevFiles: any) => {
      return prevFiles ? prevFiles.filter((_file: any) => file?.uid !== _file?.uid) : []
    })
  }

  const uploadWrapClassname = useEmotionCss(() => ({
    width: '310px',
    textAlign: 'center',
  }))

  const uploadBtnClassname = useEmotionCss(() => ({
    width: '310px',
    height: '435px',
    background: '#ffffff',
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
    <Upload
      customRequest={handleCustomRequest}
      onRemove={handleRemove}
      fileList={validFiles}
      beforeUpload={beforeUpload}
      className={uploadWrapClassname}
    >
      <Button className={uploadBtnClassname}>
        <Image
          preview={false}
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/corpus/upload.svg"
          style={{ fontSize: 100 }}
        />
        <h3
          className="mb-0"
          style={{
            fontSize: 18,
            marginTop: '48px',
          }}
        >
          点击或拖曳文件到这里
        </h3>
        <h3
          className="mb-0"
          style={{
            fontSize: 18,
          }}
        >
          上传训练资料
        </h3>
        <p
          className="mb-0"
          style={{
            fontSize: 16,
          }}
        >
          支持 doc/docx/pdf 格式
        </p>
        <p
          style={{
            fontSize: 16,
            marginTop: '0px',
          }}
        >
          文件大小不超过 10MB
        </p>
      </Button>
    </Upload>
  )
}

export default CustomUploadComponent
