import { Button, ConfigProvider, Empty } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import ThemeModal from '../ThemeModal'

type EmptyThemeProps = {
  setCurrentTheme: Dispatch<SetStateAction<number>>
}
const EmptyTheme = (props: EmptyThemeProps) => {
  const { setCurrentTheme } = props
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddNew = () => {
    setModalVisible(true)
  }

  const setTableReFresh = () => {
    setCurrentTheme(new Date().getTime())
  }

  return (
    <div className="w-full frc-center">
      <Empty
        rootClassName="w-full fcc-center"
        style={{ width: '100%', height: '550px' }}
        imageStyle={{ width: 400, height: 210 }}
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
