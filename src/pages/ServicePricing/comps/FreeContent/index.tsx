import { CDN_URL } from '@/constants'
import cls from 'classnames'
import styles from './style.less'

export default () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.info}>
        <p>
          您好，我是Askio商务负责人<strong>Leon</strong>。
        </p>
        <p>
          针对初次注册的新用户，Askio支持您免费测试和预览AI的问答效果，并支持您将Askio以H5或者网页插件的形式嵌入您的企业官网，并
          <span className={styles.red}>免费赠送您100次AI问答服务</span>。
        </p>
        <p>若您需要升级到企业套餐，或者将机器人配置到社交媒体软件中去，请微信扫码联系Leon，Askio团队将为您提供一对一VIP客户定制服务。</p>
      </div>
      <div className={cls(styles.concat, 'fcc-center')}>
        <img src={`${CDN_URL}/public/images/leon2.png`} />
        <span>微信扫码咨询</span>
      </div>
    </div>
  )
}
