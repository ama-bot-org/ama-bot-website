import HeartTwoTone from '@ant-design/icons/HeartTwoTone'
import SmileTwoTone from '@ant-design/icons/SmileTwoTone'
import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import Alert from 'antd/es/alert'
import Card from 'antd/es/card'
import Typography from 'antd/es/typography'
import React from 'react'

const Admin: React.FC = () => {
  const intl = useIntl()
  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
      })}
    >
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </PageContainer>
  )
}

export default Admin
