import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useEmotionCss } from '@ant-design/use-emotion-css'

export default function SectionSafe() {
  const { ref } = useInView({
    /* Optional options */
    threshold: 0.4,
  })

  const sectionClassName = useEmotionCss(() => {
    return {
      height: '100vh',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
      },
    }
  })

  const datas = [
    {
      index: 1,
      title: '安全的基础设施供应商',
      description:
        '我们将所有数据托管在物理上安全的云设施中，包括24/7的现场安保、摄像监控等。所有客户的数据都托管在符合ISO 27001的数据存储中心。',
      image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s7-icon-data.svg',
    },
    {
      index: 2,
      title: '数据加密',
      description:
        'Askio对不同企业帐号数据进行了隔离，并采用TLS加密和AES-256加密。数据数据只在单个账户会话被查看时发送，并在之后及时保存，实现数据自行进化。',
      image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s7-icon-facility.svg',
    },
    {
      index: 3,
      title: '数据冗余和弹性',
      description: 'Askio的基础设施具有容错性。所有数据库都在集群配置中运行，应用层使用动态满足需求的负载平衡技术进行扩展。',
      image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s7-icon-scale.svg',
    },
  ]

  const dataWrapClassName = useEmotionCss(() => {
    return {
      margin: '100px 0px 20px 0px',
      padding: '0px 20%',
      '@media screen and (max-width: 1280px)': {
        padding: '0px 8%',
        flexDirection: 'column',
      },
      '@media screen and (max-width: 768px)': {
        padding: '0px',
      },
    }
  })

  const cardClassName = useEmotionCss(() => {
    return {
      margin: '0px 20px',
      '@media screen and (max-width: 1280px)': {
        margin: '30px 20px',
      },
    }
  })

  return (
    <section
      ref={ref}
      className={`relative ${sectionClassName}`}
      style={{
        height: 'auto',
        paddingTop: 100,
        paddingBottom: 100,
        backgroundColor: '#f0f8ff80',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <p className="landing-main-header">安全性方案</p>
      <div className="landing-secondary-header">为保护你最敏感的数据而建，全方面保护你的企业数据</div>
      {/* 三栏数据 */}
      <div className={`frc-center ${dataWrapClassName}`}>
        {datas.map((item, index) => {
          return (
            <div className={`flex-1 ${cardClassName}`} key={index}>
              <img src={item.image} alt={item.title} />
              <div className="text-20 font-bold mt-24">{item.title}</div>
              <div
                className="text-16 mt-16"
                style={{
                  fontFamily: 'AlibabaPuHuiTi_2_85_Bold',
                }}
              >
                {item.description}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
