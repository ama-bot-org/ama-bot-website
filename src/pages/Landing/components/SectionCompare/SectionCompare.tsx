import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Divider } from 'antd'
import React from 'react'
import styles from './SectionCompare.less'
import { useInView } from 'react-intersection-observer'
import { isMobile } from 'react-device-detect'

// 传统对话
const TraditionalService = () => {
  return (
    <div
      className="flex-1 w-full"
      style={{
        fontSize: '16px',
        fontFamily: 'AlibabaPuHuiTi_2_55_Regular',
        background: '#ffffff',
        marginTop: '20px',
        padding: '20px',
        borderRadius: '20px',
      }}
    >
      <div className="fce-center">
        <div className={styles['dialog-gray']}>你们的产品线有哪些SKU？</div>
      </div>
      <div className={styles['dialog-white']}>
        抱歉，您的问题暂时还没有答案～
        <span
          style={{
            color: '#e65c41',
          }}
        >
          <img src="/icons/customer.svg" width={16} alt="customer" /> 转人工客服
        </span>
      </div>
      <div
        className={styles['dialog-white']}
        style={{
          borderRadius: '20px',
        }}
      >
        <div>
          排队中… 前面排队{' '}
          <span
            style={{
              color: '#e65c41',
            }}
          >
            70+
          </span>{' '}
          人
        </div>
        <Divider />
        <div
          style={{
            fontSize: '14px',
            fontFamily: 'AlibabaPuHuiTi_2_55_Regular',
            textAlign: 'center',
            color: '#e65c41',
          }}
        >
          结束排队
        </div>
      </div>
      <div className={styles['dialog-white']}>请回复1，继续排队</div>
      <div className={styles['dialog-white']}>
        <div>非常抱歉给您带来了不好的体验，我们会努力提供更好的服务，</div>
        <div>感谢您的理解和支持。</div>
      </div>
    </div>
  )
}

// 悦问对话
const AIService = () => {
  return (
    <div
      className="flex-1 bg-white"
      style={{
        marginTop: '20px',
        padding: '20px',
        borderRadius: '20px',
      }}
    >
      <div className="fce-center">
        <div className={styles['dialog-gray']}>你们的产品线有哪些SKU？</div>
      </div>
      <div
        className={styles['dialog-orange']}
        style={{
          textAlign: 'left',
        }}
      >
        <p>您好，本季的SKU产品内容给您参考：</p>
        <p>
          面部护肤品SKU：洁面乳、爽肤水、精华、面霜、面膜等。唇部护理SKU：口红、唇彩、唇膏、唇线笔、唇部润唇膏等。身体护理SKU：沐浴露、润肤乳、身体乳等。头发护理SKU：洗发水、护发素、发膜等。
        </p>
        <p>以上只是一些常用的SKU，具体产品会随着季节和新品的推出有些变化。规格方面也会有些许不同。</p>
      </div>
    </div>
  )
}

export default function SectionCompare() {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  })

  const dialogWrapClassName = useEmotionCss(() => {
    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      width: '80%',
      padding: '0 40px',
      '@media screen and (max-width: 1440px)': {
        width: '90%',
      },
      '@media screen and (max-width: 768px)': {
        width: '100%',
        flexDirection: 'column',
      },
    }
  })

  const dialogTraditionClassName = useEmotionCss(() => {
    return {
      flex: '1',
      overflow: 'auto',
      border: 'dashed 3px #e65c4130',
      borderRadius: '20px',
      padding: '20px',
      marginRight: '5%',
      '@media screen and (max-width: 768px)': {
        marginRight: '0%',
      },
    }
  })

  const sectionClassName = useEmotionCss(() => {
    return {
      height: '100vh',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
      },
    }
  })

  return (
    <section
      ref={ref}
      className={`relative text-center fcc-center ${sectionClassName}`}
      style={{
        overflow: 'hidden',
        backgroundColor: '#fbfbfb',
      }}
    >
      <p
        style={{
          fontSize: isMobile ? '32px' : '36px',
          fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
        }}
      >
        传统客服{' '}
        <span
          style={{
            color: '#e65c41',
          }}
        >
          VS
        </span>{' '}
        悦问AI
      </p>
      <div className={dialogWrapClassName}>
        <div
          className={`fcc-center ${dialogTraditionClassName} ${styles['dialog-traditional']} ${
            inView ? styles['dialog-traditional-zoom'] : ''
          }`}
        >
          <div
            style={{
              fontSize: '20px',
              fontFamily: 'AlibabaPuHuiTi_2_75_SemiBold',
            }}
          >
            <b>传统智能客服</b> —— 关键词匹配问答，常常没有答案
          </div>
          <div className={styles.description}>
            <p
              style={{
                marginBottom: '0px',
              }}
            >
              基于关键词匹配进行回复，匹配失败后无法回应用户问题，回复语气机械，
            </p>
            <p
              style={{
                marginBottom: '0px',
              }}
            >
              用户咨询体验不够完善
            </p>
          </div>
          <TraditionalService />
        </div>

        <div
          className={`fcc-center ${styles['dialog-ai']} ${inView ? styles['dialog-ai-zoom'] : ''}`}
          style={{
            flex: '1',
            overflow: 'auto',
            border: 'dashed 3px #e65c4130',
            borderRadius: '20px',
            padding: '20px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontFamily: 'AlibabaPuHuiTi_2_75_SemiBold',
            }}
          >
            <b>悦问AI —— 灵活场景问答，90%以上回复满意率</b>
          </div>
          <div className={styles.description}>
            <p
              style={{
                marginBottom: '0px',
              }}
            >
              基于大语言模型，在理解用户问题的基础上，根据企业知识库资料和互联网数据，
            </p>
            <p
              style={{
                marginBottom: '0px',
              }}
            >
              能够响应90%以上的用户咨询
            </p>
          </div>
          <AIService />
        </div>
      </div>
    </section>
  )
}
