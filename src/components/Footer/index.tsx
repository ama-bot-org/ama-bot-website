// import GithubOutlined from '@ant-design/icons/GithubOutlined'
// import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import { DefaultFooter } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import React from 'react'

const Footer: React.FC = () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  })

  const currentYear = new Date().getFullYear()

  return (
    <div
      className="fcc-center"
      style={{
        marginBottom: '48px',
      }}
    >
      <DefaultFooter
        style={{
          background: 'none',
        }}
        copyright={`${currentYear} ${defaultMessage}`}
      />

      <a
        className="frc-center"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: 'none',
        }}
      >
        <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/ba.png" alt="" />
        <span
          className="ml-4"
          style={{
            color: '#1677ff',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          苏ICP备2022035073号-4
        </span>
      </a>
    </div>
  )
}

export default Footer
