import Progress from 'antd/es/progress'
import cls from 'classnames'
import styles from './style.less'

type numbric = number | string

export type PanelProp = {
  title: string
  used: numbric
  capacity: numbric
  percent: number
}

type Iprops = PanelProp & {
  className?: string
}

export default ({ title, used, capacity, percent, className }: Iprops) => {
  return (
    <div className={cls(styles.wrap, className)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>
        <span className={styles.used}>{used}</span>
        <span> / </span>
        <span className={styles.capacity}>{capacity}</span>
      </div>
      <Progress percent={percent} size="small" showInfo={false} strokeColor="#e65c41" />
    </div>
  )
}
