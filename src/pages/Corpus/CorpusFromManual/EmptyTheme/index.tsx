import { Button, ConfigProvider, Empty } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import ThemeModal from '../ThemeModal'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'

type EmptyThemeProps = {
  setCurrentTheme: Dispatch<SetStateAction<CorpusAPI.FileInfo | undefined>>
}
const EmptyTheme = (props: EmptyThemeProps) => {
  const { setCurrentTheme } = props
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddNew = () => {
    setModalVisible(true)
  }

  const setTableReFresh = () => {
    setCurrentTheme({
      id: 1,
      bot_id: '1',
      doc_name: '11',
      type: 2,
      content: '11',
      date: 2,
    })
  }

  return (
    <div className="w-full frc-center">
      <Empty
        rootClassName="w-full fcc-center"
        style={{ width: '100%', height: '400px' }}
        imageStyle={{ width: 400, height: 300 }}
        description={
          <div>
            <h3>当前暂无主题</h3>
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
        }
      />
      <ThemeModal visible={modalVisible} setVisible={setModalVisible} setTableReFresh={setTableReFresh} />
    </div>
  )
}

export default EmptyTheme
