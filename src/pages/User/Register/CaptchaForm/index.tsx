import userAPI from '@/services/web-api/register'
import { useState } from 'react'
import { useIntl } from '@umijs/max'
import Form from 'antd/es/form'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import { ActionType, CheckType, RegisterType } from '@/constants/enums'
import message from 'antd/es/message'

type CaptFormProps = {
  form: any //FormInstance
  registerType: RegisterType
  validFields?: string[] //请求前是否添加约束校验
  onCaptchaChange?: (value: string, checkType: CheckType) => void
}

const CaptchaForm = (props: CaptFormProps) => {
  const { form, validFields, registerType, onCaptchaChange = () => {} } = props
  const intl = useIntl()
  const [count, setCount] = useState(0)
  const [sendloading, setSendLoading] = useState(false)

  const onGetCaptcha = async () => {
    setSendLoading(true)
    try {
      await form.validateFields(validFields || ['phone', 'password', 'confirm'])

      // 获取验证码
      const phone = form.getFieldValue('phone')
      if (phone) {
        const res = await userAPI.requestPhoneCaptcha(phone, registerType)
        if (res.ActionType === ActionType.OK) {
          // 倒计时
          let count = 59
          setCount(count)
          const timer = setInterval(() => {
            count -= 1
            setCount(count)
            if (count === 0) {
              clearInterval(timer)
            }
          }, 1000)
          message.success(intl.formatMessage({ id: 'register.code.available' }))
        } else {
          message.error(res?.message || intl.formatMessage({ id: 'register.code.unavailable' }))
        }
      } else {
        form.validateFields(['phone'])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSendLoading(false)
    }
  }

  return (
    <Form.Item
      name="captcha"
      rules={[
        {
          required: true,
          message: intl.formatMessage({ id: 'register.code.required' }),
        },
      ]}
    >
      <Row gutter={8}>
        <Col span={14}>
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'register.code.required' })}
            onChange={e => onCaptchaChange(e.target.value, CheckType.Captcha)}
          />
        </Col>
        <Col span={10}>
          <Button size="large" disabled={count > 0} className="w-full" onClick={onGetCaptcha} loading={sendloading}>
            {count ? `${count} s` : intl.formatMessage({ id: 'register.code.get' })}
          </Button>
        </Col>
      </Row>
    </Form.Item>
  )
}

export default CaptchaForm
