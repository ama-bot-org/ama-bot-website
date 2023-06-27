import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import styles from './SectionFeedback.less'

export default function SectionFeedback() {
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
      text: '有效回答率',
      value: '> 95%',
    },
    {
      index: 2,
      text: '节约客服人力成本',
      value: '> 80%',
    },
    {
      index: 3,
      text: '应用上线时间',
      value: '< 3 days',
    },
  ]
  const users = [
    {
      image: '/images/Landing/s6-logo-comma auroa.png',
      username: '何铭城',
      userTitle: '极光智能科技CEO',
      description: ['Askio的使用体验很棒，', '问题回复准确及时，', '每年预计', '可降低极光10万的客服人工投入。'],
    },
    {
      image: '/images/Landing/s6-logo-seedao.png',
      username: 'Anders',
      userTitle: 'SeeDAO核心贡献者',
      description: [
        'Askio AI的迭代速度非常快，有效回答率超过95%。通过和组织新人的问答互动，帮助其完成了onboarding的过程。最亮眼的功能是能够直接连接notion文档，同步更新，省去了不断上传最新文档的步骤，相当于拥有了自我进化的能力。',
      ],
    },
    {
      image: '/images/Landing/s6-logo-dna.png',
      username: 'DNA 安吉数字游民社区',
      userTitle: '',
      description: [
        'DNA的班车时间？',
        'DNA每天有定点班车往返，分别是中餐11:30和晚餐17:30。',
        'DNA有多少宠物？',
        'DNA长住宠物居民共16名，3只猫4只羊9只狗',
      ],
    },
  ]

  const dataWrapClassName = useEmotionCss(() => {
    return {
      marginBottom: '20px',
      padding: '0px 20%',
      '@media screen and (max-width: 1280px)': {
        padding: '0px 8%',
      },
      '@media screen and (max-width: 768px)': {
        padding: '0px',
      },
    }
  })

  const userWrapClassName = useEmotionCss(() => {
    return {
      padding: '0px 10%',
      '@media screen and (max-width: 1280px)': {
        padding: '0px 2%',
      },
      '@media screen and (max-width: 768px)': {
        padding: '0px',
        flexDirection: 'column',
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
        backgroundColor: 'white',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <p className="landing-main-header">客户反馈</p>
      {/* 三栏数据 */}
      <div className={`frc-center ${dataWrapClassName}`}>
        {datas.map((item, index) => {
          return (
            <div className="flex-1" key={index}>
              <div className="text-14">{item.text}</div>
              <div
                className="text-28 font-bold"
                style={{
                  fontFamily: 'AlibabaPuHuiTi_2_85_Bold',
                }}
              >
                {item.value}
              </div>
            </div>
          )
        })}
      </div>
      {/* 三栏图片 */}
      <div className={`frc-center ${userWrapClassName}`}>
        {/* 极光智能 */}
        <div className={`relative flex-1 overflow-auto ${styles.card}`}>
          <div className="absolute" style={{ right: '20px', top: '45%' }}>
            <img src="/images/Landing/s6-illustraion-comma grey.svg" alt="comma" />
          </div>
          <div>
            <img
              src={users[0].image}
              style={{
                width: '100%',
              }}
            />
          </div>
          <div
            className="w-full text-left"
            style={{
              marginTop: '60px',
              fontFamily: 'AlibabaPuHuiTi_2_55_Regular',
            }}
          >
            <p className="text-16 font-bold mb-4">{users[0].username}</p>
            <p className="text-16">{users[0].userTitle}</p>
          </div>
          <div className="mt-32">
            <p className="text-left mb-4"> {users[0].description[0]}</p>
            <p className="text-left mb-4"> {users[0].description[1]}</p>
            <p className="text-left mb-4">
              {users[0].description[2]}
              <b>{users[0].description[3]}</b>
            </p>
          </div>
        </div>
        {/* SeeDAO */}
        <div className={`flex-1 fcc-center overflow-hidden ${styles.card}`}>
          <div className="frc-between">
            <img src={users[1].image} width="50%" />
            <div className="text-left">
              <p className="text-16 font-bold mb-4">{users[1].username}</p>
              <p className="text-16">{users[1].userTitle}</p>
            </div>
          </div>
          <p
            className="mt-32"
            style={{
              textIndent: '1em',
            }}
          >
            {users[1].description[0]}
          </p>
          <div className="relative flex-1 w-full overflow-hidden">
            <img
              src="/images/Landing/s6-illustraion-comma red.svg"
              width={140}
              style={{
                position: 'absolute',
                right: '-30px',
                bottom: '0px',
              }}
            />
          </div>
        </div>
        {/* DNA */}
        <div className={`relative flex-1 fcs-between overflow-auto ${styles.card}`}>
          <div className="absolute" style={{ right: '20px', top: '-20px' }}>
            <img src="/images/Landing/s6-illustraion-comma grey.svg" alt="comma" width="120px" />
          </div>
          <div>
            <img src={users[2].image} width={120} />
          </div>
          <p className="mt-10 mb-0">{users[2].username}</p>
          <div
            className="flex-1 overflow-auto"
            style={{
              fontSize: '16px',
              fontFamily: 'AlibabaPuHuiTi_2_55_Regular',
              background: '#ffffff',
              padding: '20px',
              width: '100%',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
            }}
          >
            <div className="fce-center">
              <div className={styles['dialog-gray']}>{users[2].description[0]}</div>
            </div>
            <div className={styles['dialog-white']}>{users[2].description[1]}</div>
            <div className="fce-center">
              <div className={styles['dialog-gray']}>{users[2].description[2]}</div>
            </div>
            <div className={styles['dialog-white']}>{users[2].description[3]}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
