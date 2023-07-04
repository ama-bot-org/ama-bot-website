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
      <div
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
              : 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/DNA/dna.png?q-sign-algorithm=sha1&q-ak=AKIDx9az1Z2rn-Oc1CaLNX3DQzCVQrNpB827D3Zt9JMVktuIcg2I6DsHUGmxUN5luU2d&q-sign-time=1688437991;1688441591&q-key-time=1688437991;1688441591&q-header-list=host&q-url-param-list=ci-process&q-signature=6443bb0d4e748cf205bccacd21fea73aeb92b0de&x-cos-security-token=cPgx7ApSWgTu1HYl4VLI9M2v4cxnpU5ad46b2b442a99ebd93f25d90c5cc99c0a5aJcn3ZQpraEQMF5juDf9d60DaGIa6qp_Lwldtnds3gKFQZtfv876qe3zjxoG8jNY1WLupTt5yTk1UjCsk6BVptuJoeRBHzDAI1-0FCyc9vxjR9wapKsSqCuXrTvprDWp9WWkZtwF-akmFXPXEToZw9uHsn6HdqN9zOUlsOpvhG1J7CUvgpqPGpujStfcKLM&ci-process=originImage'
          }
        />
      </div>
      <div className={dialogClass}>
        <div className={`${contentClassName} ${styles['dialog-content']}`}>{children}</div>
      </div>
    </div>
  )
}
export default Dialog
