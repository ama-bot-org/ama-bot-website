import { UserLimitDataType } from '@/services/web-api/models/servicePrice'
import servicePriceApi from '@/services/web-api/servicePrice'
import { useModel } from '@umijs/max'
import { Button, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import ConcatModal, { TYPE } from './comps/ConcatModal'
import FreeContent from './comps/FreeContent'
import PaidContent from './comps/PaidContent'
import Panel, { PanelProp } from './comps/Panel'
import { CONFIG, formatNum, VERSION_TYPE } from './config'
import styles from './style.less'

function getPercent(total: number, used: number) {
  return (used * 100) / total
}

function formatData(date?: string) {
  if (!date) return date
  return date?.slice(0, 10)
}

export default () => {
  const [loading, setLoading] = useState(false)
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [version, setVersion] = useState<VERSION_TYPE>(VERSION_TYPE.free)
  const [userLimtInfo, setUserLimtInfo] = useState<UserLimitDataType>()
  const [modalType, setModalType] = useState<TYPE>()
  const curVerInfo = CONFIG.find(item => item.version === version) || CONFIG[0]

  const Panels: PanelProp[] = useMemo(() => {
    const { yuliao_count: corpus_count = 0, standard_count = 0, answer_count = 0 } = userLimtInfo || {}
    const { corpus_total, standard_total, answer_total } = curVerInfo
    return [
      {
        title: '语料库容量',
        used: corpus_count,
        capacity: formatNum(corpus_total, '字', true),
        percent: getPercent(corpus_total, corpus_count),
      },
      {
        title: '标准问答库容量',
        used: standard_count,
        capacity: formatNum(standard_total, '条', true),
        percent: getPercent(standard_total, standard_count),
      },
      {
        title: 'AI回答次数',
        used: answer_count,
        capacity: formatNum(answer_total, '次', true),
        percent: getPercent(answer_total, answer_count),
      },
    ]
  }, [curVerInfo, userLimtInfo])

  // 升级版本
  const onUpgrade = () => {
    setModalType(TYPE.upgrade)
  }

  // 续费
  const onRenew = () => {
    setModalType(TYPE.renew)
  }

  useEffect(() => {
    if (currentUser?.bot_id) {
      setLoading(true)
      servicePriceApi
        .getUserLimit({
          bot_id: currentUser.bot_id,
        })
        .then(res => {
          const { data, ActionType } = res
          if (ActionType === 'OK') {
            setVersion(data.user_type)
            setUserLimtInfo(data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <Spin spinning={loading}>
      <div className={styles.main}>
        <div className={styles.section1}>
          <div className={styles.header}>
            <div className={styles.title}>
              当前版本:
              <span className={styles.version}>{curVerInfo.name}</span>
            </div>
            {version !== VERSION_TYPE.free && (
              <div className={styles.right}>
                <span>{formatData(userLimtInfo?.limit_date)} 到期</span>
                <Button type="default" size="small" className={styles.btn} onClick={onRenew}>
                  续费
                </Button>
              </div>
            )}
          </div>
          <div className={styles.panels}>
            {Panels.map((item, idx) => {
              return <Panel key={idx} {...item} className={styles.panel} />
            })}
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.header}>
            <div className={styles.title}>升级版本</div>
          </div>
          <div className={styles.content}>
            {version === VERSION_TYPE.free ? <FreeContent /> : <PaidContent version={version} onUpgrade={onUpgrade} />}
          </div>
        </div>
      </div>
      <ConcatModal
        type={modalType}
        open={!!modalType}
        onCancel={e => {
          setModalType(undefined)
        }}
      />
    </Spin>
  )
}
