import { CDN_URL } from '@/constants'
import { Modal } from 'antd'
import cls from 'classnames'
import React from 'react'
import styles from './style.less'

export enum TYPE {
  renew = 'renew',
  upgrade = 'upgrade',
}
type Iprops = {
  type?: TYPE
  open: boolean
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const CONFIG = [
  {
    type: TYPE.renew,
    text1: '如需续费',
    text2: '请联系Askio商务负责人Leon',
    title: '续费',
  },
  {
    type: TYPE.upgrade,
    text1: '如需升级版本',
    text2: '请联系Askio商务负责人Leon',
    title: '升级版本',
  },
]
export default ({ type, open, onCancel }: Iprops) => {
  const curInfo = CONFIG.find(item => item.type === type)
  if (!curInfo) return null

  return (
    <Modal width={400} footer={null} open={open} onCancel={onCancel} title={curInfo.title}>
      <div className={cls('fcc-center', styles.content)}>
        <div className={styles.text}>
          <div>{curInfo.text1}</div>
          <div>{curInfo.text2}</div>
        </div>
        <img className={styles.img} src={`${CDN_URL}/public/images/leon1.png`} />
        <div className={styles.text2}>微信扫码咨询</div>
      </div>
    </Modal>
  )
}
