import Dialog from '@/pages/Bot/Dialog'
import logInfo from '@/services/web-api/logInfo'
import { LogInfoTableRow } from '@/services/web-api/models/logInfo'
import { Empty, Modal } from 'antd'
import { useEffect, useState } from 'react'

type Iprops = {
  open: boolean
  onCancel: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  dialogInfo?: LogInfoTableRow
}
type DialogItem = {
  type: 'question' | 'answer'
  content: any
}

export default ({ open, onCancel, dialogInfo }: Iprops) => {
  const [dialogs, setDialogs] = useState<DialogItem[]>([])

  useEffect(() => {
    if (open && dialogInfo) {
      logInfo
        .getlogInfoById({
          page: 1,
          pageSize: 5,
          bot_id: dialogInfo.bot_id,
          uuid: dialogInfo.uuid,
          id: dialogInfo.id,
        })
        .then(res => {
          if (res.ActionType === 'OK') {
            let _dialogs: DialogItem[] = []
            const sortedData = res.data.content.sort((a, b) => new Date(a.create_date).getTime() - new Date(b.create_date).getTime())
            sortedData.forEach(item => {
              const q: DialogItem = {
                type: 'question',
                content: item.question,
              }
              const a: DialogItem = {
                type: 'answer',
                content: item.answer,
              }
              _dialogs = [..._dialogs, q, a]
            })
            setDialogs(_dialogs)
            setTimeout(() => {
              const dom = document.getElementById('bot-view-dialog')
              if (dom) {
                dom.scrollTop = dom.scrollHeight
              }
            }, 200)
          }
        })
    }
  }, [open, dialogInfo])

  return (
    <Modal title="查看上下文" open={open} onCancel={onCancel} footer={null}>
      {dialogs.length ? (
        <div className="w-full flex flex-column overflow-hidden mb-8">
          <ul
            style={{ display: 'flex', flexDirection: 'column', paddingInlineStart: 0, maxHeight: 540, overflow: 'auto' }}
            className="flex-1"
            id="bot-view-dialog"
          >
            {dialogs.map((dialog, index) => {
              return (
                <li key={index} className="my-2 mx-18 h-auto">
                  <Dialog position={dialog.type === 'question' ? 'right-bottom' : 'left-bottom'}>{dialog.content}</Dialog>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <Empty />
      )}
    </Modal>
  )
}
