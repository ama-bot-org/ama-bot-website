import { Button, Checkbox, Form } from 'antd'
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
        <Checkbox onChange={handleCheckboxChange}>
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
              paddingLeft: '0px',
              paddingRight: '0px',
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
              paddingLeft: '0px',
              paddingRight: '0px',
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
        </Checkbox>
      </Form.Item>
      <AgreementModal type={agreementType} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  )
}

export default AgreementFormItem
