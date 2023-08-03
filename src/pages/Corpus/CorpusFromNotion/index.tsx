import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { Button, ConfigProvider, message } from 'antd'
// import Input from 'antd/es/input'
import NotionModal from './NotionModal'
import NotionTable from './NotionTable'
import { ActionType } from '@/constants/enums'
import corpus from '@/services/web-api/corpus'
import { NotionTableRow } from '@/services/web-api/models/corpus'

const CorpusFromNotion: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<NotionTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [searchValue] = useState<string | undefined>()

  const [currentRow, setCurrentRow] = useState<NotionTableRow | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'preview' | undefined>('add')

  const initNotionTable = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await corpus.getNotionTable({
          bot_id: currentUser.bot_id,
          // searchWord: searchValue,
          page,
          pageSize,
        })
        if (res.ActionType === ActionType.OK) {
          setData(res.data.content)
          setTotal(res.data.count)
        } else {
          message.error(res?.message || '获取 Notion 语料表失败')
        }
      } catch (error) {
        message.error('获取 Notion 语料表失败')
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

  const handlePreviewRow = (record: NotionTableRow) => {
    setCurrentRow(record)
    setModalType('preview')
    setModalVisible(true)
  }

  // const handleEditRow = (record: NotionTableRow) => {
  //   setCurrentRow(record)
  //   setModalType('edit')
  //   setModalVisible(true)
  // }

  const handleDeleteRow = async (record: NotionTableRow) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await corpus.deleteNotion({
          bot_id: currentUser.bot_id,
          id: record.id!,
        })
        if (res.ActionType === ActionType.OK) {
          await initNotionTable()
        } else {
          message.error(res?.message || '删除失败')
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
    initNotionTable()
  }

  // const handleSearch = (value: string) => {
  //   setSearchValue(value)
  // }

  useEffect(() => {
    initNotionTable()
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
      alignItems: 'center',
      justifyContent: 'flex-end',
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
                新增 Notion 文档
              </Button>
            </ConfigProvider>
          </div>
        </div>
        <NotionTable
          pageSize={pageSize}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          loading={loading}
          data={data}
          onPreviewRow={handlePreviewRow}
          // onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
        />
        <NotionModal
          visible={modalVisible}
          setVisible={setModalVisible}
          notionInfo={currentRow}
          setTableReFresh={setTableReFresh}
          modalType={modalType}
        />
      </div>
    </div>
  )
}

export default CorpusFromNotion
