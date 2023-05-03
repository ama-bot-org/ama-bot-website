// import { useIntl } from '@umijs/max'
import { useIntl } from '@umijs/max'
import { Button, ConfigProvider, Modal } from 'antd'

interface AgreementModalProps {
  type: string
  visible: boolean
  onClose: () => void
}

const ServiceContent = () => {
  const Inlt = useIntl()
  return (
    <div>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.welcome',
          defaultMessage:
            '欢迎使用艾因AI服务！在您使用本服务前，请仔细阅读以下协议。一旦您使用本服务，则视为您已经同意本协议的全部内容。如有任何疑问，请联系我们。',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_1',
          defaultMessage: '服务说明',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_1',
          defaultMessage:
            '艾因AI注册服务是一款提供AI自动问答功能的在线服务。用户可以通过本服务获取信息、提出问题，并自动获得答案。此服务是由艾因 AI 团队提供并维护的，并且可能会不断更新和改进。',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_2',
          defaultMessage: '用户责任',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_2',
          defaultMessage: '用户在使用本服务时，必须遵守以下规定：',
        })}
      </p>
      <ol style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.service.p_2_1',
            defaultMessage: '用户不得利用本服务进行任何违法活动。',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.service.p_2_2',
            defaultMessage: '用户应当保护自己的账号和密码，不得将其透露给他人。',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.service.p_2_3',
            defaultMessage: '用户应当尊重他人的知识产权和隐私，不得恶意抄袭、盗用他人信息。',
          })}
        </li>
      </ol>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_2_4',
          defaultMessage: '若用户违反以上规定，艾因 AI 团队有权随时中止或终止其使用本服务的权利。',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_3',
          defaultMessage: '免责声明',
        })}
      </h3>
      <ol style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.service.p_3_1',
            defaultMessage:
              '本服务可能会受到各种因素的影响，包括但不限于互联网连接质量、软件版本等。艾因 AI 团队不保证本服务能够一直正常运行，也不对因本服务中断、停止或无法使用而造成的任何损失承担责任。',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.service.p_3_2',
            defaultMessage:
              '用户在使用本服务时，应当对自己进行足够的辨别和判断，不得依赖本服务提供的信息作出决策。艾因 AI 团队不对用户因依赖本服务信息而造成的任何损失承担责任。',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.service.p_3_3',
            defaultMessage: '本协议条款的解释和适用，以中华人民共和国法律为准。',
          })}
        </li>
      </ol>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_4',
          defaultMessage: '协议修改',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_4_1',
          defaultMessage:
            '艾因 AI 团队有权修改本协议的任何内容，并在本网站公示。若您不同意修改后的协议内容，可以选择停止使用本服务。如您继续使用本服务，则视为您已经同意修改后的协议内容。',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_4_2',
          defaultMessage: '感谢您选择艾因AI注册服务，祝您使用愉快！',
        })}
      </p>
    </div>
  )
}

const PrivacyContent = () => {
  const Inlt = useIntl()
  return (
    <div>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.welcome',
          defaultMessage:
            '欢迎使用艾因AI。我们非常重视您的隐私。本文档将详细说明我们如何收集、使用和保护您的个人信息。请您仔细阅读以下内容。',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_1',
          defaultMessage: '信息收集和使用',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_1',
          defaultMessage: '我们收集的信息类型包括：',
        })}
      </p>
      <ul style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_1',
            defaultMessage: '设备信息：例如您使用的设备类型、操作系统版本、设备标识符等；',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_2',
            defaultMessage: '日志信息：例如您使用我们服务的时间、浏览器类型及语言、访问的页面、IP地址等；',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_3',
            defaultMessage: '个人信息：例如您的电子邮件地址、登录密码等。',
          })}
        </li>
      </ul>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_2',
          defaultMessage: '我们收集这些信息是为了：',
        })}
      </p>
      <ul style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_4',
            defaultMessage: '为您提供更好的服务；',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_5',
            defaultMessage: '分析和改进我们的服务；',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_6',
            defaultMessage: '向您发送与我们服务相关的通知。',
          })}
        </li>
      </ul>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_3',
          defaultMessage: '我们不会将您的个人信息出售给第三方。我们只会在以下情况下与第三方共享您的个人信息：',
        })}
      </p>
      <ul style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_7',
            defaultMessage: '得到您的明确同意；',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_8',
            defaultMessage: '根据法律法规、法院命令或政府部门的要求；',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_9',
            defaultMessage: '为了保护我们的合法权益。',
          })}
        </li>
      </ul>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_2',
          defaultMessage: '信息保护',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_4',
          defaultMessage:
            '我们采取适当的技术和组织措施来保护您的个人信息。我们使用安全套接字层（SSL）技术来保护数据传输的安全性。我们还限制访问您的个人信息的人员范围，只有需要访问这些信息的人员才能访问。',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_3',
          defaultMessage: 'Cookie技术',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_5',
          defaultMessage:
            '为了改善您的用户体验，我们使用Cookie技术。Cookie是一种小文件，它存储在您的设备上，可以帮助我们识别您的设备并提供更好的服务。您可以通过浏览器设置拒绝Cookie，但这可能会影响您使用我们的服务。',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_4',
          defaultMessage: '其他',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_6',
          defaultMessage:
            '我们可能会更新本隐私政策。我们会在网站上发布更新后的隐私政策。如果您继续使用我们的服务，即表示您同意受更新后的隐私政策约束。',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_7',
          defaultMessage: '如果您对我们的隐私政策有任何问题或疑虑，请联系我们。',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_8',
          defaultMessage: '感谢您选择艾因AI，祝您使用愉快！',
        })}
      </p>
    </div>
  )
}

const AgreementModal: React.FC<AgreementModalProps> = ({ type, visible, onClose }) => {
  const Intl = useIntl()
  const title =
    type === 'service' ? (
      <h2>{Intl.formatMessage({ id: 'agreement.agreement.service' })}</h2>
    ) : (
      <h2>{Intl.formatMessage({ id: 'agreement.agreement.privacy' })}</h2>
    )
  const content = type === 'service' ? <ServiceContent /> : <PrivacyContent />

  return (
    <Modal
      title={title}
      open={visible}
      footer={
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e65c41',
            },
          }}
        >
          <Button type="primary" onClick={onClose}>
            确定
          </Button>
        </ConfigProvider>
      }
      onCancel={onClose}
    >
      {content}
    </Modal>
  )
}

export default AgreementModal
