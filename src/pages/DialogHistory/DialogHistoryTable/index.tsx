import { LogInfoTableRow } from '@/services/web-api/models/logInfo'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import Button from 'antd/es/button'
import Table from 'antd/lib/table'
import Divider from 'antd/lib/Divider'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ReactComponent as LikeIcon } from '@/components/EvaluateBtn/icons/like.svg'
import { ReactComponent as UnlikeIcon } from '@/components/EvaluateBtn/icons/unlike.svg'
import { ReactComponent as EditIcon } from './icons/edit.svg'
import QAModal from '../QAModal'
import { useState } from 'react'
import { noop } from 'lodash'

dayjs.extend(utc)

type NotionTableProps = {
  data: LogInfoTableRow[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  // onEditRow: (rowData: LogInfoTableRow) => void
  onPreviewRow: (rowData: LogInfoTableRow) => void
  // onDeleteRow: (rowData: LogInfoTableRow) => void
  refreshTable: () => void
}

enum CommentType {
  all = 0,
  like = 1,
  unlike = 2,
  noAnswer = 3
}

const NotionTable = ({ data, pageSize, total, page, loading, onPreviewRow, onPageChange, refreshTable = noop }: NotionTableProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [editData, setEditData] = useState<LogInfoTableRow>()

  const handlePreviewRow = (rowData: LogInfoTableRow) => {
    onPreviewRow(rowData)
  }

  // const handleDeleteRow = (rowData: LogInfoTableRow) => {
  //   onDeleteRow(rowData)
  // }

  const handleFixRow = (rowData: LogInfoTableRow) => {
    setModalVisible(true)
    setEditData(rowData)
  }

  const okCallback = () => {
    setEditData(undefined);
    refreshTable()
  }

  const columns = [
    {
      title: '问题',
      dataIndex: 'question',
      key: 'history_question',
    },
    {
      title: '回答',
      dataIndex: 'answer',
      key: 'history_answer',
    },
    {
      title: '创建时间',
      dataIndex: 'create_date',
      key: 'create_date',
      render: (date: number) => dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '评价',
      dataIndex: 'comment_type',
      key: 'comment_type',
      width: 120,
      render: (comment_type: CommentType) => {
        if ( comment_type === CommentType.like ) {
          return <div className='frc-center'><LikeIcon/><span className='ml-8'>答得不错</span></div>
        } else if( comment_type === CommentType.unlike ) {
          return <div className='frc-center'><UnlikeIcon/><span className='ml-8'>差点意思</span></div>
        } else if( comment_type === CommentType.noAnswer ){
          return '' // 暂无答案
        } else {
          return null
        } 
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 220,
      render: (_: any, rowData: LogInfoTableRow) => (
        <>
          {/* <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button> */}
          {rowData.fix_info === 1 ? (
            <span style={{ paddingRight: 15 }}>已修正</span>
          ) : (
            <Button type="text" onClick={() => handleFixRow(rowData)} icon={<EditIcon />}>
              修正
            </Button>
          )}
          <Divider type="vertical" style={{background:'#979797'}}/>
          <Button type="text" onClick={() => handlePreviewRow(rowData)} icon={<EyeOutlined />}>
            查看
          </Button>
          {/* <Popconfirm
            title="删除这条对话记录吗？"
            description="删除后将无法找回，确认删除吗？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteRow(rowData)}
          >
            <Button style={{ marginLeft: '4px' }} danger type="text" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm> */}
        </>
      ),
    },
  ]

  const QAInfo = {
    prompt: editData?.question as string,
    completion: editData?.answer as string,
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showTotal: total => `共 ${total} 条`,
          showQuickJumper: true,
        }}
        loading={loading}
        rowKey={rowData => rowData.id!.toString()}
        onChange={pagination => {
          onPageChange(pagination.current!)
        }}
      />
      <QAModal 
        visible={modalVisible}
        setVisible={setModalVisible}
        QAInfo={QAInfo}
        okCallback={okCallback}
        log_id={editData?.id as number}
      />
    </>

  )
}

export default NotionTable
