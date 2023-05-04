import Skeleton from 'antd/es/skeleton'
import { useEffect, useState } from 'react'
import { Button, Pagination, Popconfirm, message } from 'antd'
import corpus from '@/services/ant-design-pro/corpus'
import { useModel } from '@umijs/max'
import { ActionType } from '@/services/ant-design-pro/enums'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import CustomUploadComponent from '@/components/CustomUpload'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { DeleteOutlined, EyeOutlined, FileFilled, QuestionCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import PreviewModal from '../PreviewModal'
dayjs.extend(utc)

const CorpusFromFile = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [list, setList] = useState<CorpusAPI.FileInfo[]>([])
  const [total, setTotal] = useState<number>(0)
  const [previewContent, setPreviewContent] = useState<string>('')
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  const init = async () => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await corpus.getFileList({
          bot_id: currentUser?.bot_id,
          type: 2,
          page,
          pageSize,
        })
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

  const handleDeleteRow = async (rowData: CorpusAPI.FileInfo) => {
    if (!currentUser?.bot_id) {
      message.error('请重新登录后再试')
      return
    }
    try {
      const res = await corpus.deleteFile({
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

  const handlePreview = (content: string) => {
    setPreviewContent(content)
    setPreviewVisible(true)
  }

  return (
    <div className="w-full fcs-center md:flex-row md:items-start overflow-hidden">
      <CustomUploadComponent onSuccessUpload={handleUpdateList} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', flex: 1 }}>
        {loading ? (
          <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <Skeleton.Button key={item} rootClassName="w-full!" style={{ width: '100%', height: '60px', marginBottom: '6px' }} />
            ))}
          </div>
        ) : (
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
                    title={item.doc_name}
                  >
                    {item.doc_name}
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
                      handlePreview(item.content)
                    }}
                  >
                    预览
                  </Button>
                  <Popconfirm
                    title="删除这个文件"
                    description="删除后将无法找回，确认删除吗?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => handleDeleteRow(item)}
                  >
                    <Button style={{ marginLeft: '4px' }} danger type="text" icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          showQuickJumper
          showTotal={(total: number) => `共 ${total} 条`}
          onChange={handlePaginationChange}
        />
        <PreviewModal content={previewContent} visible={previewVisible} setVisible={setPreviewVisible} />
      </div>
    </div>
  )
}

export default CorpusFromFile
