import GithubOutlined from '@ant-design/icons/GithubOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import { DefaultFooter } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import React from 'react'

const Footer: React.FC = () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'FreeBe DAO Askio Team',
  })

  const currentYear = new Date().getFullYear()

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Askio',
          title: <GlobalOutlined />,
          href: REACT_APP_OFFICIAL_SITE,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: REACT_APP_GITHUB_SITE,
          blankTarget: true,
        },
      ]}
    />
  )
}

export default Footer
