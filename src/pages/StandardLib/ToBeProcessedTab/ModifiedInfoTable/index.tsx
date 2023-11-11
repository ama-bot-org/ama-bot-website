import { ToBeCheckedLogInfoTableRow } from '@/services/web-api/models/toBeCheckedLogs'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import Button from 'antd/es/button'
import Table from 'antd/lib/table'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ReactComponent as EditIcon } from './icons/edit.svg'
import Tooltip from 'antd/es/tooltip'
import { Divider, Popconfirm } from 'antd'
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'

dayjs.extend(utc)

export enum OperateType {
  'undefined' = 'undefined',
  'accept' = 'accept',
  'delete' = 'delete',
}

type ModifiedInfoTableProps = {
  data: ToBeCheckedLogInfoTableRow[]
  pageSize: number
  total: number
  page: number
  loading: boolean
  operateLoading: OperateType
  operateRowId: number | undefined
  onPageChange: (page: number) => void
  onEditRow: (rowData: ToBeCheckedLogInfoTableRow) => void
  onAcceptRow: (rowData: ToBeCheckedLogInfoTableRow) => void
  onDeleteRow: (rowData: ToBeCheckedLogInfoTableRow) => void
  refreshTable: () => void
}

const ModifiedInfoTable = ({
  data,
  pageSize,
  total,
  page,
  loading,
  operateLoading,
  operateRowId,
  onDeleteRow,
  onEditRow,
  onAcceptRow,
  onPageChange,
}: ModifiedInfoTableProps) => {
  const handleAccept = (rowData: ToBeCheckedLogInfoTableRow) => {
    onAcceptRow(rowData)
  }

  const handleDeleteRow = (rowData: ToBeCheckedLogInfoTableRow) => {
    onDeleteRow(rowData)
  }

  const handleFixRow = (rowData: ToBeCheckedLogInfoTableRow) => {
    onEditRow(rowData)
  }

  const columns = [
    {
      title: '问题',
      dataIndex: 'prompt',
      key: 'history_question',
      ellipsis: {
        showTitle: false,
      },
      width: 300,
      render: (question: string) => (
        <Tooltip placement="bottomLeft" title={question}>
          <div className="w-auto">{question}</div>
        </Tooltip>
      ),
    },
    {
      title: '回答',
      dataIndex: 'answer',
      key: 'history_answer',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, rowData: ToBeCheckedLogInfoTableRow) => (
        <div className="fcc-start">
          <Tooltip placement="bottomLeft" title={rowData.completion}>
            <div className="w-full text-left">原回答：{rowData.completion}</div>
          </Tooltip>
          <Tooltip placement="bottomLeft" title={rowData.modified_answer}>
            <div className="w-full text-left">修正后：{rowData.modified_answer}</div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'create_date',
      key: 'create_date',
      width: 180,
      align: 'center' as any,
      render: (date: number) => dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 330,
      align: 'center' as any,
      render: (_: any, rowData: ToBeCheckedLogInfoTableRow) => (
        <span className="frc-center">
          <Button
            type="text"
            loading={operateLoading === OperateType.accept && rowData.id === operateRowId}
            onClick={() => handleAccept(rowData)}
            icon={<CheckOutlined className="mr-4" />}
          >
            采纳
          </Button>
          <Divider
            type="vertical"
            style={{
              borderInlineStartColor: '#979797',
            }}
          />
          <Button type="text" onClick={() => handleFixRow(rowData)} icon={<EditIcon className="mr-10" />}>
            重新修正
          </Button>
          <Divider
            type="vertical"
            style={{
              borderInlineStartColor: '#979797',
            }}
          />
          <Popconfirm
            title="确认拒绝？"
            description="拒绝后该回答将直接从【待删除】内删除"
            icon={<QuestionCircleOutlined />}
            onConfirm={() => handleDeleteRow(rowData)}
          >
            <Button
              loading={operateLoading === OperateType.delete && rowData.id === operateRowId}
              style={{ marginLeft: '4px' }}
              type="text"
              icon={<CloseOutlined />}
            >
              拒绝
            </Button>
          </Popconfirm>
        </span>
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

export default ModifiedInfoTable
