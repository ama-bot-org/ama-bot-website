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
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_1',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_1',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_1_2',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_1_3',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_2',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.service.p_2',
        })}
      </p>
      <ol style={{ paddingInlineStart: '20px', listStyle: 'auto' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(item => (
          <li key={item} className="mb-4">
            {Inlt.formatMessage({
              id: `agreement.service.p_2_${item}`,
            })}
          </li>
        ))}
      </ol>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_3',
        })}
      </h3>
      <ol style={{ paddingInlineStart: '20px', listStyle: 'auto' }}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <li key={item} className="mb-4">
            {Inlt.formatMessage({
              id: `agreement.service.p_3_${item}`,
            })}
          </li>
        ))}
      </ol>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.service.h3_4',
        })}
      </h3>
      <ol style={{ paddingInlineStart: '20px', listStyle: 'auto' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <li key={item} className="mb-4">
            {Inlt.formatMessage({
              id: `agreement.service.p_4_${item}`,
            })}
          </li>
        ))}
      </ol>
      <p className="w-full text-right">2023 年2月深海蓝鳍（南京）科技有限公司</p>
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
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_1',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_1',
        })}
      </p>
      <ul style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_1',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_2',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_3',
          })}
        </li>
      </ul>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_2',
        })}
      </p>
      <ul style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_4',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_5',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_6',
          })}
        </li>
      </ul>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_3',
        })}
      </p>
      <ul style={{ paddingInlineStart: '20px' }}>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_7',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_8',
          })}
        </li>
        <li>
          {Inlt.formatMessage({
            id: 'agreement.privacy.ul_9',
          })}
        </li>
      </ul>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_2',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_4',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_3',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_5',
        })}
      </p>
      <h3>
        {Inlt.formatMessage({
          id: 'agreement.privacy.h3_4',
        })}
      </h3>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_6',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_7',
        })}
      </p>
      <p>
        {Inlt.formatMessage({
          id: 'agreement.privacy.p_8',
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
            {Intl.formatMessage({
              id: 'button.ok',
            })}
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
