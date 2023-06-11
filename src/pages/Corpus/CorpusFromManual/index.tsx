import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { Button, ConfigProvider, message } from 'antd'
// import Input from 'antd/es/input'
import ThemeModal from './ThemeModal'
import ThemeTable from './ThemeTable'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import { ActionType } from '@/services/ant-design-pro/enums'
import corpus from '@/services/ant-design-pro/corpus'
import CorpusUpdateButton from '@/components/CorpusUpdateButton'

const CorpusFromManual: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<CorpusAPI.FileInfo[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [searchValue] = useState<string | undefined>()

  const [currentRow, setCurrentRow] = useState<CorpusAPI.FileInfo | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'preview' | undefined>('add')

  const initFileTable = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await corpus.getFileList({
          bot_id: currentUser?.bot_id,
          type: 3,
          page,
          pageSize,
        })
        if (res.ActionType === ActionType.OK) {
          setData(res.data.content)
          setTotal(res.data.count)
        }
      } catch (error) {
        message.error('获取 File 语料表失败')
      } finally {
        setLoading(false)
      }
    } else {
      message.error('获取机器人ID失败')
    }
  }

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }
  })

  const handleAddNew = () => {
    setCurrentRow(undefined)
    setModalType('add')
    setModalVisible(true)
  }

  const handleEditRow = (record: CorpusAPI.FileInfo) => {
    setCurrentRow(record)
    setModalType('edit')
    setModalVisible(true)
  }

  const handleDeleteRow = async (record: CorpusAPI.FileInfo) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await corpus.deleteFile({
          bot_id: currentUser.bot_id,
          id: record.id!,
        })
        if (res.ActionType === ActionType.OK) {
          await initFileTable()
        }
      } finally {
        setLoading(false)
      }
    } else {
      message.error('获取机器人ID失败')
    }
  }

  const handlePageChange = (_page: number) => {
    setPage(_page)
  }

  const setTableReFresh = () => {
    initFileTable()
  }

  // const handleSearch = (value: string) => {
  //   setSearchValue(value)
  // }

  useEffect(() => {
    initFileTable()
  }, [page, searchValue])

  const topClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'space-between',
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
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: '20px',
    }
  })

  // const searchClassName = useEmotionCss(() => {
  //   return {
  //     width: '375px',
  //     '@media screen and (max-width: 768px)': {
  //       width: '100%',
  //     },
  //   }
  // })

  return (
    <div className={containerClassName}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div className={topClassName}>
          <div className={searchWrapClassName}>
            {/* <Input.Search className={searchClassName} onSearch={handleSearch} /> */}
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#e65c41',
                },
              }}
            >
              <Button type="primary" style={{ marginRight: '10px' }} onClick={handleAddNew}>
                新增语料源
              </Button>
            </ConfigProvider>
          </div>
          <CorpusUpdateButton />
        </div>
        <ThemeTable
          pageSize={pageSize}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          loading={loading}
          data={data}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
        />
        <ThemeModal
          visible={modalVisible}
          setVisible={setModalVisible}
          fileInfo={currentRow}
          setTableReFresh={setTableReFresh}
          modalType={modalType}
        />
      </div>
    </div>
  )
}

export default CorpusFromManual
