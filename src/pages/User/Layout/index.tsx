import LogoWithName from '@/components/LogoWithName'
import { SelectLang, useIntl, Helmet, Outlet } from '@umijs/max'
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
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      '@media screen and (max-width: 768px)': {
        display: 'none',
      },
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
      width: 480,
      '@media screen and (max-width: 768px)': {
        width: '100%',
        minWidth: '320px',
      },
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
        <CreateAISteps marginTop="0px" layoutChangeMedia={1080} />
      </div>
      <div className={loginPanelClassName}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
