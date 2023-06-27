import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import './style.css'
import { EffectCube, Pagination } from 'swiper'
import { useEmotionCss } from '@ant-design/use-emotion-css'

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
          秒级响应，专家级咨询体验
        </p>
        <p
          style={{
            fontSize: '20px',
            fontFamily: 'AlibabaPuHuiTi_2_75_SemiBold',
          }}
        >
          24小时客服在线，做到快速、准确、场景全覆盖的问答响应
        </p>
      </div>
      <div className="section-corevalue-pagination"> </div>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        loop={true}
        centeredSlides
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{
          el: '.section-corevalue-pagination',
          clickable: true,
        }}
        modules={[EffectCube, Pagination]}
        className="relative mySwiper"
      >
        {[1, 2, 3, 4].map(item => (
          <SwiperSlide
            key={item}
            style={{
              borderRadius: '10px',
            }}
          >
            <div
              className="fcc-center bg-white"
              style={{
                width: '100%',
                padding: '0px 20px',
                height: '100%',
                border: '3px solid #000000',
                borderRadius: '10px',
              }}
            >
              <h3 className="text-20 font-bold">秒级响应，专家级咨询体验</h3>
              <p className="mb-32 text-16">24小时客服在线，做到快速、准确、场景全覆盖的问答响应</p>
              <h3 className="text-20 font-bold">收集和沉淀客户咨询历史数据</h3>
              <p className="mb-32 text-16">为您提供历史客户问答数据分析，并基于数据投喂自主进化问答表现</p>
              <h3 className="text-20 font-bold">优化80%人工客服成本</h3>
              <p className="mb-32 text-16">根据机构调研和全行业对比，AI客服可以帮您至少优化40%-90%的客服成本</p>
              <h3 className="text-20 font-bold">支持全球语言，可与180+国家客户跨境沟通</h3>
              <p>支持通过中文，英文，西班牙语，日语，法语，意大利语，俄语葡萄牙语等几十种语言沟通</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
