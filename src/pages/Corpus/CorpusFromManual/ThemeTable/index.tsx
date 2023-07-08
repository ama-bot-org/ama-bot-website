import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Button from 'antd/es/button'
import Popconfirm from 'antd/es/popconfirm'
// import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
// import { Table, Button, Popconfirm } from 'antd'
import Table from 'antd/lib/table'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

type ThemeTableProps = {
  data: CorpusAPI.FileInfo[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  onEditRow: (rowData: CorpusAPI.FileInfo) => void
  onDeleteRow: (rowData: CorpusAPI.FileInfo) => void
}

const ThemeTable = ({ data, pageSize, total, page, loading, onEditRow, onDeleteRow, onPageChange }: ThemeTableProps) => {
  const handleEditRow = (rowData: CorpusAPI.FileInfo) => {
    onEditRow(rowData)
  }

  const handleDeleteRow = (rowData: CorpusAPI.FileInfo) => {
    onDeleteRow(rowData)
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'doc_name',
      key: 'doc_name',
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
      width: '200px',
      render: (_: any, rowData: CorpusAPI.FileInfo) => (
        <>
          <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button>
          {/* <Button type="text" onClick={() => handlePreviewRow(rowData)} icon={<EyeOutlined />}>
            预览
          </Button> */}
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

export default ThemeTable
