import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, Helmet, useModel } from '@umijs/max'
import Settings from '../../../config/defaultSettings'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { Button, ConfigProvider, Form, message } from 'antd'
import Input from 'antd/es/input'
import QAModal from './QAModal'
import QATable from './QATable'
import { deleteStandardInfo, getStandardTableInfo } from '@/services/web-api/standardLib'
import { QAFormInfo } from '@/services/web-api/models/standardLib'
import { ActionType } from '@/constants/enums'

const StandardLib: React.FC = () => {
  const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<QAFormInfo[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState<string | undefined>()

  const [currentRow, setCurrentRow] = useState<QAFormInfo | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = useForm()

  const initQATable = async (noSearch?: boolean) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await getStandardTableInfo({
          bot_id: currentUser.bot_id,
          searchWord: noSearch ? '' : searchValue,
          page,
          pageSize,
        })
        if (res.ActionType === ActionType.OK) {
          setData(res.data.content)
          setTotal(res.data.count)
        } else {
          message.error(res?.message || '获取标准问答库失败')
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
    setModalVisible(true)
  }

  const handleEditRow = (record: QAFormInfo) => {
    setCurrentRow(record)
    setModalVisible(true)
  }

  const handleDeleteRow = async (record: QAFormInfo) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await deleteStandardInfo({
          bot_id: currentUser.bot_id,
          id: record.id!,
        })
        if (res.ActionType === ActionType.OK) {
          await initQATable()
        } else {
          message.error(res?.message || '删除标准问答失败')
        }
      } catch (error) {
        message.error('删除标准问答失败')
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

  const setTableRefresh = () => {
    setSearchValue(undefined)
    form.resetFields()
    initQATable(true)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    if (searchValue !== undefined) {
      initQATable()
    }
  }, [searchValue])

  useEffect(() => {
    setSearchValue(undefined)
    initQATable()
  }, [page, pageSize])

  useEffect(() => {
    if (!modalVisible) {
      setCurrentRow(undefined)
    }
  }, [modalVisible])

  const topClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: '20px',
      '@media screen and (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'start',
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
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div className={topClassName}>
          <h3 className={headerTitleClassName}>标准问答库：自定义一对一标准问答</h3>
          <div className={searchWrapClassName}>
            <Form form={form} layout="inline">
              <Form.Item name="search">
                <Input.Search className={searchClassName} onSearch={handleSearch} />
              </Form.Item>
            </Form>
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
          modalType={currentRow ? 'edit' : 'add'}
          setTableRefresh={setTableRefresh}
        />
      </div>
    </div>
  )
}

export default StandardLib
