import { API } from '@/services/ant-design-pro/typings'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Button } from 'antd'
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
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (_: any, rowData: API.QAFormInfo) => (
        <>
          <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button>
          <Button style={{ marginLeft: '4px' }} danger type="primary" onClick={() => handleDeleteRow(rowData)} icon={<DeleteOutlined />}>
            删除
          </Button>
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
