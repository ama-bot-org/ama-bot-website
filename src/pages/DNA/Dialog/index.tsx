import React from 'react'
import styles from './Dialog.less'
import { useEmotionCss } from '@ant-design/use-emotion-css'

const Dialog = ({ position, children }: { position: string; children: React.ReactNode }) => {
  const dialogClass = `${styles.dialog} ${styles[`dialog-${position}`]}`

  const contentClassName = useEmotionCss(() => {
    return {
      fontFamily: 'AlibabaPuHuiTi_2_55_Regular',
      '@media screen and (max-width: 1024px)': {
        fontSize: '16px',
      },
      fontSize: '20px',
      lineHeight: '1.5',
    }
  })

  return (
    <div
      className="frc-start"
      style={{
        flexDirection: position === 'left-bottom' ? 'row' : 'row-reverse',
      }}
    >
      <div className="fcc-end">
        <img width={20} height={20} src={position === 'left-bottom' ? 'favicon.ico' : 'favicon_old.ico'} />
      </div>
      <div className={dialogClass}>
        <div className={`${contentClassName} ${styles['dialog-content']}`}>{children}</div>
      </div>
    </div>
  )
}
export default Dialog
