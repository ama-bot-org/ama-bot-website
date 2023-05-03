import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet, useModel } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import { useEffect, useState } from 'react'
import { Button, ConfigProvider, message } from 'antd'
import Input from 'antd/es/input'
import QAModal from './QAModal'
import QATable from './QATable'
import { API } from '@/services/ant-design-pro/typings'
import { deleteStandardInfo, getStandardTableInfo } from '@/services/ant-design-pro/standardLib'
import { ActionType } from '@/services/ant-design-pro/enums'

const StandardLib: React.FC = () => {
  const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<API.QAFormInfo[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState<string | undefined>()

  const [currentRow, setCurrentRow] = useState<API.QAFormInfo | undefined>()
  const [modalVisible, setModalVisible] = useState(false)

  const initQATable = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await getStandardTableInfo({
          bot_id: currentUser.bot_id,
          searchWord: searchValue,
          page,
          pageSize,
        })
        if (res.ActionType === ActionType.OK) {
          setData(res.data.content)
          setTotal(res.data.count)
        }
      } catch (error) {
        message.error('获取标准问答库失败')
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

  const headerTitleClassName = useEmotionCss(() => {
    return {
      width: 'max-content',
    }
  })

  const handleAddNew = () => {
    setCurrentRow(undefined)
    setModalVisible(true)
  }

  const handleEditRow = (record: API.QAFormInfo) => {
    setCurrentRow(record)
    setModalVisible(true)
  }

  const handleDeleteRow = async (record: API.QAFormInfo) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await deleteStandardInfo({
          bot_id: currentUser.bot_id,
          id: record.id!,
        })
        if (res.ActionType === ActionType.OK) {
          await initQATable()
        }
      } catch (error) {
        message.error('获取标准问答库失败')
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
    initQATable()
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    initQATable()
  }, [page, searchValue])

  const topClassName = useEmotionCss(() => {
    return {
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

  const searchClassName = useEmotionCss(() => {
    return {
      width: '375px',
      '@media screen and (max-width: 768px)': {
        width: '100%',
      },
    }
  })

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.database-config.standard-lib',
            defaultMessage: '标准问答库',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div className={topClassName}>
          <h3 className={headerTitleClassName}>标准问答库：自定义一对一标准问答</h3>
          <div className={searchWrapClassName}>
            <Input.Search className={searchClassName} onSearch={handleSearch} />
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#e65c41',
                },
              }}
            >
              <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleAddNew}>
                新增问答
              </Button>
            </ConfigProvider>
          </div>
        </div>
        <QATable
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          pageSize={pageSize}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          loading={loading}
          data={data}
        />
        <QAModal
          visible={modalVisible}
          setVisible={setModalVisible}
          QAInfo={currentRow}
          setTableReFresh={setTableReFresh}
          modalType={currentRow ? 'edit' : 'add'}
        />
      </div>
    </div>
  )
}

export default StandardLib
