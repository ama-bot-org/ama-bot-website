import { QAFormInfo } from '@/services/web-api/models/standardLib'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import { useIntl } from '@umijs/max'
import Table from 'antd/es/table'
import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

type QATableProps = {
  data: QAFormInfo[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  onPageChange: (page: number) => void
  onEditRow: (rowData: QAFormInfo) => void
  onDeleteRow: (rowData: QAFormInfo) => void
}

const QATable = ({ data, pageSize, total, page, loading, onEditRow, onDeleteRow, onPageChange }: QATableProps) => {
  const intl = useIntl()
  const handleEditRow = (rowData: QAFormInfo) => {
    onEditRow(rowData)
  }

  const handleDeleteRow = (rowData: QAFormInfo) => {
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
      render: (_: any, rowData: QAFormInfo) => (
        <>
          <Button onClick={() => handleEditRow(rowData)} icon={<EditOutlined />}>
            {intl.formatMessage({
              id: 'button.edit',
              defaultMessage: '编辑',
            })}
          </Button>
          <Popconfirm
            title="删除这条语料"
            description="删除后将无法找回，确认删除吗?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteRow(rowData)}
            cancelText={intl.formatMessage({
              id: 'button.cancel',
              defaultMessage: '取消',
            })}
            okText={intl.formatMessage({
              id: 'button.ok',
              defaultMessage: '确认',
            })}
          >
            <Button style={{ marginLeft: '4px' }} danger type="text" icon={<DeleteOutlined />}>
              {intl.formatMessage({
                id: 'button.delete',
                defaultMessage: '删除',
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

export default QATable
