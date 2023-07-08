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
      {/* <div
        className="fcc-end"
        style={{
          alignSelf: 'flex-end',
          marginBottom: '8px',
        }}
      >
        <img
          width={28}
          height={28}
          src={
            position === 'left-bottom'
              ? 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/User-chat%20icon.svg'
              : 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/dna.png'
          }
        />
      </div> */}
      <div className={dialogClass}>
        <div className={`${contentClassName} ${styles['dialog-content']}`}>{children}</div>
      </div>
    </div>
  )
}
export default Dialog
