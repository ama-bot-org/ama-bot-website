import { Button, ConfigProvider } from 'antd'
import Modal from 'antd/es/modal/Modal'

type PreviewModalProps = {
  visible: boolean
  content: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const PreviewModal = (props: PreviewModalProps) => {
  const { visible, content, setVisible } = props

  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <Modal
      title="预览内容"
      open={visible}
      onCancel={handleCancel}
      footer={
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button type="primary" onClick={handleCancel}>
            关闭
          </Button>
        </ConfigProvider>
      }
    >
      <p>{content}</p>
    </Modal>
  )
}

export default PreviewModal
