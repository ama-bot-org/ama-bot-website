import QAModal from '@/components/QAModal'
import logInfoApi from '@/services/web-api/logInfo'
import { CommentType } from '@/services/web-api/models/logInfo'
import { useModel } from '@umijs/max'
import message from 'antd/es/message'
import { FC, useEffect, useState } from 'react'
import { FixBtn, LikeBtn, Size, UnLikeBtn } from '../EvaluateBtn'

type Iprops = {
  hasFix?: boolean
  show: boolean
  className?: string
  size?: Size
  prompt: string
  completion: string
  botId?: string
}

enum ActiveBtn {
  like = 'like',
  unlike = 'unlike',
}

const Evaluate: FC<Iprops> = ({ botId, show = true, hasFix = true, className, size = 'base', prompt, completion }) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [activeBtn, setActiveBtn] = useState<ActiveBtn>()
  const [log_id, setLogId] = useState<number>()
  const [isFixed, setIsFixed] = useState(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const evaluate = async (comment_type: CommentType) => {
    try {
      if (!botId && !currentUser?.bot_id) {
        return false
      }
      const { ActionType, message, LogId } = await logInfoApi.commentInfo({
        bot_id: (botId || currentUser?.bot_id)!,
        comment_type,
        question: prompt,
      })

      if (ActionType === 'OK') {
        setLogId(LogId)
        return true
      } else {
        throw message
      }
    } catch (e) {
      message.error((e as Error)?.message)
    }
    return false
  }

  const onLike = async () => {
    if (activeBtn === ActiveBtn.like) return
    const res = await evaluate(CommentType.like)
    if (res) {
      setActiveBtn(ActiveBtn.like)
    }
  }

  const onUnlike = async () => {
    if (activeBtn === ActiveBtn.unlike) return
    const res = await evaluate(CommentType.unlike)
    if (res) {
      setActiveBtn(ActiveBtn.unlike)
    }
  }

  const onFix = () => {
    if (isFixed) return
    setModalVisible(true)
  }

  const onFixed = () => {
    setIsFixed(true)
    message.success('保存成功，已新增到标准问答库')
  }

  useEffect(() => {
    if (!show) {
      // 重置
      setActiveBtn(undefined)
      setIsFixed(false)
      setModalVisible(false)
      setLogId(undefined)
    }
  }, [show])

  return (
    <>
      {show && (
        <div className={className}>
          <LikeBtn size={size} onClick={onLike} active={activeBtn === ActiveBtn.like} disabled={isFixed} />
          <UnLikeBtn className="ml-8" size={size} onClick={onUnlike} active={activeBtn === ActiveBtn.unlike} disabled={isFixed} />
          {hasFix && activeBtn === ActiveBtn.unlike && <FixBtn className="ml-8" size={size} onClick={onFix} active={isFixed} />}
        </div>
      )}
      {hasFix && (
        <QAModal
          visible={modalVisible}
          setVisible={setModalVisible}
          QAInfo={{
            prompt,
            completion,
          }}
          okCallback={onFixed}
          log_id={log_id as number}
        />
      )}
    </>
  )
}

export default Evaluate
