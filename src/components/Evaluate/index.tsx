import QAModal from '@/components/QAModal'
import logInfoApi from '@/services/web-api/logInfo'
import { CommentType } from '@/services/web-api/models/logInfo'
import { useModel } from '@umijs/max'
import message from 'antd/es/message'
import { FC, useEffect, useState } from 'react'
import { FixBtn, LikeBtn, Size, UnLikeBtn } from '../EvaluateBtn'

type Iprops = {
  hasFix: boolean
  show: boolean
  className?: string
  size?: Size
  prompt: string
  completion: string
  botId?: string
  commentType: CommentType
}

const Evaluate: FC<Iprops> = ({ botId, show, hasFix, className, size = 'base', prompt, completion, commentType }) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [commentStatus, setCommentStatus] = useState<CommentType>(commentType)
  const [log_id, setLogId] = useState<number>()
  const [isFixed, setIsFixed] = useState(hasFix)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    setIsFixed(hasFix)
  }, [hasFix])

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
    if (commentStatus === CommentType.like) return
    const res = await evaluate(CommentType.like)
    if (res) {
      setCommentStatus(CommentType.like)
    }
  }

  const onUnlike = async () => {
    if (commentStatus === CommentType.unlike) return
    const res = await evaluate(CommentType.unlike)
    if (res) {
      setCommentStatus(CommentType.unlike)
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
      setCommentStatus(CommentType.noAction)
      setIsFixed(false)
      setModalVisible(false)
      setLogId(undefined)
    }
  }, [show])

  return (
    <>
      {show && (
        <div className={className}>
          <LikeBtn size={size} onClick={onLike} active={commentStatus === CommentType.like} disabled={isFixed} />
          <UnLikeBtn className="ml-8" size={size} onClick={onUnlike} active={commentStatus === CommentType.unlike} disabled={isFixed} />
          <FixBtn className="ml-8" size={size} onClick={onFix} active={isFixed} />
        </div>
      )}
      {!isFixed && (
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
