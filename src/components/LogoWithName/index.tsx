import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Link, useIntl } from '@umijs/max'

type LogoWithNameProps = {
  logoTheme?: 'dark' | 'light'
  notFixed?: boolean
}

const LogoWithName: React.FC<LogoWithNameProps> = props => {
  const { logoTheme, notFixed } = props
  const intl = useIntl()

  const logoClassName = useEmotionCss(({ token }) => {
    return {
      width: 'auto',
      padding: '0 8px',
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      left: 16,
      display: 'flex',
      alignItems: 'center',
      borderRadius: token.borderRadius,
      ':hover': {
        cursor: 'pointer',
        backgroundColor: token.colorBgTextHover,
      },
    }
  })
  return (
    <div className={`ant-pro-global-header-logo  ${notFixed ? '' : logoClassName}`}>
      <Link
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
        to={'/landing'}
      >
        <img
          // src={logoTheme && logoTheme === 'light' ? '/logo.svg' : '/logo.svg'}
          src={'/logo.svg'}
          alt="logo"
          style={{ width: '80px', height: '42px' }}
        />
        <h1
          style={{
            margin: 0,
            fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
            fontSize: '18px',
            color: logoTheme && logoTheme === 'light' ? 'white' : 'black',
          }}
        >
          {intl.formatMessage({
            id: 'app.title',
            defaultMessage: '悦问',
          })}
        </h1>
      </Link>
    </div>
  )
}

export default LogoWithName
