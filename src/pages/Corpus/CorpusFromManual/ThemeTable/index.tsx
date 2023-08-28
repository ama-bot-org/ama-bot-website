import { FileInfo } from '@/services/web-api/models/corpus'
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
import { useIntl } from '@umijs/max'
import Tooltip from 'antd/es/tooltip'
dayjs.extend(utc)

type ThemeTableProps = {
  data: FileInfo[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  onEditRow: (rowData: FileInfo) => void
  onDeleteRow: (rowData: FileInfo) => void
}

const ThemeTable = ({ data, pageSize, total, page, loading, onEditRow, onDeleteRow, onPageChange }: ThemeTableProps) => {
  const intl = useIntl()

  const handleEditRow = (rowData: FileInfo) => {
    onEditRow(rowData)
  }

  const handleDeleteRow = (rowData: FileInfo) => {
    onDeleteRow(rowData)
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'doc_name',
      key: 'doc_name',
      ellipsis: {
        showTitle: false,
      },
      width: 180,
      render: (doc_name: string) => (
        <Tooltip title={doc_name} placement="bottom">
          <div className="w-auto">{doc_name}</div>
        </Tooltip>
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: {
        showTitle: false,
      },
      width: 500,
      render: (content: string) => (
        <Tooltip title={content} placement="bottom">
          <div className="w-auto"> {content}</div>
        </Tooltip>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
      width: 180,
      align: 'center' as any,
      render: (date: number) => dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 220,
      align: 'center' as any,
      render: (_: any, rowData: FileInfo) => (
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
      rowKey={rowData => rowData.id!.toString()}
      onChange={pagination => {
        onPageChange(pagination.current!)
      }}
    />
  )
}

export default ThemeTable
