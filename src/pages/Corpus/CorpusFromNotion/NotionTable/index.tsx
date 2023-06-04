import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import { QuestionCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
// import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
// import { Table, Button, Popconfirm } from 'antd'
import Table from 'antd/lib/table'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

type NotionTableProps = {
  data: CorpusAPI.NotionTableRow[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  // onEditRow: (rowData: CorpusAPI.NotionTableRow) => void
  onPreviewRow: (rowData: CorpusAPI.NotionTableRow) => void
  onDeleteRow: (rowData: CorpusAPI.NotionTableRow) => void
}

const NotionTable = ({ data, pageSize, total, page, loading, onPreviewRow, onDeleteRow, onPageChange }: NotionTableProps) => {
  const handlePreviewRow = (rowData: CorpusAPI.NotionTableRow) => {
    onPreviewRow(rowData)
  }

  // const handleEditRow = (rowData: CorpusAPI.NotionTableRow) => {
  //   onEditRow(rowData)
  // }

  const handleDeleteRow = (rowData: CorpusAPI.NotionTableRow) => {
    onDeleteRow(rowData)
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'doc_name',
      key: 'doc_name',
    },
    {
      title: 'Notion id',
      dataIndex: 'page_id',
      key: 'page_id',
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
      render: (_: any, rowData: CorpusAPI.NotionTableRow) => (
        <>
          {/* <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button> */}
          <Button type="text" onClick={() => handlePreviewRow(rowData)} icon={<EyeOutlined />}>
            预览
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
      rowKey={rowData => rowData.doc_hash!.toString()}
      onChange={pagination => {
        onPageChange(pagination.current!)
      }}
    />
  )
}

export default NotionTable
