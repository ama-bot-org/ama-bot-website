import cls from 'classnames'
import { noop } from 'lodash'
import { FC, MouseEventHandler, ReactNode } from 'react'
import { ReactComponent as FixIcon } from './icons/fix.svg'
import { ReactComponent as LikeIcon } from './icons/like.svg'
import { ReactComponent as UnlikeIcon } from './icons/unlike.svg'
import styles from './style.less'

export type Size = 'base' | 'small'

type Iprops = {
  size?: Size
  active?: boolean
  text: string
  icon?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler
}

type Iprops2 = Omit<Iprops, 'text' | 'icon'>

const Btn: FC<Iprops> = ({ size = 'base', active = false, icon = null, text = '', className = '', disabled = false, onClick = noop }) => {
  return (
    <div
      className={cls(styles.btnRoot, className, styles[size], { [styles.active]: active, [styles.disabled]: disabled })}
      onClick={(e) => {
        if (disabled) return
        onClick(e)
      }}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <span>{text}</span>
    </div>
  )
}

export const LikeBtn: FC<Iprops2> = props => {
  const color = props.active ? '#131415' : '#717177'
  return <Btn text="答得不错" icon={<LikeIcon fill={color} />} {...props} />
}

export const UnLikeBtn: FC<Iprops2> = props => {
  const color = props.active ? '#131415' : '#717177'
  return <Btn text="差点意思" icon={<UnlikeIcon fill={color} />} {...props} />
}

export const FixBtn: FC<Iprops2> = props => {
  const text = props.active ? '已修正' : '修正问答'
  return <Btn text={text} icon={<FixIcon />} {...props} className={cls(styles.fixBtn, props.className)} />
}

export default Btn
