import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import './style.css'
import { EffectCube, Pagination, Autoplay } from 'swiper'
import { useEmotionCss } from '@ant-design/use-emotion-css'

const slideData = [
  {
    index: 1,
    title: '秒级响应，专家级咨询体验',
    description: '24小时客服在线，做到快速、准确、场景全覆盖的问答响应',
    image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s3-1.gif',
  },
  {
    index: 2,
    title: '收集和沉淀客户咨询历史数据',
    description: '为您提供历史客户问答数据分析，并基于数据投喂自主进化问答表现',
    image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s3-2.png',
  },
  {
    index: 3,
    title: '优化80%人工客服成本',
    description: '根据机构调研和全行业对比，AI客服可以帮您至少优化40%-90%的客服成本',
    image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s3-3.png',
  },
  {
    index: 4,
    title: '支持全球语言，可与180+国家客户跨境沟通',
    description: '支持通过中文，英文，西班牙语，日语，法语，意大利语，俄语葡萄牙语等几十种语言沟通',
    image: 'https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/images/Landing/s3-4.png',
  },
]

export default function SectionCorevalue() {
  const sectionClassName = useEmotionCss(() => {
    return {
      height: '100vh',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
        padding: '80px 0',
      },
    }
  })

  const cardItemOne = useEmotionCss(() => {
    return {
      position: 'absolute',
      margin: '0 auto',
      left: 0,
      bottom: 0,
      zIndex: 0,
      height: '493px',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
        width: '100%',
      },
    }
  })

  const cardItemOther = useEmotionCss(() => {
    return {
      height: '570px',
      transform: 'translateY(-40px)',
      '@media screen and (max-width: 768px)': {
        height: 'auto',
        width: '100%',
      },
    }
  })

  return (
    <section
      className={`relative text-center fcc-center ${sectionClassName}`}
      style={{
        overflow: 'hidden',
        backgroundColor: 'aliceblue',
        zIndex: 0,
      }}
    >
      <div
        style={{
          paddingTop: '0px',
          marginBottom: '40px',
        }}
      >
        <h1 className="landing-main-header">核心价值</h1>
        <p
          style={{
            fontSize: '20px',
            fontFamily: 'AlibabaPuHuiTi_2_75_SemiBold',
            marginBottom: '4px',
          }}
        >
          秒级响应，数据沉淀，降本增效，多语言支持
        </p>
        {/* <p
          style={{
            fontSize: '20px',
            fontFamily: 'AlibabaPuHuiTi_2_75_SemiBold',
            marginBottom: '4px',
          }}
        >
          秒级响应，专家级咨询体验
        </p>
        <p
          style={{
            fontSize: '20px',
            fontFamily: 'AlibabaPuHuiTi_2_75_SemiBold',
          }}
        >
          24小时客服在线，做到快速、准确、场景全覆盖的问答响应
        </p> */}
      </div>
      <div className="section-corevalue-pagination"> </div>
      <Swiper
        autoplay={{
          delay: 5000,
        }}
        modules={[Autoplay, EffectCube, Pagination]}
        effect={'cube'}
        grabCursor={true}
        loop={true}
        centeredSlides
        cubeEffect={{
          shadow: false,
          slideShadows: false,
          // shadowOffset: 20,
          // shadowScale: 0.94,
        }}
        pagination={{
          el: '.section-corevalue-pagination',
          clickable: true,
        }}
        className="relative mySwiper"
      >
        {slideData.map(item => (
          <SwiperSlide
            key={item.index}
            style={{
              width: '100%',
              borderRadius: '10px',
            }}
          >
            <div className="fcc-start relative w-full h-full bg-white">
              <div
                style={{
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                <h3 className="text-20 font-bold">{item.title}</h3>
                <p className="mb-32 text-16">{item.description}</p>
              </div>
              <img src={item.image} className={item.index === 1 ? cardItemOne : cardItemOther} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
