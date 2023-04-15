import LogoWithName from '@/components/LogoWithName'
import { SelectLang, useIntl, Helmet } from '@umijs/max'
import Settings from '../../../../config/defaultSettings'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import CreateAISteps from '@/components/CreateAISteps'

const Layout: React.FC = () => {
  const intl = useIntl()

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
    }
  })

  const bannerClassName = useEmotionCss(() => {
    return {
      position: 'relative',
      flex: 1,
      overflow: 'auto',
      padding: '0 16px',
      backgroundImage: "url('/images/back_register.png')",
      backgroundRepeat: 'no-repeat',
      '@media screen and (max-width: 1440px)': {
        backgroundSize: 'auto',
      },
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }
  })

  const headerClassName = useEmotionCss(() => {
    return {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      bottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
      width: 'auto',
      height: '42px',
    }
  })

  const loginPanelClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div className={bannerClassName}>
        <div className={headerClassName}>
          <LogoWithName logoTheme="light" notFixed />
          <SelectLang className="text-white" />
        </div>
        <CreateAISteps marginTop="0px" />
      </div>
      <div className={loginPanelClassName}>
        <div style={{ width: 480 }}>
          <h1 style={{ textAlign: 'center' }}>{intl.formatMessage({ id: 'pages.landing.h1' })}</h1>
          <p style={{ textAlign: 'center' }}>{intl.formatMessage({ id: 'pages.landing.p' })}</p>
        </div>
      </div>
    </div>
  )
}

export default Layout
