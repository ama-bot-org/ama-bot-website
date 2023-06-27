import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl, useLocation } from '@umijs/max'
import styles from './steps.less'
import { history } from '@umijs/max'
import { ArrowDownOutlined } from '@ant-design/icons'
import { useMemo } from 'react'

type CreateAIStepsProps = {
  isShowCreate?: boolean // 是否显示创建机器人按钮
  marginTop?: string | number // 自定义高度
  layoutChangeMedia?: number // 自定义媒体查询
}
const CreateAISteps = (props: CreateAIStepsProps) => {
  const { isShowCreate, marginTop, layoutChangeMedia } = props

  const intl = useIntl()
  const location = useLocation()

  const isLoginPage = useMemo(() => {
    return location.pathname === '/user/login'
  }, [location.pathname])

  const headerClassName = useEmotionCss(() => {
    return {
      fontFamily: 'AlibabaPuHuiTi_2_85_Bold, AlibabaSans-Medium',
      '@media screen and (max-width: 1024px)': {
        fontSize: '30px',
      },
      fontSize: '36px',
      marginBottom: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#f3f3f3',
    }
  })

  const stepContainer = useEmotionCss(() => {
    return {
      display: 'flex',
      '@media screen and (min-width: 486px)': {
        width: '54%',
      },
      '@media screen and (min-width: 768px)': layoutChangeMedia
        ? { width: '70%', flexDirection: 'column', alignItems: 'flex-start' }
        : {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          },
      '@media screen and (min-width: 1080px)': {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      },
      width: '70%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }
  })

  /**
   * 1.注册帐号
   * 2.上传文本素材
   * 3.将机器人邀请到IM聊天工具
   */
  const stepsData = [
    {
      id: 1,
      title: intl.formatMessage({
        id: 'landing.steps.register',
        defaultMessage: '注册帐号',
      }),
    },
    {
      id: 2,
      title: intl.formatMessage({
        id: 'landing.steps.upload',
        defaultMessage: '上传文本素材',
      }),
    },
    {
      id: 3,
      title: intl.formatMessage({
        id: 'landing.steps.invite',
        defaultMessage: '注册帐号',
      }),
    },
  ]

  /**
   * 点击创建AI助手
   * @description 跳转到管理员首页-ama导航页，路由权限那边处理以下逻辑：如果已经登录，则直接跳转到页面，否则跳转到登录页
   */
  const handleClickCreate = () => {
    history.push('/user/register')
  }

  return (
    <div className="w-full h-full fcc-center" style={{ marginTop: marginTop || '110px' }}>
      <div className={headerClassName}>
        <h4 style={{ color: '#e65c41', margin: '0px' }}>
          {intl.formatMessage({
            id: 'landing.title1',
          })}
        </h4>
        <h4 style={{ margin: '10px 0px 0px 0px' }}>
          {intl.formatMessage({
            id: 'landing.title2',
          })}
        </h4>
      </div>
      <div className={stepContainer}>
        {stepsData.map(item => (
          <span key={item.id} className={layoutChangeMedia ? styles.stepCustom : styles.step}>
            <span className={styles['step-id']}>{item.id}</span>
            <span className={styles['step-title']}>{item.title}</span>
          </span>
        ))}
      </div>
      {isShowCreate ? (
        <div className={styles.start} onClick={handleClickCreate}>
          <ArrowDownOutlined />
          <span>
            {intl.formatMessage({
              id: 'landing.create',
            })}
          </span>
        </div>
      ) : null}
      {isLoginPage && (
        <p
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#e65c41',
            position: 'absolute',
            bottom: '20px',
          }}
        >
          {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
        </p>
      )}
    </div>
  )
}

export default CreateAISteps
