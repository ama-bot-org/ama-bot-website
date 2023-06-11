import { Button, Checkbox, ConfigProvider, Form } from 'antd'
import AgreementModal from '../AgreementModal'
import { useState } from 'react'
import { useIntl } from '@umijs/max'

type AgreementFormItemProps = {
  handleCheckboxChange: (e: any) => void
}

const AgreementFormItem = (props: AgreementFormItemProps) => {
  const Inlt = useIntl()
  const { handleCheckboxChange } = props

  const [modalVisible, setModalVisible] = useState(false)
  const [agreementType, setAgreementType] = useState('')

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#e65c41',
          },
        }}
      >
        <Form.Item
          name="remember"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        Inlt.formatMessage({
                          id: 'agreement.required',
                        }),
                      ),
                    ),
            },
          ]}
        >
          <Checkbox onChange={handleCheckboxChange} style={{ fontSize: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
              <span>
                {Inlt.formatMessage({
                  id: 'agreement.agreement.one',
                })}
              </span>
              <Button
                type="text"
                color="primary"
                style={{
                  color: '#e65c41',
                  padding: 0,
                  height: 26,
                  fontSize: 16,
                  marginRight: '4px',
                  marginLeft: '4px',
                }}
                onClick={() => {
                  setModalVisible(true)
                  setAgreementType('service')
                }}
              >
                {Inlt.formatMessage({
                  id: 'agreement.agreement.service',
                })}
              </Button>
              <span>
                {Inlt.formatMessage({
                  id: 'agreement.agreement.and',
                })}
              </span>
              <Button
                type="text"
                color="primary"
                style={{
                  color: '#e65c41',
                  fontSize: 16,
                  padding: 0,
                  height: 26,
                }}
                onClick={() => {
                  setModalVisible(true)
                  setAgreementType('privacy')
                }}
              >
                {Inlt.formatMessage({
                  id: 'agreement.agreement.privacy',
                })}
              </Button>
            </div>
          </Checkbox>
        </Form.Item>
      </ConfigProvider>
      <AgreementModal type={agreementType} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  )
}

export default AgreementFormItem
