import { history, useModel, useParams } from '@umijs/max'
import { ActionType } from '@/constants/enums'
import message from 'antd/es/message'
import BotAPI from '@/services/web-api/bot'
import { useEffect, useState } from 'react'
import { BotDataType } from '../models/bot'
import { flushSync } from 'react-dom'
import { loginOut } from '@/components/RightContent/AvatarDropdown'

export default function useBotModel() {
  const { initialState, setInitialState } = useModel('@@initialState')
  const { id } = useParams()
  const { currentUser } = initialState || {}

  const [botInfo, setBotInfo] = useState<BotDataType>({} as BotDataType)
  const [loading, setLoading] = useState(true)

  const initBotInfo = async (bot_id: string) => {
    const res = await BotAPI.fetchBotInfo(bot_id)
    if (res?.ActionType === ActionType.OK) {
      const { name, image_url, html_url, welcomes, bgImg_url, contact, faq_contents } = res
      const tempBotInfo = {
        id: bot_id,
        name,
        image_url,
        html_url,
        bgImg_url,
        welcomes: welcomes && welcomes.length > 0 ? JSON.parse(welcomes) : [],
        contact: contact && welcomes.length > 0 ? JSON.parse(contact) : [],
        faq_contents: faq_contents && welcomes.length > 0 ? JSON.parse(faq_contents) : [],
      }
      console.log('tempBotInfo', tempBotInfo)
      setBotInfo(tempBotInfo)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const checkIdAndInitBot = async (id: string) => {
    // 假设是html_url, 请求bot_id
    const botIdResult = await BotAPI.getBotIdBySubDomain(id)
    if (botIdResult && botIdResult.ActionType === ActionType.OK) {
      const res = await BotAPI.checkBotValid(botIdResult.bot_id)

      if (res?.ActionType === ActionType.False) {
        message.error(res.message)
        history.push('/user/register')
        setLoading(false)
      } else if (res?.ActionType === ActionType.OK) {
        await initBotInfo(botIdResult.bot_id)
        if (botInfo.bgImg_url) {
          document.getElementsByTagName('body')[0].style.backgroundImage = `url('${botInfo.bgImg_url}')`
        }
      }
    } else if (botIdResult && botIdResult.ActionType === ActionType.False) {
      setLoading(false)
      message.error(botIdResult.message)
      message.error('系统已升级，请重新登录后再试')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      flushSync(() => {
        setInitialState((s: any) => ({ ...s, currentUser: undefined }))
      })
      await loginOut()
    }
  }

  useEffect(() => {
    const initBot = async () => {
      // 此处 id 可能是 html_url,也就是 subdomain，也可能是 bot_id 的前半段
      if (id) {
        await checkIdAndInitBot(id)
      } else if (!!currentUser?.html_url) {
        await checkIdAndInitBot(currentUser.html_url)
      }
    }
    initBot()
  }, [currentUser, id])

  return {
    botInfo,
    loading,
  }
}
