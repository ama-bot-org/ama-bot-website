import corpus from '@/services/ant-design-pro/corpus'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import { ActionType } from '@/services/ant-design-pro/enums'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Input, ConfigProvider, Button, Form, Empty, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import ThemeModal from '../ThemeModal'

type ThemeEditorProps = {
  currentTheme: CorpusAPI.FileInfo | undefined
  setTableReFresh: React.Dispatch<React.SetStateAction<number>>
}

const ThemeEditor = (props: ThemeEditorProps) => {
  const { currentTheme, setTableReFresh } = props
  const [modalVisible, setModalVisible] = useState(false)

  const topClassName = useEmotionCss(() => {
    return {
      width: '90%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      '@media screen and (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'start',
        marginBottom: '20px',
      },
    }
  })

  const searchWrapClassName = useEmotionCss(() => {
    return {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
    }
  })

  const handleSubmit = async (values: any) => {
    if (currentTheme) {
      const res = await corpus.updateCorpusFile({
        id: currentTheme.id,
        doc_name: currentTheme.doc_name,
        content: values.content,
      })
      if (res?.ActionType === ActionType.OK) {
        setTableReFresh(new Date().getTime())
        message.success('更新成功')
      }
    }
  }

  const [form] = useForm()

  useEffect(() => {
    if (currentTheme) {
      form.setFieldValue('content', currentTheme.content)
    }
  }, [currentTheme])

  const handleAddNew = () => {
    setModalVisible(true)
  }

  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginLeft: '10%',
          flex: 1,
          paddingInlineStart: 0,
        }}
      >
        <div className={topClassName}>
          <h2 style={{ width: 'max-content' }}>当前主题：{currentTheme?.doc_name || '待选择'}</h2>
          <div className={searchWrapClassName}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#e65c41',
                },
              }}
            >
              <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleAddNew}>
                新增主题
              </Button>
            </ConfigProvider>
          </div>
        </div>

        <Form
          form={form}
          style={{ display: `${currentTheme ? 'block' : 'hidden'}`, width: '90%' }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item label="手动编辑以下语料内容，更新数据库" name="content">
            <Input.TextArea rows={24} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
          </Form.Item>
        </Form>
        {!currentTheme && <Empty description="请创建新主题" />}
        <ThemeModal visible={modalVisible} setVisible={setModalVisible} setTableReFresh={setTableReFresh} />
      </div>
    </div>
  )
}

export default ThemeEditor
