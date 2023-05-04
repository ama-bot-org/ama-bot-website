import { API } from '@/services/ant-design-pro/typings'
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Table, Button, Popconfirm } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

type QATableProps = {
  data: API.QAFormInfo[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  onEditRow: (rowData: API.QAFormInfo) => void
  onDeleteRow: (rowData: API.QAFormInfo) => void
}

const QATable = ({ data, pageSize, total, page, loading, onEditRow, onDeleteRow, onPageChange }: QATableProps) => {
  const handleEditRow = (rowData: API.QAFormInfo) => {
    onEditRow(rowData)
  }

  const handleDeleteRow = (rowData: API.QAFormInfo) => {
    onDeleteRow(rowData)
  }

  const columns = [
    {
      title: '问题',
      dataIndex: 'prompt',
      key: 'prompt',
    },
    {
      title: '回答',
      dataIndex: 'completion',
      key: 'completion',
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
      render: (date: number) => dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss'),
      width: '200px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '200px',
      render: (_: any, rowData: API.QAFormInfo) => (
        <>
          <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button>
          <Popconfirm
            title="删除这条语料"
            description="删除后将无法找回，确认删除吗?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteRow(rowData)}
          >
            <Button style={{ marginLeft: '4px' }} danger type="text" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
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

export default QATable
