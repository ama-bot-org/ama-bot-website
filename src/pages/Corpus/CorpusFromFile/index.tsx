import { useEffect, useState } from 'react'
import { useIntl, useModel } from '@umijs/max'
import { Button, Pagination, Popconfirm, message } from 'antd'
import corpus from '@/services/web-api/corpus'
import { DocInfo } from '@/services/web-api/models/corpus'
import { ActionType } from '@/constants/enums'
import CustomUploadComponent from '@/components/CustomUpload'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DownloadOutlined from '@ant-design/icons/DownloadOutlined'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import FileFilled from '@ant-design/icons/FileFilled'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import Loading3QuartersOutlined from '@ant-design/icons/Loading3QuartersOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Input from 'antd/lib/input'
import PreviewModal from '../PreviewModal'
import CorpusDescription from '../CorpusDescription'
dayjs.extend(utc)

const CorpusFromFile = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [list, setList] = useState<DocInfo[]>([])
  const [total, setTotal] = useState<number>(0)
  const [searchValue, setSearchValue] = useState('')
  const [previewContent, setPreviewContent] = useState<string>('')
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  const init = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        let params = {
          bot_id: currentUser?.bot_id,
          page,
          pageSize,
        }
        if (searchValue) {
          Object.assign(params, { searchWord: searchValue })
        }
        const res = await corpus.getDocsList(params)
        if (res.ActionType === ActionType.OK) {
          setList(res.data.content)
          setTotal(res.data.count)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePaginationChange = (_page: number, _pageSize?: number) => {
    setPage(_page)
    if (_pageSize) {
      setPageSize(_pageSize)
    }
  }

  const handleUpdateList = () => {
    init()
  }

  useEffect(() => {
    init()
  }, [page, pageSize])

  const fileItemClassname = useEmotionCss(() => ({
    width: '100%',
    height: '60px',
    padding: '0px 20px',
    marginBottom: '6px',
    backgroundColor: '#ffffff55',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ':hover': {
      backgroundColor: '#ffffffcc',
    },
    '@media screen and (max-width: 768px)': {
      flexDirection: 'column',
      minWidth: '280px',
      marginBottom: '12px',
      alignItems: 'flex-end',
      height: 'auto',
    },
  }))

  const handleDeleteRow = async (rowData: DocInfo) => {
    if (!currentUser?.bot_id) {
      message.error('请重新登录后再试')
      return
    }
    try {
      const res = await corpus.deleteDoc({
        bot_id: currentUser?.bot_id,
        id: rowData.id,
      })
      if (res.ActionType === ActionType.OK) {
        init()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownload = async (id: number, filename: string) => {
    if (!currentUser?.bot_id) {
      message.error('请重新登录后再试')
      return
    }
    try {
      const res = await corpus.downloadDoc({
        bot_id: currentUser.bot_id,
        id,
        file_name: filename,
      })
      if (res.ActionType === ActionType.OK && res.downloadUrl) {
        window.open(res.downloadUrl, '_blank')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      init()
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setSearchValue('')
    } else {
      setSearchValue(value)
    }
  }

  const handlePreview = (content: string) => {
    setPreviewContent(content)
    setPreviewVisible(true)
  }

  const topClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      alignItems: 'space-between',
      flexDirection: 'row',
      width: '80%',
      '@media screen and (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'start',
        marginBottom: '20px',
        width: '280px',
      },
    }
  })

  return (
    <div className="w-full fcs-center md:flex-row md:items-start overflow-hidden">
      <CustomUploadComponent onSuccessUpload={handleUpdateList} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          flex: 1,
          width: '100%',
          background: '#ffffffa1',
          minHeight: '435px',
        }}
      >
        {list.length === 0 ? (
          loading ? (
            <Loading3QuartersOutlined />
          ) : (
            <CorpusDescription />
          )
        ) : (
          <>
            <div className={topClassName}>
              <Input
                onKeyUp={handleKeyUp}
                onChange={handleSearchChange}
                style={{ width: '100%', height: 32, margin: '10px 0px' }}
                suffix={
                  <SearchOutlined
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      init()
                    }}
                  />
                }
              />
            </div>
            <ul
              style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                paddingInlineStart: 0,
              }}
            >
              {list?.map(item => (
                <li className={fileItemClassname} key={item.id}>
                  <div className="frc-start w-full md:w-auto">
                    <FileFilled style={{ fontSize: 16, lineHeight: 18, marginRight: 4 }} />
                    <h4
                      style={{
                        display: 'inline-block',
                        margin: 0,
                        fontSize: 18,
                        width: 180,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'default',
                      }}
                      title={item.file_name}
                    >
                      {item.file_name}
                    </h4>
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>{dayjs.utc(item.date).format('YYYY-MM-DD HH:mm:ss')}</h4>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        handlePreview(item.file_content)
                      }}
                    >
                      预览
                    </Button>
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      onClick={() => {
                        handleDownload(item.id, item.file_name)
                      }}
                    >
                      下载
                    </Button>
                    <Popconfirm
                      title="删除这个文件"
                      description="删除后将无法找回，确认删除吗?"
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      onConfirm={() => handleDeleteRow(item)}
                      cancelText={intl.formatMessage({
                        id: 'button.cancel',
                        defaultMessage: '取消',
                      })}
                      okText={intl.formatMessage({
                        id: 'button.ok',
                        defaultMessage: '确认',
                      })}
                    >
                      <Button style={{ marginLeft: '4px' }} danger type="text" icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Popconfirm>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              showQuickJumper
              showTotal={(total: number) => `共 ${total} 条`}
              onChange={handlePaginationChange}
            />
          </>
        )}
      </div>
      <PreviewModal content={previewContent} visible={previewVisible} setVisible={setPreviewVisible} />
    </div>
  )
}

export default CorpusFromFile
