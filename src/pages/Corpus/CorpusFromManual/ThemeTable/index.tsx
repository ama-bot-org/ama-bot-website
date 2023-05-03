import corpus from '@/services/ant-design-pro/corpus'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import { ActionType } from '@/services/ant-design-pro/enums'
import { DeleteOutlined, FileFilled, QuestionCircleOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useModel } from '@umijs/max'
import { Popconfirm, Skeleton, Pagination, message } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
dayjs.extend(utc)

type ThemeTableProps = {
  currentTheme: CorpusAPI.FileInfo | undefined
  setCurrentTheme: Dispatch<SetStateAction<CorpusAPI.FileInfo | undefined>>
  tableReFresh: number
}

const ThemeTable = (props: ThemeTableProps) => {
  const { setCurrentTheme, currentTheme, tableReFresh } = props
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [hoverThemeId, setHoverThemeId] = useState<number>()
  const [list, setList] = useState<CorpusAPI.FileInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)

  const ThemeItemClassname = useEmotionCss(() => ({
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
  }))

  const deleteClassname = useEmotionCss(() => ({
    width: 80,
    display: 'inline-flex',
    justifyContent: 'center',
    transition: 'width 0.3s',
    overflow: 'hidden',
  }))

  const handlePaginationChange = (_page: number, _pageSize?: number) => {
    setPage(_page)
    if (_pageSize) {
      setPageSize(_pageSize)
    }
  }

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
          setCurrentTheme(res.data.content[0])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

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

  useEffect(() => {
    init()
  }, [page, pageSize, tableReFresh])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
      {loading ? (
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <Skeleton.Button key={item} rootClassName="w-full!" style={{ width: '100%', height: '50px', marginBottom: '6px' }} />
          ))}
        </div>
      ) : (
        <ul
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            paddingInlineStart: 0,
          }}
        >
          {list?.map(item => (
            <li
              className={ThemeItemClassname}
              style={currentTheme?.id === item.id ? { backgroundColor: '#e74c3c22' } : {}}
              key={item.id}
              onClick={() => {
                setCurrentTheme(item)
              }}
              onMouseOver={() => {
                setHoverThemeId(item.id)
              }}
            >
              <div className="frc-start">
                <FileFilled style={{ fontSize: 16, lineHeight: 18, marginRight: 4 }} />
                <h4
                  style={{
                    display: 'inline-block',
                    margin: 0,
                    fontSize: 18,
                    width: 220,
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

              <div className={item.id === hoverThemeId ? deleteClassname : 'w-0 hidden'}>
                <Popconfirm
                  title="删除这个文件"
                  description="删除后将无法找回，确认删除吗?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() => handleDeleteRow(item)}
                >
                  <DeleteOutlined color="#e74c3c" />
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
    </div>
  )
}

export default ThemeTable
