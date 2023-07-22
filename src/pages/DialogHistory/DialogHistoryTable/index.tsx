import { LogInfoTableRow } from '@/services/web-api/models/logInfo'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import Button from 'antd/es/button'
import Table from 'antd/lib/table'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
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
}

const NotionTable = ({ data, pageSize, total, page, loading, onPreviewRow, onPageChange }: NotionTableProps) => {
  const handlePreviewRow = (rowData: LogInfoTableRow) => {
    onPreviewRow(rowData)
  }

  // const handleDeleteRow = (rowData: LogInfoTableRow) => {
  //   onDeleteRow(rowData)
  // }

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
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '200px',
      render: (_: any, rowData: LogInfoTableRow) => (
        <>
          {/* <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button> */}
          <Button type="text" onClick={() => handlePreviewRow(rowData)} icon={<EyeOutlined />}>
            预览
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

  return (
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
  )
}

export default NotionTable
