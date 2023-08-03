import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import Button from 'antd/es/button'
import Popconfirm from 'antd/es/popconfirm'
// import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
// import { Table, Button, Popconfirm } from 'antd'
import Table from 'antd/lib/table'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NotionTableRow } from '@/services/web-api/models/corpus'
import { useIntl } from '@umijs/max'
dayjs.extend(utc)

type NotionTableProps = {
  data: NotionTableRow[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  // onEditRow: (rowData: NotionTableRow) => void
  onPreviewRow: (rowData: NotionTableRow) => void
  onDeleteRow: (rowData: NotionTableRow) => void
}

const NotionTable = ({ data, pageSize, total, page, loading, onPreviewRow, onDeleteRow, onPageChange }: NotionTableProps) => {
  const intl = useIntl()
  const handlePreviewRow = (rowData: NotionTableRow) => {
    onPreviewRow(rowData)
  }

  // const handleEditRow = (rowData: NotionTableRow) => {
  //   onEditRow(rowData)
  // }

  const handleDeleteRow = (rowData: NotionTableRow) => {
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
      render: (_: any, rowData: NotionTableRow) => (
        <>
          {/* <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            编辑
          </Button> */}
          <Button type="text" onClick={() => handlePreviewRow(rowData)} icon={<EyeOutlined />}>
            {intl.formatMessage({
              id: 'button.preview',
            })}
          </Button>
          <Popconfirm
            title="删除这条语料"
            description="删除后将无法找回，确认删除吗?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteRow(rowData)}
            cancelText={intl.formatMessage({
              id: 'button.cancel',
            })}
            okText={intl.formatMessage({
              id: 'button.ok',
            })}
          >
            <Button style={{ marginLeft: '4px' }} danger type="text" icon={<DeleteOutlined />}>
              {intl.formatMessage({
                id: 'button.delete',
              })}
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
