import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Link } from '@umijs/max'

type LogoWithNameProps = {
  logoTheme?: 'dark' | 'light'
  notFixed?: boolean
}

const LogoWithName: React.FC<LogoWithNameProps> = props => {
  const { logoTheme, notFixed } = props
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
          src={logoTheme && logoTheme === 'light' ? '/logo_white.svg' : '/logo.svg'}
          alt="logo"
          style={{ width: '24px', height: '24px' }}
        />
        <h1
          style={{
            margin: 0,
            fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
            marginLeft: '8px',
            fontSize: '18px',
            color: logoTheme && logoTheme === 'light' ? 'white' : 'black',
          }}
        >
          AMA
        </h1>
      </Link>
    </div>
  )
}

export default LogoWithName
